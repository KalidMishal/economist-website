"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ReaderProfileSettingsModal from './ReaderProfileSettingsModal';

const sections = [
  { label: "United States", href: "/category/united-states" },
  { label: "Politics", href: "/category/politics" },
  { label: "Business", href: "/category/business" },
  { label: "Technology", href: "/category/technology" },
  { label: "Stock markets", href: "/category/stock-markets" },
  { label: "China", href: "/category/china" },
  { label: "Asia", href: "/category/asia" },
  { label: "Europe", href: "/category/europe" },
  { label: "Middle East", href: "/category/middle-east" },
  { label: "Finance & Economics", href: "/category/finance-and-economics" },
  { label: "Sports", href: "/category/sports" }
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
  
  const [user, setUser] = useState<{id?: string | number, name: string, email: string, role: string} | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({ fullName: '', photo: '' });
  const [toastMessage, setToastMessage] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          const storedProfile = localStorage.getItem(`userProfile_${parsed.email}`) ;
          if (storedProfile) {
            setProfileData(JSON.parse(storedProfile));
          } else {
            setProfileData({
              fullName: parsed.name,
              photo: parsed.profile_picture || 'https://randomuser.me/api/portraits/men/32.jpg'
            });
          }
        } catch(e) {}
      }
    };
    
    fetchUser();
    window.addEventListener('userProfileUpdated', fetchUser);
    return () => window.removeEventListener('userProfileUpdated', fetchUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user'); localStorage.removeItem('userProfile'); Object.keys(localStorage).forEach(k => { if (k.startsWith('userProfile_')) localStorage.removeItem(k); });
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 170) {
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
    <>
    <header className="w-full bg-white font-sans text-black relative z-[100] mb-[55px]">
      {/* Advertisement removed as per user request */}
      
      {/* Placeholder to prevent layout jump when sticky */}
      <div className={`w-full transition-all ${(isScrolled && !isOpen) ? 'h-[80px]' : 'h-0'}`}></div>

      {/* Main Header Row */}
      <div className={`w-full bg-white z-[110] transition-all duration-200 ${(isScrolled || isOpen) ? 'fixed top-0 left-0 border-b border-gray-300 shadow-sm' : 'relative'} ${isScrolled ? 'animate-slide-down' : ''}`}>
        <div className={`max-w-[1600px] mx-auto flex items-center justify-between relative ${(isScrolled && !isOpen) ? 'h-[65px]' : 'h-[80px]'} w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] transition-all duration-200`}>
          
          
          {/* Mobile Left Actions (Hamburger + Search) */}
          <div className="flex md:hidden items-center gap-4 text-[#0f0f0f]">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2 hover:text-[#E3120B] transition-colors font-bold text-black ${isOpen ? 'bg-gray-100 px-2 py-1 rounded-sm' : ''}`}
            >
              {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
            <Link href="/search" className="flex items-center justify-center hover:text-[#E3120B] transition-colors" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Link>
          </div>

          {/* Left Logo */}
          <Link href="/" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }} className={`flex-shrink-0 h-full flex ${(!(isScrolled || isOpen) && pathname !== '/subscribe') ? 'items-start' : 'items-center'}`}>
            <img 
              src={(isScrolled || isOpen) && pathname !== '/subscribe' ? "/Logo 2 Newyork capital.svg" : "/Logo Newyork Capital.svg"} 
              alt="Newyork Capital" 
              className={`${(isScrolled || isOpen) && pathname !== '/subscribe' ? 'h-6 md:h-7 max-w-44' : 'h-[80px] md:h-[60px] lg:h-[105px] xl:h-[135px] 2xl:h-[165px]'} w-auto object-contain`} 
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

            {user ? (
              <div className="relative block md:hidden lg:block" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 focus:outline-none relative"
                >
                  <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" />
                </button>
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full z-10 pointer-events-none"></div>
                
                {isProfileOpen && (
                  <div className="absolute right-0 top-[120%] w-64 bg-white border border-gray-200 shadow-xl py-2 z-[200]">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 leading-none mb-1">{profileData.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email || 'mishalzuh@gmail.com'}</p>
                    </div>
                    <div className="py-1 border-b border-gray-100">
                      {user.role === 'writer' ? (
                        <>
                          <Link href="/writer/dashboard" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-[13px] text-[#00508f] font-medium hover:bg-gray-50 flex items-center gap-3">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            Author Workspace
                          </Link>
                          <Link href={`/author/${user.name?.toLowerCase().replace(/\s+/g, '-') || user.id}`} onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            Writer Page
                          </Link>
                          <button onClick={() => { setIsProfileOpen(false); setIsSettingsModalOpen(true); }} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Profile Settings
                          </button>
                        </>
                      ) : user.role === 'admin' ? (
                        <>
                          <Link href="/admin/dashboard" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-[13px] text-[#e3120b] font-bold hover:bg-red-50 flex items-center gap-3">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            Editor Control Panel
                          </Link>
                          <button onClick={() => { setIsProfileOpen(false); setIsSettingsModalOpen(true); }} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Profile Settings
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/reader/dashboard" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            Readers Dashboard
                          </Link>
                          <button onClick={() => { setIsProfileOpen(false); setIsSettingsModalOpen(true); }} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Profile Settings
                          </button>
                        </>
                      )}
                    </div>
                    <div className="py-1">
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sign Out Terminal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hover:text-[#E3120B] transition-colors block md:hidden lg:block">
                Log in
              </Link>
            )}

            <div className="w-[1px] h-[16px] bg-[#ccc] hidden lg:block"></div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`hidden md:flex items-center gap-2 hover:text-[#E3120B] transition-colors font-bold text-black ${isOpen ? 'bg-gray-100 px-3 py-2 rounded-sm' : ''}`}
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
          <div className="max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] py-2.5">
            <ul className="flex items-center justify-start md:justify-between md:pl-[170px] lg:pl-[170px] xl:pl-[210px] 2xl:pl-[250px] w-full flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible gap-[20px] md:gap-y-[10px] md:gap-[14px] md:gap-x-2 px-2 md:px-0 custom-scrollbar-hide">
              {sections.map((section, idx) => (
                <li key={idx} className="shrink-0">
                  <Link href={section.href} className="text-[13px] lg:text-[13.5px] 2xl:text-[15.5px] font-extrabold text-[#333] hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap">
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
        <div className="fixed top-[80px] left-0 w-full overflow-y-auto bg-white z-[105] shadow-lg border-t border-[#e6e6e6] pt-6 md:pt-[90px] lg:pt-8 pb-12 max-h-[calc(100vh-80px)]">
          <div className="max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-6 md:gap-y-12">
              
              {/* Col 1: World */}
              <div className="flex flex-col relative h-full">
                <Link href="/category/world" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">WORLD</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/category/united-states" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">United States</Link></li>
                  <li><Link href="/category/china" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">China</Link></li>
                  <li><Link href="/category/europe" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Europe</Link></li>
                  <li><Link href="/category/britain" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Britain</Link></li>
                  <li><Link href="/category/middle-east" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Middle East</Link></li>
                  <li><Link href="/category/africa" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Africa</Link></li>
                  <li><Link href="/category/asia" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Asia</Link></li>
                </ul>
                <div className="hidden md:block mt-20">
                  <Link href="/category/world" onClick={() => setIsOpen(false)} className="hidden md:inline-block text-[12.5px] font-bold text-[#e3120b] uppercase tracking-[0.1em] hover:underline decoration-1 underline-offset-4">VIEW ALL NEWS</Link>
                </div>
              </div>

              {/* Col 2: Finance & Economics */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/category/finance-and-economics" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">FINANCE &amp; ECONOMICS</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/category/business" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Business</Link></li>
                  <li><Link href="/category/opinions" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Opinions</Link></li>
                  <li><Link href="/category/cost-of-living" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Cost of Living</Link></li>
                  <li><Link href="/category/stock-markets" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Stock Markets</Link></li>
                  <li><Link href="/category/cryptocurrency" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Cryptocurrency</Link></li>
                  <li><Link href="/category/leadership" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Leadership</Link></li>
                </ul>
              </div>

              {/* Col 3: Politics */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/category/politics" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">POLITICS</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/category/elections" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Elections</Link></li>
                  <li><Link href="/category/the-white-house" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">The White House</Link></li>
                  <li><Link href="/category/congress" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Congress</Link></li>
                  <li><Link href="/category/international-relations" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">International Relations</Link></li>
                  <li><Link href="/category/human-rights" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Human Rights</Link></li>
                  <li><Link href="/category/law-and-justice" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Law &amp; Justice</Link></li>
                </ul>
              </div>

              {/* Col 4: Technology */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/category/technology" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">TECHNOLOGY</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/category/artificial-intelligence" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Artificial intelligence</Link></li>
                  <li><Link href="/category/innovations" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Innovations</Link></li>
                  <li><Link href="/category/banking" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Banking</Link></li>
                  <li><Link href="/category/investment" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Investment</Link></li>
                </ul>
              </div>

              {/* Col 5: Industries */}
              <div className="flex flex-col border-l-0 lg:border-l border-[#f0f0f0] lg:pl-8">
                <Link href="/category/industries" onClick={() => setIsOpen(false)} className="hover:underline decoration-1 underline-offset-4 decoration-[#e3120b] w-fit">
                  <h4 className="text-[14.5px] font-bold text-[#e3120b] uppercase tracking-wide mb-6">INDUSTRIES</h4>
                </Link>
                <ul className="flex flex-col gap-[14px] text-[16px] font-medium text-[#333]">
                  <li><Link href="/category/energy" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Energy</Link></li>
                  <li><Link href="/category/real-estate" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Real Estate</Link></li>
                  <li><Link href="/category/agriculture" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Agriculture</Link></li>
                  <li><Link href="/category/healthcare" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Healthcare</Link></li>
                  <li><Link href="/category/entertainment" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Entertainment</Link></li>
                  <li><Link href="/category/tourism-and-hospitality" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Tourism &amp; Hospitality</Link></li>
                  <li><Link href="/category/culture" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Culture</Link></li>
                  <li><Link href="/category/sports" onClick={() => setIsOpen(false)} className="hover:text-[#e3120b] transition-colors">Sports</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Profile Settings Modal */}
      <ReaderProfileSettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
        onProfileUpdate={(newProfile) => {
          setProfileData(newProfile);
          showToast('Profile updated successfully!');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded shadow-lg z-[400] flex items-center gap-3 animate-fade-in-up">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </>
  );
}

