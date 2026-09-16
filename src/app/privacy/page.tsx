'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const privacyData = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: (
      <>
        <p className="mb-4">We may collect the following categories of information:</p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <strong>Personal Information:</strong> Full name, email address, phone number (if provided), postal address (if provided), account information, and billing information (when applicable).
          </li>
          <li>
            <strong>Technical Information:</strong> IP address, browser type, device information, operating system, referring website, pages visited, date and time of access, and cookies.
          </li>
          <li>
            <strong>Content You Submit:</strong> When you submit articles, comments, press releases, photographs, videos, or other materials, we collect the information necessary to process and publish your submissions.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'how-we-use-information',
    title: '2. How We Use Your Information',
    content: (
      <p>
        We use your information to operate and improve our Platform, publish submitted content, respond to inquiries, process subscriptions or purchases, send newsletters, personalize your experience, detect fraud/security threats, comply with legal obligations, and analyze user engagement.
      </p>
    )
  },
  {
    id: 'cookies-tracking',
    title: '3. Cookies and Tracking Technologies',
    content: (
      <p>
        Newyork Capital uses cookies to remember your preferences, improve website functionality, measure traffic, analyze visitor behavior, and deliver relevant advertising. You may disable cookies through your browser settings; however, some features of the Platform may not function properly.
      </p>
    )
  },
  {
    id: 'newsletter-communications',
    title: '4. Newsletter Communications',
    content: (
      <p>
        If you subscribe to our newsletter, we may send you news updates, editorial highlights, press releases, and promotional announcements. You may unsubscribe at any time using the "Unsubscribe" link included in our emails.
      </p>
    )
  },
  {
    id: 'sharing-information',
    title: '5. Sharing of Information',
    content: (
      <p>
        We do not sell your personal information. We may share information with trusted service providers, payment processors, website hosting services, analytics providers, email delivery platforms, and government authorities when required by law.
      </p>
    )
  },
  {
    id: 'data-security',
    title: '6. Data Security',
    content: (
      <p>
        We implement reasonable administrative, technical, and organizational safeguards designed to protect your personal information from unauthorized access, alteration, disclosure, or destruction. No method of internet transmission can be guaranteed to be completely secure.
      </p>
    )
  },
  {
    id: 'data-retention',
    title: '7. Data Retention',
    content: (
      <p>
        We retain personal information only for as long as necessary to provide our services, meet legal obligations, resolve disputes, and maintain business records. When no longer required, data is securely deleted or anonymized.
      </p>
    )
  },
  {
    id: 'your-privacy-rights',
    title: '8. Your Privacy Rights',
    content: (
      <p>
        Depending on applicable law, you may have the right to access your personal information, correct inaccurate information, request deletion of your data, restrict certain processing activities, withdraw consent, or request a copy of your data. Please contact us to exercise these rights.
      </p>
    )
  },
  {
    id: 'childrens-privacy',
    title: '9. Children\'s Privacy',
    content: (
      <p>
        Newyork Capital is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will take reasonable steps to delete it promptly.
      </p>
    )
  },
  {
    id: 'third-party-websites',
    title: '10. Third-Party Websites',
    content: (
      <p>
        Our Platform may contain links to third-party websites. We are not responsible for the privacy practices, content, or security of external websites. We encourage users to review the privacy policies of those websites before providing personal information.
      </p>
    )
  },
  {
    id: 'international-data',
    title: '11. International Data Transfers',
    content: (
      <p>
        If you access Newyork Capital from outside the United States, your information may be transferred to and processed in the United States or other countries. By using our Platform, you consent to such transfers in accordance with applicable law.
      </p>
    )
  },
  {
    id: 'changes-to-policy',
    title: '12. Changes to This Privacy Policy',
    content: (
      <p>
        We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised "Last Updated" date. Continued use of the Platform after changes constitute acceptance of the revised policy.
      </p>
    )
  },
  {
    id: 'contact-us',
    title: '13. Contact Us',
    content: (
      <>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', ...privacyData.map(t => t.id)];
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
            LEGAL DOCUMENT • DATA PROTECTION
          </span>
          <h1 className="text-4xl md:text-[44px] font-serif font-bold text-[#0f0f0f] mb-4">
            Privacy Policy
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
                  <strong>Newyork Capital</strong> ("Newyork Capital," "we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, subscribe to our newsletters, submit content, or otherwise interact with our Platform.
                </p>
                <p>
                  By using the Newyork Capital Platform, you agree to the practices described in this Privacy Policy.
                </p>
              </div>
            </section>

            {privacyData.map((section) => (
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

          {/* Privacy Policy Sections (Right Side) */}
          <div className="lg:w-1/4 relative">
            <div className="sticky top-32 bg-[#f9fbfd] border border-[#e8eff5] p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#e8eff5]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#2962ff]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider">
                  Privacy Policy Sections
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
                {privacyData.map((section) => (
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
