"use client";

import { useRef, useState, useEffect } from 'react';

export default function LatestVideos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -(scrollRef.current.clientWidth * 0.94), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth * 0.94, behavior: 'smooth' });
    }
  };

  const videos = [
    {
      img: "/imgi_27_image.jpg",
      category: "United States",
      title: "Why is New York City building a jail skyscraper?",
      sub: "",
      time: "2:50"
    },
    {
      img: "/imgi_29_image.jpg",
      category: "Middle East",
      title: "Can Netanyahu win again?",
      sub: "With our Israel correspondent",
      time: "2:43"
    },
    {
      img: "/imgi_30_image.jpg",
      category: "Finance",
      title: "Are Europe's stock markets worth investing in?",
      sub: "with our Capital markets correspondent",
      time: "2:05"
    },
    {
      img: "/imgi_31_image.jpg",
      category: "International",
      title: "Could this man change Russia?",
      sub: "with our Russia editor",
      time: "2:51"
    },
    {
      img: "/imgi_32_image.jpg",
      category: "Geopolitics",
      title: "Could Indonesia disrupt global trade?",
      sub: "With our Asia diplomatic editor",
      time: "2:30"
    },
    {
      img: "/imgi_33_image.jpg",
      category: "Culture",
      title: "Has it got easier for short men to date?",
      sub: "",
      time: "2:17"
    },
    {
      img: "/imgi_34_image.jpg",
      category: "United States",
      title: "How powerful is America?",
      sub: "",
      time: "2:39"
    },
    {
      img: "/imgi_35_image.jpg",
      category: "United States",
      title: "How did the war on terror pave the way for ICE?",
      sub: "",
      time: "2:28"
    },
    {
      img: "/imgi_36_image.jpg",
      category: "Visual investigation",
      title: "Will Israel withdraw from Lebanon?",
      sub: "",
      time: "2:54"
    }
  ];

  return (
    <div className="w-full mt-2 mb-0 relative">
      <div className="w-full h-[1px] bg-black mb-4"></div>
      <h2 className="text-[21px] font-bold font-sans text-black mb-5 flex items-center group cursor-pointer w-fit tracking-tight">
        Latest videos <span className="ml-1 text-[20px] transition-transform group-hover:translate-x-1">→</span>
      </h2>
      
      <div className="relative group/carousel">
        {canScrollLeft && (
          <button 
            onClick={scrollLeft}
            className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 bg-white border border-[#ccc] w-[30px] h-[40px] flex items-center justify-center shadow-sm hover:bg-gray-50"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><polyline points="15 18 9 12 15 6"></polyline></svg>
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
              className="relative flex-shrink-0 snap-start cursor-pointer group"
              style={{ width: 'calc(23.5% - 11.25px)' }}
            >
              <div className="w-full relative aspect-[2/3.8] bg-[#111] overflow-hidden">
                <img src={vid.img} alt={vid.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end text-white z-10">
                  <div className="flex items-center gap-2 mt-auto pt-1">
                    {/* Play Icon */}
                    <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-white flex items-center justify-center pl-[2px]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                    </div>
                    <span className="text-[12.5px] font-bold font-sans tracking-wide">{vid.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button 
            onClick={scrollRight}
            className="absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 bg-white border border-[#ccc] w-[30px] h-[40px] flex items-center justify-center shadow-sm hover:bg-gray-50"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        )}
      </div>
    </div>
  );
}
