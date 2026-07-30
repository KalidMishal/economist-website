'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SubscriptionBanner() {
  const [isExpanded, setIsExpanded] = useState(true);
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
      onClick={toggleBanner}
      className={`fixed bottom-0 left-0 w-full bg-[#1c1f51] text-white z-[100] cursor-pointer transition-all duration-300 ease-in-out border-t-2 border-[#1c1f51] ${isExpanded ? 'h-[110px]' : 'h-[50px]'}`}
    >
      <div className="max-w-[1380px] mx-auto h-full px-4 xl:px-0 flex items-center justify-between relative">
        
        {isExpanded ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              {pathname === '/' ? (
                <>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-1">Get unlimited access to The Economist</h2>
                  <p className="text-[15px]">Now with Insider—weekly shows giving you unprecedented access to our senior editors</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-1">Start your free trial today</h2>
                  <p className="text-[15px]">Get invaluable analysis of global events</p>
                </>
              )}
            </div>
            
            <div className="flex items-center pr-8">
              <Link href="/subscribe" className="subscribe-btn bg-white text-[#1c1f51] hover:bg-gray-100 font-bold text-sm px-6 py-2.5 rounded-full transition-colors">
                Subscribe
              </Link>
            </div>
            <button className="text-white hover:text-gray-300 absolute right-0 top-1/2 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center relative">
            <div className="flex items-center gap-2">
              <span className="text-[15px]">Get invaluable analysis of global events.</span>
              <Link href="/subscribe" className="subscribe-btn underline font-bold text-[15px] hover:text-gray-300">
                Subscribe
              </Link>
            </div>
            
            <button className="absolute right-0 text-white hover:text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
