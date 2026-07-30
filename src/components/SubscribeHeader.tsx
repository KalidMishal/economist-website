"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const countries = [
  "Réunion", "Romania", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", 
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", 
  "Spain", "Sri Lanka"
];

export default function SubscribeHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Sri Lanka");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="w-full bg-white font-sans text-black z-[110] border-b border-[#e6e6e6] relative mt-2">
        <div className="w-full flex items-center justify-between h-[80px] px-4 md:px-8">
          
          {/* Left Logo - ALWAYS the red block logo */}
          <Link href="/" className="flex-shrink-0 h-full flex items-start">
            <img 
              src="/Logo Newyork Capital.svg" 
              alt="Newyork Capital" 
              className="h-[165px] w-auto object-contain hover:opacity-90" 
            />
          </Link>

          {/* Right Actions */}
          <div className="flex justify-end items-center gap-[16px] md:gap-[24px] text-[13px] font-bold text-[#333] h-full relative">
            
            <Link href="/search" className="hidden lg:flex items-center justify-center hover:text-[#E3120B] transition-colors" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
          </Link>
            <div className="w-[1px] h-[16px] bg-[#ccc] hidden lg:block"></div>

            <Link href="/newsletters" className="hover:text-[#E3120B] transition-colors hidden lg:block whitespace-nowrap">
              Newsletter Signup
            </Link>
            <div className="w-[1px] h-[16px] bg-[#ccc] hidden lg:block"></div>

            <Link href="/login" className="hover:text-[#E3120B] transition-colors hidden lg:block whitespace-nowrap">
              Log in
            </Link>
            <div className="w-[1px] h-[16px] bg-[#ccc] hidden lg:block"></div>

            {/* Custom Dropdown */}
            <div className="relative h-full flex items-center" ref={dropdownRef}>
              <div 
                className="flex items-center cursor-pointer hover:text-[#E3120B] transition-colors gap-8"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedCountry}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-[80px] right-[-20px] w-[260px] max-h-[300px] overflow-y-auto bg-white border border-gray-300 shadow-lg py-2 z-50 rounded-sm">
                  {countries.map((country) => (
                    <div 
                      key={country}
                      className={`px-4 py-1.5 text-[13px] font-normal cursor-pointer hover:bg-gray-100 ${country === selectedCountry ? 'bg-[#00508f] text-white hover:bg-[#00508f]' : 'text-gray-800'}`}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
