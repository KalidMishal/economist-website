'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SubscriptionBanner() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleOpen = () => setIsMenuOpen(true);
    const handleClose = () => setIsMenuOpen(false);
    
    window.addEventListener('menuOpened', handleOpen);
    window.addEventListener('menuClosed', handleClose);
    
    return () => {
      window.removeEventListener('menuOpened', handleOpen);
      window.removeEventListener('menuClosed', handleClose);
    };
  }, []);

  // Do not show on auth, internal dashboards, newsletters, or subscribe pages
  if (
    !isVisible ||
    isMenuOpen ||
    pathname.startsWith('/admin') || 
    pathname.startsWith('/writer') || 
    pathname.startsWith('/reader') || 
    pathname.startsWith('/login') || 
    pathname.startsWith('/register') ||
    pathname.startsWith('/newsletters') ||
    pathname.startsWith('/subscribe')
  ) {
    return null;
  }

  const toggleBanner = (e: React.MouseEvent) => {
    // Prevent toggle if clicking the subscribe button itself
    if ((e.target as HTMLElement).closest('.subscribe-btn')) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      
      className={`fixed bottom-0 left-0 w-full bg-[#1c1f51] text-white z-[100] cursor-pointer transition-all duration-300 ease-in-out border-t-2 border-[#1c1f51] ${isExpanded ? 'h-[90px] md:h-[110px]' : 'h-[50px]'}`}
    >
      <div className="max-w-[1600px] mx-auto h-full w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] flex items-center justify-between relative">
        
        {isExpanded ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col pr-4">
              <h2 className="text-[17px] md:text-3xl font-serif font-bold mb-1 leading-tight">Start your free trial today</h2>
              <p className="text-[12px] md:text-[15px] mt-1">Get invaluable analysis of global events.</p>
            </div>
            
            <div className="flex items-center pr-24 md:pr-32 shrink-0">
              <Link href="/subscribe" className="subscribe-btn bg-white text-[#1c1f51] hover:bg-gray-100 font-bold text-[12px] md:text-sm px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-colors whitespace-nowrap">
                Subscribe
              </Link>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
              <button onClick={toggleBanner} className="text-white hover:text-gray-300 p-1.5 md:p-2" aria-label="Collapse">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} className="text-white hover:text-gray-300 p-1.5 md:p-2 ml-1" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center relative">
            <div className="flex items-center gap-2 text-[13px] md:text-[15px] pr-24 md:pr-32">
              <span>Get invaluable analysis of global events.</span>
              <Link href="/subscribe" className="subscribe-btn underline font-bold hover:text-gray-300 whitespace-nowrap">
                Subscribe
              </Link>
            </div>
            
            <div className="absolute right-0 flex items-center">
              <button onClick={toggleBanner} className="text-white hover:text-gray-300 p-1.5 md:p-2" aria-label="Expand">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} className="text-white hover:text-gray-300 p-1.5 md:p-2 ml-1" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
