'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const cookiesData = [
  {
    id: 'what-are-cookies',
    title: '1. What Are Cookies?',
    content: (
      <>
        <p className="mb-4">
          Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They help websites function properly, improve user experience, remember preferences, and provide analytical information.
        </p>
        <p>
          Cookies do not generally contain information that personally identifies you, but they may be linked to personal information that you voluntarily provide.
        </p>
      </>
    )
  },
  {
    id: 'types-of-cookies',
    title: '2. Types of Cookies We Use',
    content: (
      <div className="flex flex-col gap-4">
        <div className="bg-gray-50 p-5 border border-gray-200">
          <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider mb-2">Essential Cookies</h3>
          <p className="text-[14.5px] font-sans text-gray-700 leading-relaxed">
            These cookies are necessary for the operation of our website. They enable core features such as page navigation, secure access, account login, and website functionality. These cookies cannot be disabled.
          </p>
        </div>
        <div className="bg-gray-50 p-5 border border-gray-200">
          <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider mb-2">Performance and Analytics Cookies</h3>
          <p className="text-[14.5px] font-sans text-gray-700 leading-relaxed">
            These cookies help us understand how visitors interact with our website by collecting anonymous statistical information such as pages visited, time spent, traffic sources, device type, browser settings, and geographic region.
          </p>
        </div>
        <div className="bg-gray-50 p-5 border border-gray-200">
          <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider mb-2">Functionality Cookies</h3>
          <p className="text-[14.5px] font-sans text-gray-700 leading-relaxed">
            These cookies remember your preferences and settings, including language selection, region, login preferences, and display settings, providing a more personalized browsing experience.
          </p>
        </div>
        <div className="bg-gray-50 p-5 border border-gray-200">
          <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider mb-2">Advertising Cookies</h3>
          <p className="text-[14.5px] font-sans text-gray-700 leading-relaxed">
            Advertising cookies may be used to display relevant advertisements based on your interests and browsing activity, measure campaign effectiveness, and limit ad repetitions.
          </p>
        </div>
        <div className="bg-gray-50 p-5 border border-gray-200">
          <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider mb-2">Third-Party Cookies</h3>
          <p className="text-[14.5px] font-sans text-gray-700 leading-relaxed">
            Some features of our website rely on trusted third-party services (such as analytics providers, embedded videos, social media tools, and advertising networks). These third parties may place cookies on your device. Newyork Capital does not control third-party cookies.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'how-we-use-cookies',
    title: '3. How We Use Cookies',
    content: (
      <p>
        We use cookies to operate and secure our website, remember user preferences, improve website performance, analyze visitor behavior, enhance user experience, measure website traffic, support marketing activities, and detect fraud.
      </p>
    )
  },
  {
    id: 'managing-cookies',
    title: '4. Managing Cookies',
    content: (
      <>
        <p className="mb-4">
          Most web browsers allow you to control cookies through their settings. You may choose to accept all cookies, reject non-essential cookies, delete existing cookies, or receive notifications before cookies are stored.
        </p>
        <p className="font-bold text-[#0f0f0f]">
          Please note that disabling certain cookies may affect the functionality and performance of our website.
        </p>
      </>
    )
  },
  {
    id: 'changes-to-policy',
    title: '5. Changes to This Cookie Policy',
    content: (
      <p>
        We may update this Cookie Policy periodically to reflect changes in technology, legal requirements, or our business practices. The updated version will be posted on this page with a revised "Last Updated" date.
      </p>
    )
  },
  {
    id: 'contact-us',
    title: '6. Contact Us',
    content: (
      <>
        <p className="mb-4">
          If you have any questions about this Cookie Policy or our privacy practices, please contact us:
        </p>
        <div className="bg-gray-50 p-6 border border-gray-200">
          <p className="font-bold text-[#0f0f0f]">Newyork Capital</p>
          <p>2316 Eastgate St #180</p>
          <p>Walla Walla, Washington (WA) 99362</p>
          <p>United States</p>
          <p className="mt-4">
            Email: <a href="mailto:newyorkcapital4@gmail.com" className="font-bold text-[#E3120B] hover:underline">newyorkcapital4@gmail.com</a>
          </p>
        </div>
      </>
    )
  }
];

export default function CookiesPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', ...cookiesData.map(t => t.id)];
      let currentActive = 'introduction';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentActive = section;
          }
        }
      }
      
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Top Header Banner */}
      <div className="w-full bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto w-[92%] flex flex-col items-center text-center">
          <span className="text-[#E3120B] text-[11px] md:text-[13px] font-sans font-bold tracking-[0.15em] uppercase mb-4">
            LEGAL DOCUMENT • COOKIE MANAGEMENT
          </span>
          <h1 className="text-4xl md:text-[44px] font-serif font-bold text-[#0f0f0f] mb-4">
            Cookie Policy
          </h1>
          <p className="text-[13px] font-sans text-gray-500 uppercase tracking-widest">
            Last Updated: September 13, 2026
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto w-[92%] py-12 md:py-16">
        {/* REVERSED LAYOUT: Sections on the right, content on the left */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          
          {/* Main Content (Left Side) */}
          <div className="lg:w-3/4 flex flex-col gap-10">
            
            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-6">
                Introduction
              </h2>
              <div className="text-[15.5px] font-sans text-gray-800 leading-relaxed space-y-5">
                <p>
                  This Cookie Policy explains how <strong>Newyork Capital</strong> ("Newyork Capital," "we," "our," or "us") uses cookies and similar tracking technologies when you visit our website and use our online services.
                </p>
                <p>
                  By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy, unless you disable them through your browser settings.
                </p>
              </div>
            </section>

            {cookiesData.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 pt-6 border-t border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-5">
                  {section.title}
                </h2>
                <div className="text-[15.5px] font-sans text-gray-800 leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Cookie Policy Sections (Right Side) */}
          <div className="lg:w-1/4 relative">
            <div className="sticky top-32 bg-[#f9fbfd] border border-[#e8eff5] p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#e8eff5]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#2962ff]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider">
                  Cookie Policy Sections
                </h3>
              </div>
              
              <ul className="flex flex-col gap-3 text-[13.5px] font-sans text-gray-600">
                <li>
                  <a 
                    href="#introduction" 
                    onClick={(e) => scrollToSection(e, 'introduction')}
                    className={`block hover:text-[#E3120B] transition-colors ${activeSection === 'introduction' ? 'text-[#E3120B] font-bold' : ''}`}
                  >
                    Introduction
                  </a>
                </li>
                {cookiesData.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`} 
                      onClick={(e) => scrollToSection(e, section.id)}
                      className={`block hover:text-[#E3120B] transition-colors leading-snug ${activeSection === section.id ? 'text-[#E3120B] font-bold bg-white -mx-6 px-6 py-1 border-l-2 border-[#E3120B]' : ''}`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
