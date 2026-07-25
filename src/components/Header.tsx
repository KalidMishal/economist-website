"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const sections = [
  { label: "World", href: "/topics/world" },
  { label: "War News", href: "/topics/war-news" },
  { label: "Politics", href: "/topics/politics" },
  { label: "Business", href: "/topics/business" },
  { label: "Stock markets", href: "/topics/stock-markets" },
  { label: "Real Estate", href: "/topics/real-estate" },
  { label: "Sports", href: "/topics/sports" }
];

const featuredSections = [
  { title: "The world in brief", subtitle: "Catch up on global daily news", img: "/imgi_6_20250123_drp045.png" },
  { title: "1843", subtitle: "Compelling long reads", img: "/imgi_7_20250123_drp050.png" },
  { title: "Podcasts", subtitle: "Tune into captivating conversations", img: "/imgi_8_20250123_drp046.png" },
  { title: "Video", subtitle: "Watch engaging short films", img: "/imgi_9_20250123_drp044.png" },
  { title: "Insider", subtitle: "Behind the scenes at The Economist", img: "/imgi_10_20251001_DRP099.png" },
  { title: "Newsletters", subtitle: "Curated news, direct to your inbox", img: "/imgi_11_20250123_drp047.png" },
  { title: "Games", subtitle: "Workouts for agile minds", img: "/imgi_12_20260624_drp081.png" }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <header className="w-full bg-white font-sans text-black relative z-[100]">
      {/* Advertisement Top */}
      <div className={`w-full flex flex-col items-center justify-center py-[10px] ${isOpen || pathname === '/newsletters' ? 'hidden' : 'block'}`}>
        <span className="text-[9px] text-[#767676] uppercase tracking-[0.1em] mb-1 font-semibold">Advertisement</span>
        <div className="w-[970px] max-w-full h-[90px] bg-[#ffcf00] flex relative overflow-hidden items-center shadow-sm">
           <div className="flex flex-col justify-center items-start text-black absolute left-[8%] z-10">
             <h3 className="font-bold text-[22px] leading-[1.2] mb-0.5">How are countries tackling obesity<br/>and where is action most needed?</h3>
             <p className="text-[13px] font-bold underline decoration-2 underline-offset-4 cursor-pointer">Explore our Obesity Response Index</p>
           </div>
           
           <div className="absolute right-[20%] bottom-[-50px] w-[300px] h-[300px] bg-[#e5ba00] rounded-full opacity-30"></div>
           <div className="absolute right-[15%] bottom-0 w-[200px] h-[150px] bg-white/20 rounded-t-full"></div>
           
           <div className="absolute right-4 bottom-2 text-[#e31837] flex flex-col items-end">
             <span className="font-serif italic font-bold text-[28px] leading-none mb-1">Lilly</span>
             <span className="text-[8px] font-bold text-black uppercase tracking-widest">A Medicine Company</span>
           </div>
        </div>
      </div>

      {/* Placeholder to prevent layout jump when sticky */}
      <div className={`w-full transition-all ${(isScrolled && !isOpen) ? 'h-[80px]' : 'h-0'}`}></div>

      {/* Main Header Row */}
      <div className={`w-full bg-white z-[110] transition-all duration-200 ${(isScrolled || isOpen) ? 'fixed top-0 left-0 border-b border-gray-300 shadow-sm' : 'relative border-t border-[#e6e6e6] mt-2'} ${isScrolled ? 'animate-slide-down' : ''}`}>
        <div className={`max-w-[1380px] mx-auto flex items-center justify-between ${(isScrolled && !isOpen) ? 'h-[65px]' : 'h-[80px]'} px-4 xl:px-0 transition-all duration-200`}>
          
          {/* Left Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0 h-full flex items-center">
            <img 
              src={isScrolled ? "/imgi_3_signature-red.svg" : "/imgi_5_logo-red.svg"} 
              alt="The Economist" 
              className={`${isScrolled ? 'h-[25px]' : 'h-[70px]'} w-auto object-contain hover:opacity-90`} 
            />
          </Link>

          {/* Right Actions */}
          <div className="flex justify-end items-center gap-[16px] text-[14px] font-medium text-[#0f0f0f]">

            
            <Link href="/newsletters" className="hover:text-[#E3120B] transition-colors hidden lg:block">
              Newsletter Signup
            </Link>

            <div className="w-[1px] h-[16px] bg-[#ccc] hidden lg:block"></div>

            <Link href="/login" className="hover:text-[#E3120B] transition-colors hidden lg:block">
              Log in
            </Link>

            <div className="w-[1px] h-[16px] bg-[#ccc] hidden lg:block"></div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 hover:text-[#E3120B] transition-colors font-bold text-black ${isOpen ? 'bg-gray-100 px-3 py-2 rounded-sm' : ''}`}
            >
              {isOpen ? (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Close
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="butt">
                    <path d="M3 7h7" />
                    <path d="M3 12h7" />
                    <path d="M3 17h11" />
                    <circle cx="15.5" cy="11.5" r="4.5" />
                    <path d="M18.68 14.68L22 18" />
                  </svg>
                  Menu
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Black Line for pages without sub-nav (like newsletters) */}
      {!isOpen && pathname === '/newsletters' && (
        <div className="w-full border-t border-black"></div>
      )}

      {/* Sub Nav (hidden when open or on newsletters page) */}
      {!isOpen && pathname !== '/newsletters' && (
        <div className="w-full border-t border-black border-b border-[#e6e6e6]">
          <div className="max-w-[1380px] mx-auto px-4 xl:px-0 py-2.5">
            <ul className="flex items-center justify-center gap-x-10 lg:gap-x-14 w-full flex-wrap gap-y-[10px]">
              {sections.map((section, idx) => (
                <li key={idx} className="shrink-0">
                  <Link href={section.href} className="text-[13px] font-bold text-[#333] hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap uppercase">
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-white z-[105] overflow-y-auto pt-6 pb-20">
          <div className="max-w-[1380px] mx-auto px-4 xl:px-0 flex flex-col md:flex-row gap-8">
            
            {/* Left Column: Search & Featured */}
            <div className="w-full md:w-[28%] flex flex-col border-r border-[#e6e6e6] pr-6">
              <div className="w-full flex items-center border border-gray-400 mb-8 overflow-hidden rounded-sm hover:border-black transition-colors focus-within:border-black">
                <input type="text" placeholder="Search or ask a question" className="w-full h-[40px] px-3 text-[15px] outline-none" />
                <button className="w-[40px] h-[40px] bg-[#333] flex items-center justify-center flex-shrink-0 hover:bg-black transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {featuredSections.map((sec, idx) => (
                  <div key={idx} className="flex items-start gap-4 group cursor-pointer">
                    <img src={sec.img} alt={sec.title} className="w-[28px] h-[28px] object-contain flex-shrink-0" />
                    <div className="flex flex-col mt-[-2px]">
                      <span className="text-[17px] font-serif group-hover:text-[#00508f] group-hover:underline decoration-1 underline-offset-4 transition-colors">{sec.title}</span>
                      <span className="text-[12px] italic font-serif text-gray-700">{sec.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Columns: Links */}
            <div className="w-full md:w-[72%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              
              {/* Col 1 */}
              <div className="flex flex-col">
                <h4 className="text-[11px] font-bold text-[#e3120b] uppercase tracking-[0.1em] mb-5">World</h4>
                <ul className="flex flex-col gap-[16px] text-[15px] font-medium text-black">
                  <li><Link href="/topics/china" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">China</Link></li>
                  <li><Link href="/topics/europe" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Europe</Link></li>
                  <li><Link href="/topics/britain" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Britain</Link></li>
                  <li><Link href="/topics/middle-east" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Middle East</Link></li>
                  <li><Link href="/topics/africa" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Africa</Link></li>
                  <li><Link href="/topics/asia" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Asia</Link></li>
                  <li><Link href="/topics/usa" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">USA</Link></li>
                  <li><Link href="/topics/war-news" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">War News</Link></li>
                </ul>

                <h4 className="text-[11px] font-bold text-[#e3120b] uppercase tracking-[0.1em] mb-5 mt-10">Industries</h4>
                <ul className="flex flex-col gap-[16px] text-[15px] font-medium text-black">
                  <li><Link href="/topics/energy" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Energy</Link></li>
                  <li><Link href="/topics/real-estate" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Real Estate</Link></li>
                  <li><Link href="/topics/agriculture" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Agriculture</Link></li>
                  <li><Link href="/topics/healthcare" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Healthcare</Link></li>
                  <li><Link href="/topics/tourism-and-hospitality" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Tourism &amp; Hospitality- Culture</Link></li>
                  <li><Link href="/topics/sports" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Sports</Link></li>
                </ul>
              </div>

              {/* Col 2 */}
              <div className="flex flex-col">
                <h4 className="text-[11px] font-bold text-[#e3120b] uppercase tracking-[0.1em] mb-5 whitespace-nowrap">Business &amp; Economics</h4>
                <ul className="flex flex-col gap-[16px] text-[15px] font-medium text-black">
                  <li><Link href="/topics/business" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Business</Link></li>
                  <li><Link href="/topics/opinions" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Opinions</Link></li>
                  <li><Link href="/topics/cost-of-living" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Cost of Living</Link></li>
                  <li><Link href="/topics/stock-markets" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Stock Markets</Link></li>
                  <li><Link href="/topics/cryptocurrency" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Cryptocurrency</Link></li>
                  <li><Link href="/topics/leadership" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Leadership</Link></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div className="flex flex-col">
                <h4 className="text-[11px] font-bold text-[#e3120b] uppercase tracking-[0.1em] mb-5">Politics</h4>
                <ul className="flex flex-col gap-[16px] text-[15px] font-medium text-black">
                  <li><Link href="/topics/elections" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Elections</Link></li>
                  <li><Link href="/topics/the-white-house" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">The White House</Link></li>
                  <li><Link href="/topics/congress" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Congress</Link></li>
                  <li><Link href="/topics/international-relations" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">International Relations</Link></li>
                  <li><Link href="/topics/human-rights" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Human Rights</Link></li>
                  <li><Link href="/topics/law-and-justice" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Law &amp; Justice</Link></li>
                </ul>
              </div>

              {/* Col 4 */}
              <div className="flex flex-col">
                <h4 className="text-[11px] font-bold text-[#e3120b] uppercase tracking-[0.1em] mb-5 whitespace-nowrap">Finance &amp; Technology</h4>
                <ul className="flex flex-col gap-[16px] text-[15px] font-medium text-black">
                  <li><Link href="/topics/artificial-intelligence" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Artificial intelligence</Link></li>
                  <li><Link href="/topics/innovations" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Innovations</Link></li>
                  <li><Link href="/topics/banking" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Banking</Link></li>
                  <li><Link href="/topics/investment" onClick={() => setIsOpen(false)} className="hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors">Investment</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}

