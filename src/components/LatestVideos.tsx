"use client";

import { useRef, useState, useEffect } from 'react';

export default function LatestVideos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      // Each card is 1/5 of container on desktop; step exactly 5 cards
      const cardWidth = scrollRef.current.clientWidth / 5;
      scrollRef.current.scrollBy({ left: -(cardWidth * 5 + 15 * 4), behavior: 'smooth' });
      setTimeout(checkScroll, 500);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / 5;
      scrollRef.current.scrollBy({ left: cardWidth * 5 + 15 * 4, behavior: 'smooth' });
      setTimeout(checkScroll, 500);
    }
  };

  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/shorts-reels');
        const data = await res.json();
        if (data.success && data.shorts) {
          setVideos(data.shorts);
        }
      } catch (err) {
        console.error('Failed to fetch shorts:', err);
      }
    };
    fetchShorts();
  }, []);

  // Re-check scroll state whenever videos change (after fetch) or on resize
  useEffect(() => {
    if (videos.length > 0) {
      // Allow DOM to paint the new cards before measuring
      setTimeout(checkScroll, 100);
    }
  }, [videos]);


  return (
    <div className="w-full mt-2 mb-0 relative">
      <h2 className="text-[21px] font-bold font-sans text-black mb-5 flex items-center group cursor-pointer w-fit tracking-tight">
        Latest videos <span className="ml-1 text-[20px] transition-transform group-hover:translate-x-1">→</span>
      </h2>
      
      <div className="relative group/carousel">
        {canScrollLeft && (
          <button 
            onClick={scrollLeft}
            aria-label="Previous videos"
            className="absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 z-10 bg-[#e3120b] hover:bg-[#c8100a] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        )}

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-hidden scroll-smooth gap-[15px] snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((vid, idx) => (
            <div 
              key={idx} 
              onClick={() => vid.video_url ? window.open(vid.video_url, '_blank') : null}
              className="relative flex-shrink-0 snap-start cursor-pointer group w-[calc((100%-15px)/2)] sm:w-[calc((100%-30px)/3)] md:w-[calc((100%-60px)/5)]"
            >
              <div className="w-full relative aspect-[2/3.8] bg-[#111] overflow-hidden">
                <img src={vid.thumbnail_url || vid.img} alt={vid.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end text-white z-10">
                  <div className="flex items-center gap-2 mt-auto pt-1">
                    {/* Play Icon */}
                    <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-white flex items-center justify-center pl-[2px]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                    </div>
                    <span className="text-[12.5px] font-bold font-sans tracking-wide">{vid.duration || vid.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button 
            onClick={scrollRight}
            aria-label="Next videos"
            className="absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 z-10 bg-[#e3120b] hover:bg-[#c8100a] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        )}
      </div>
    </div>
  );
}
