"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const sections = [
  { label: "United States", href: "/topics/united-states" },
  { label: "Politics", href: "/topics/politics" },
  { label: "Business", href: "/topics/business" },
  { label: "Technology", href: "/topics/technology" },
  { label: "Stock markets", href: "/topics/stock-markets" },
  { label: "China", href: "/topics/china" },
  { label: "Asia", href: "/topics/asia" },
  { label: "Europe", href: "/topics/europe" },
  { label: "Middle East", href: "/topics/middle-east" },
  { label: "Finance & Economics", href: "/topics/finance-and-economics" },
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
      window.dispatchEvent(new Event('menuOpened'));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new Event('menuClosed'));
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <header className="w-full bg-white font-sans text-black relative z-[100] mb-[55px]">
      {/* Advertisement removed as per user request */}
      
      {/* Placeholder to prevent layout jump when sticky */}
      <div className={`w-full transition-all ${(isScrolled && !isOpen) ? 'h-[80px]' : 'h-0'}`}></div>

      {/* Main Header Row */}
      <div className={`w-full bg-white z-[110] transition-all duration-200 ${(isScrolled || isOpen) ? 'fixed top-0 left-0 border-b border-gray-300 shadow-sm' : 'relative'} ${isScrolled ? 'animate-slide-down' : ''}`}>
        <div className={`max-w-[1600px] mx-auto flex items-center justify-between ${(isScrolled && !isOpen) ? 'h-[65px]' : 'h-[80px]'} px-4 xl:px-0 transition-all duration-200`}>
          
          {/* Left Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className={`flex-shrink-0 h-full flex ${(!isScrolled && pathname !== '/subscribe') ? 'items-start' : 'items-center'}`}>
            <img 
              src={isScrolled && pathname !== '/subscribe' ? "/Logo 2 Newyork capital.svg" : "/Logo Newyork Capital.svg"} 
              alt="Newyork Capital" 
              className={`${isScrolled && pathname !== '/subscribe' ? 'h-[25px]' : 'h-[165px]'} w-auto object-contain`} 
            />
          </Link>

          {/* Right Actions */}
          <div className="flex justify-end items-center gap-[16px] text-[15.5px] font-bold text-[#0f0f0f]">
            <Link href="/search" className="hidden lg:flex items-center justify-center hover:text-[#E3120B] transition-colors" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Link>
            <div className="w-[1px] h-[16px] bg-[#ccc] hidden lg:block"></div>

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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                  Menu
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Black Line for pages without sub-nav (like newsletters or subscribe) */}
      {!isOpen && (pathname === '/newsletters' || pathname === '/subscribe') && (
        <div className="w-full border-t border-black"></div>
      )}

      {/* Sub Nav (hidden when open or on newsletters/subscribe page) */}
      {!isOpen && pathname !== '/newsletters' && pathname !== '/subscribe' && (
        <div className="w-full border-t border-black border-b border-[#e6e6e6]">
          <div className="max-w-[1600px] mx-auto px-4 xl:px-0 py-2.5">
            <ul className="flex items-center justify-between md:pl-[170px] lg:pl-[210px] xl:pl-[230px] w-full flex-wrap gap-y-[10px] gap-x-2">
              {sections.map((section, idx) => (
                <li key={idx} className="shrink-0">
                  <Link href={section.href} className="text-[15px] lg:text-[15.5px] font-extrabold text-[#333] hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap">
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
        <div className="fixed top-[80px] left-0 w-full overflow-y-auto bg-white z-[105] shadow-lg border-t border-[#e6e6e6] pt-[120px] pb-12 max-h-[calc(100vh-80px)]">
          <div className="max-w-[1600px] mx-auto px-4 xl:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
              
              {/* Col 1: World */}
              <div className="flex flex-col relative h-full">
                <Link href="/topics/world" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">WORLD</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/topics/united-states" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">United States</Link></li>
                  <li><Link href="/topics/china" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">China</Link></li>
                  <li><Link href="/topics/europe" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Europe</Link></li>
                  <li><Link href="/topics/britain" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Britain</Link></li>
                  <li><Link href="/topics/middle-east" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Middle East</Link></li>
                  <li><Link href="/topics/africa" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Africa</Link></li>
                  <li><Link href="/topics/asia" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Asia</Link></li>
                </ul>
                <div className="mt-20">
                  <Link href="/topics/world" onClick={() => setIsOpen(false)} className="text-[12.5px] font-bold text-[#e3120b] uppercase tracking-[0.1em] hover:underline decoration-1 underline-offset-4">VIEW ALL NEWS</Link>
                </div>
              </div>

              {/* Col 2: Finance & Economics */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/topics/finance-and-economics" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">FINANCE &amp; ECONOMICS</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/topics/business" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Business</Link></li>
                  <li><Link href="/topics/opinions" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Opinions</Link></li>
                  <li><Link href="/topics/cost-of-living" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Cost of Living</Link></li>
                  <li><Link href="/topics/stock-markets" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Stock Markets</Link></li>
                  <li><Link href="/topics/cryptocurrency" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Cryptocurrency</Link></li>
                  <li><Link href="/topics/leadership" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Leadership</Link></li>
                </ul>
              </div>

              {/* Col 3: Politics */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/topics/politics" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">POLITICS</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/topics/elections" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Elections</Link></li>
                  <li><Link href="/topics/the-white-house" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">The White House</Link></li>
                  <li><Link href="/topics/congress" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Congress</Link></li>
                  <li><Link href="/topics/international-relations" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">International Relations</Link></li>
                  <li><Link href="/topics/human-rights" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Human Rights</Link></li>
                  <li><Link href="/topics/law-and-justice" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Law &amp; Justice</Link></li>
                </ul>
              </div>

              {/* Col 4: Technology */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/topics/technology" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">TECHNOLOGY</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/topics/artificial-intelligence" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Artificial intelligence</Link></li>
                  <li><Link href="/topics/innovations" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Innovations</Link></li>
                  <li><Link href="/topics/banking" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Banking</Link></li>
                  <li><Link href="/topics/investment" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Investment</Link></li>
                </ul>
              </div>

              {/* Col 5: Industries */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/topics/industries" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">INDUSTRIES</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/topics/energy" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Energy</Link></li>
                  <li><Link href="/topics/real-estate" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Real Estate</Link></li>
                  <li><Link href="/topics/agriculture" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Agriculture</Link></li>
                  <li><Link href="/topics/healthcare" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Healthcare</Link></li>
                  <li><Link href="/topics/entertainment" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Entertainment</Link></li>
                  <li><Link href="/topics/tourism-and-hospitality" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Tourism &amp; Hospitality</Link></li>
                  <li><Link href="/topics/culture" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Culture</Link></li>
                  <li><Link href="/topics/sports" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Sports</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}

