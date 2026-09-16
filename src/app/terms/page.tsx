'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const termsData = [
  {
    id: 'eligibility',
    title: '1. Eligibility',
    content: (
      <p>
        You must be at least 18 years old, or have permission from a parent or legal guardian, to use our Platform. By using our services, you represent that you have the legal authority to accept these Terms.
      </p>
    )
  },
  {
    id: 'our-services',
    title: '2. Our Services',
    content: (
      <>
        <p className="mb-4">
          Newyork Capital is an independent digital news and media platform providing breaking news, politics, business, technology, science, world news, health, opinion/editorials, articles, press releases, sponsored content, and multimedia publications.
        </p>
        <p>
          Our editorial team reserves the right to determine which content is published on the Platform.
        </p>
      </>
    )
  },
  {
    id: 'user-accounts',
    title: '3. User Accounts',
    content: (
      <p>
        Certain services may require registration. You agree to provide accurate information, maintain the confidentiality of your account, notify us immediately of unauthorized access, and accept responsibility for all activity occurring under your account. We reserve the right to suspend or terminate accounts that violate these Terms.
      </p>
    )
  },
  {
    id: 'user-content',
    title: '4. User Content',
    content: (
      <>
        <p className="mb-4">
          Users may submit articles, press releases, images, videos, comments, or other content. By submitting content, you represent that you own the content, it does not violate intellectual property rights, it is truthful, and it does not contain defamatory or illegal material.
        </p>
        <p>
          By submitting content, you grant Newyork Capital a worldwide, non-exclusive, royalty-free license to publish, distribute, edit, archive, translate, reproduce, and promote your content across our platforms. We reserve the right to remove submitted content without notice.
        </p>
      </>
    )
  },
  {
    id: 'editorial-independence',
    title: '5. Editorial Independence',
    content: (
      <p>
        Submission of content does not guarantee publication. Our editorial team may edit articles for clarity, formatting, SEO, and guidelines. Newyork Capital declines publication of non-recommended content. All editorial decisions are final.
      </p>
    )
  },
  {
    id: 'intellectual-property',
    title: '6. Intellectual Property',
    content: (
      <p>
        Unless otherwise stated, all content on Newyork Capital (including articles, logos, graphics, videos, photographs, website design, branding, and software) is the exclusive property of Newyork Capital or its licensors. You may not reproduce, copy, distribute, or commercially exploit any material without prior written permission.
      </p>
    )
  },
  {
    id: 'sponsored-content',
    title: '7. Sponsored Content and Advertising',
    content: (
      <p>
        Newyork Capital may publish sponsored articles, advertisements, affiliate links, and promotional campaigns. Sponsored material will be clearly identified. Publication of sponsored content does not imply endorsement by Newyork Capital.
      </p>
    )
  },
  {
    id: 'third-party-links',
    title: '8. Third-Party Links',
    content: (
      <p>
        Our Platform may contain links to third-party websites. We do not control or endorse these websites and are not responsible for their accuracy, security, privacy practices, or services. Users access third-party websites at their own risk.
      </p>
    )
  },
  {
    id: 'copyright-policy',
    title: '9. Copyright Policy',
    content: (
      <p>
        Newyork Capital respects intellectual property rights. If you believe content published on our Platform infringes your copyright, please contact us with details including your name, copyrighted work description, and URL of the material.
      </p>
    )
  },
  {
    id: 'acceptable-use',
    title: '10. Acceptable Use',
    content: (
      <p>
        Users may not upload malicious software, attempt unauthorized access, spam or distribute promotions, impersonate others, or publish misleading information. Violation of this policy may result in immediate termination of access.
      </p>
    )
  },
  {
    id: 'disclaimer',
    title: '11. Disclaimer',
    content: (
      <>
        <p className="mb-4">
          All information is provided on an "AS IS" and "AS AVAILABLE" basis. Although Newyork Capital strives for accuracy, we make no warranties regarding completeness, timeliness, availability, or reliability. News coverage, rapidly, and published information may change over time.
        </p>
        <p className="font-bold">
          Nothing published on this Platform constitutes legal, financial, investment, medical, or professional advice. Users should seek independent professional advice before relying on published information.
        </p>
      </>
    )
  },
  {
    id: 'limitation-of-liability',
    title: '12. Limitation of Liability',
    content: (
      <p className="font-bold">
        To the fullest extent permitted by law, Newyork Capital shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from the use of or inability to access the Platform, unverified information, published content, or website interruptions.
      </p>
    )
  },
  {
    id: 'indemnification',
    title: '13. Indemnification',
    content: (
      <p className="font-bold">
        You agree to indemnify and hold harmless Newyork Capital, its directors, officers, editors, and affiliates from any claims, damages, liabilities, or expenses arising from your use of the Platform or violation of these Terms.
      </p>
    )
  },
  {
    id: 'privacy',
    title: '14. Privacy',
    content: (
      <p>
        Your use of the Platform is also governed by our Privacy Policy, which explains how we collect, use, store, and protect personal information.
      </p>
    )
  },
  {
    id: 'changes-to-services',
    title: '15. Changes to Services',
    content: (
      <p>
        Newyork Capital may modify, suspend, discontinue, or update any part of the Platform without prior notice. We shall not be liable for any resulting loss or inconvenience.
      </p>
    )
  },
  {
    id: 'governing-law',
    title: '16. Governing Law',
    content: (
      <p>
        These Terms shall be governed by and interpreted under the laws of the State of Washington, United States, without regard to conflict of law principles. Any legal disputes arising from these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Washington.
      </p>
    )
  },
  {
    id: 'contact-information',
    title: '17. Contact Information',
    content: (
      <>
        <p className="mb-4">
          For legal inquiries, copyright notices, or questions regarding these Terms, please contact:
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

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', ...termsData.map(t => t.id)];
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
            LEGAL DOCUMENT • TERMS OF USE
          </span>
          <h1 className="text-4xl md:text-[44px] font-serif font-bold text-[#0f0f0f] mb-4">
            Terms and Conditions
          </h1>
          <p className="text-[13px] font-sans text-gray-500 uppercase tracking-widest">
            Last Updated: September 13, 2026
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto w-[92%] py-12 md:py-16">
        {/* REVERSED LAYOUT: Table of Contents is on the right, content on the left */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          
          {/* Main Content (Left Side) */}
          <div className="lg:w-3/4 flex flex-col gap-10">
            
            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-6">
                Introduction
              </h2>
              <div className="text-[15.5px] font-sans text-gray-800 leading-relaxed space-y-5">
                <p>
                  Welcome to <strong>Newyork Capital</strong>. These Terms and Conditions ("Terms") govern your access to and use of the Newyork Capital website, mobile services, digital publishing, and all related platforms (collectively, the "Platform").
                </p>
                <p>
                  By accessing, browsing, submitting content, or using any part of our Platform, you agree to comply with these Terms. If you do not agree with these Terms, please discontinue use of the Platform immediately.
                </p>
                <p>
                  Newyork Capital reserves the right to update or modify these Terms at any time. Continued use of the Platform following any updates constitutes acceptance of the revised Terms.
                </p>
              </div>
            </section>

            {termsData.map((section) => (
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

          {/* Table of Contents (Right Side) */}
          <div className="lg:w-1/4 relative">
            <div className="sticky top-32 bg-[#f9fbfd] border border-[#e8eff5] p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#e8eff5]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#2962ff]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <h3 className="text-[14px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider">
                  Table of Contents
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
                {termsData.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`} 
                      onClick={(e) => scrollToSection(e, section.id)}
                      className={`block hover:text-[#E3120B] transition-colors ${activeSection === section.id ? 'text-[#E3120B] font-bold bg-white -mx-6 px-6 py-1 border-l-2 border-[#E3120B]' : ''}`}
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
