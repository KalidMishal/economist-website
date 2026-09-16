'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const policyData = [
  {
    id: 'accuracy',
    title: '1. Accuracy and Verification',
    content: (
      <>
        <p className="mb-4">
          Accuracy is the cornerstone of our journalism. Before publishing any news stories or reports, we:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Verify information through official and credible sources.</li>
          <li>Cross-reference data and statements whenever possible.</li>
          <li>Provide context to ensure facts are presented fairly and without distortion.</li>
          <li>Clearly distinguish between factual reporting, opinion, and analysis pieces.</li>
          <li>Check quotes and statistics for their accuracy and context.</li>
        </ul>
        <p>If an error is published, we correct it promptly and transparently (see Corrections and Updates).</p>
      </>
    )
  },
  {
    id: 'independence',
    title: '2. Editorial Independence',
    content: (
      <p>
        Our newsroom operates entirely independent of corporate, political, or external influences. Advertisers, sponsors, and shareholders have no involvement in our editorial decisions. We do not allow any individual, organization, or political party to dictate our coverage, manipulate our reporting, or preview articles before publication.
      </p>
    )
  },
  {
    id: 'fairness',
    title: '3. Fairness and Balance',
    content: (
      <p>
        We represent diverse viewpoints and seek out responses from individuals or organizations facing criticism in our reporting. We strive to provide a well-rounded perspective on complex issues and ensure that multiple viewpoints are represented fairly without prejudice, sensationalism, or bias.
      </p>
    )
  },
  {
    id: 'sources',
    title: '4. Source Standards',
    content: (
      <p>
        We rely on official documents, public records, and verifiable sources. Preferred sources include government officials, experts, academic institutions, and direct witnesses to events. We do not pay for interviews or information. Whenever possible, we identify our sources to our readers to establish trust. Anonymous sources are used sparingly and only when the information is essential and cannot be obtained otherwise.
      </p>
    )
  },
  {
    id: 'original-journalism',
    title: '5. Original Journalism',
    content: (
      <p>
        We produce original reporting, analysis, and research. Our journalists are expected to conduct their own interviews, gather data, and create unique content. We do not tolerate plagiarism in any form and follow strict attribution guidelines when referencing external material.
      </p>
    )
  },
  {
    id: 'attribution',
    title: '6. Attribution and Copyright',
    content: (
      <p>
        We respect intellectual property and strictly adhere to copyright laws. Any material gathered from external publications, press releases, or agencies is properly cited and attributed. We do not republish content without permission, and we do not plagiarize.
      </p>
    )
  },
  {
    id: 'opinion',
    title: '7. Opinion and Editorial Content',
    content: (
      <p>
        Opinion pieces, editorials, and columns reflect the views of the individual authors and do not represent the official stance of Newyork Capital. These pieces are clearly labeled as "Opinion" or "Editorial" to distinguish them from objective news reporting.
      </p>
    )
  },
  {
    id: 'corrections',
    title: '8. Corrections and Updates',
    content: (
      <p>
        We take responsibility for our errors. When a mistake is identified, we act swiftly to correct it. All corrected articles include a clear editor's note explaining the correction and the date it was made.
      </p>
    )
  },
  {
    id: 'ai',
    title: '9. Artificial Intelligence (AI)',
    content: (
      <p>
        We may use AI tools to assist in data gathering, translation, or research, but we do not publish AI-generated content without human oversight. All material is reviewed, verified, and edited by our editorial staff before publication.
      </p>
    )
  },
  {
    id: 'multimedia',
    title: '10. Images, Video, and Multimedia',
    content: (
      <p>
        Visual journalism must be accurate and authentic. Photographs and videos are not altered in any way that misrepresents the truth or misleads the audience. We use standard editing techniques (such as cropping or color correction) but strictly prohibit the manipulation of visual content.
      </p>
    )
  },
  {
    id: 'ugc',
    title: '11. User-Generated Content',
    content: (
      <p>
        We encourage civic engagement and welcome comments, letters to the editor, and community submissions. However, Newyork Capital reserves the right to moderate, edit, or remove user-submitted content that violates our community standards, contains hate speech, or promotes illegal activities.
      </p>
    )
  },
  {
    id: 'sponsored',
    title: '12. Sponsored Content and Advertising',
    content: (
      <p>
        We maintain a strict separation between our newsroom and our advertising department. All sponsored content, advertorials, and partner messages are clearly labeled as "Sponsored" or "Advertisement."
      </p>
    )
  },
  {
    id: 'conflicts',
    title: '13. Conflicts of Interest',
    content: (
      <p>
        Our journalists and editorial staff are required to disclose any potential conflicts of interest. We do not accept gifts, favors, or special treatment from sources or organizations we cover.
      </p>
    )
  },
  {
    id: 'diversity',
    title: '14. Diversity and Inclusion',
    content: (
      <p>
        Newyork Capital is committed to fostering a diverse and inclusive newsroom. We seek out diverse perspectives in our reporting and provide equal opportunities for our staff, regardless of race, gender, religion, or background.
      </p>
    )
  },
  {
    id: 'anonymity',
    title: '15. Anonymity and Confidential Sources',
    content: (
      <p>
        We protect the identities of our confidential sources when they face risks of retaliation or harm. We only grant anonymity when the information is crucial to the public interest and unavailable through other means.
      </p>
    )
  },
  {
    id: 'community',
    title: '16. Community Standards',
    content: (
      <p>
        We aim to foster respectful dialogue. We do not tolerate hate speech, harassment, threats, or discrimination on our platform. We reserve the right to ban users who violate these standards.
      </p>
    )
  },
  {
    id: 'transparency',
    title: '17. Transparency',
    content: (
      <p>
        We believe in being transparent with our audience about our editorial practices. If you have questions about our reporting, corrections, or policies, we encourage you to contact us.
      </p>
    )
  },
  {
    id: 'continuous-improvement',
    title: '18. Continuous Improvement',
    content: (
      <>
        <p className="mb-4">
          Editorial standards evolve, and we are committed to ongoing training and improvement. We regularly review and update our guidelines to reflect the highest standards of modern journalism.
        </p>
        <div className="bg-gray-50 p-6 border border-gray-200 mt-6">
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

export default function EditorialPolicyPage() {
  const [activeSection, setActiveSection] = useState('commitment');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['commitment', ...policyData.map(t => t.id), 'promise'];
      let currentActive = 'commitment';
      
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
            ETHICS AND STANDARDS
          </span>
          <h1 className="text-4xl md:text-[44px] font-serif font-bold text-[#0f0f0f] mb-4">
            Editorial Guidelines and Ethics Policy
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
            
            <section id="commitment" className="scroll-mt-32">
              <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-6">
                Our Commitment to Journalism
              </h2>
              <div className="text-[15.5px] font-sans text-gray-800 leading-relaxed space-y-5">
                <p>
                  At <strong>Newyork Capital</strong>, our primary responsibility is to our readers. We are dedicated to providing fair, accurate, and comprehensive reporting that empowers individuals and strengthens our communities. By adhering to strict journalistic standards, we ensure that our content remains trustworthy, objective, and unbiased. 
                </p>
                <p>
                  The policies below serve as the foundation of our editorial decisions and the compass that guides our journalists in their daily work.
                </p>
              </div>
            </section>

            {policyData.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 pt-6 border-t border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-5">
                  {section.title}
                </h2>
                <div className="text-[15.5px] font-sans text-gray-800 leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}

            <section id="promise" className="scroll-mt-32 pt-10">
              <div className="bg-[#f4f7f9] p-8 md:p-10 border-t-[3px] border-[#2962ff]">
                <h3 className="text-[22px] font-serif font-bold text-[#0f0f0f] mb-4">Our Editorial Promise</h3>
                <p className="text-[15.5px] font-sans text-gray-800 leading-relaxed mb-4">
                  <strong>Newyork Capital</strong> was founded on the principle that journalism serves the public. We are unapologetically dedicated to uncovering the truth, holding those in power accountable, and delivering the news without fear or favor.
                </p>
                <p className="text-[15.5px] font-sans text-gray-800 leading-relaxed italic">
                  Every decision we make is guided by this promise to you, our readers. We appreciate your trust and will continuously work to earn it every single day.
                </p>
              </div>
            </section>

          </div>

          {/* Policy Sections (Right Side) */}
          <div className="lg:w-1/4 relative">
            <div className="sticky top-32 bg-[#f9fbfd] border border-[#e8eff5] p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#e8eff5]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#2962ff]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-[13px] font-sans font-bold text-[#0f0f0f] uppercase tracking-wider">
                  Policy Sections
                </h3>
              </div>
              
              <ul className="flex flex-col gap-3 text-[13.5px] font-sans text-gray-600">
                <li>
                  <a 
                    href="#commitment" 
                    onClick={(e) => scrollToSection(e, 'commitment')}
                    className={`block hover:text-[#E3120B] transition-colors leading-snug ${activeSection === 'commitment' ? 'text-[#E3120B] font-bold' : ''}`}
                  >
                    Our Commitment
                  </a>
                </li>
                {policyData.map((section) => (
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
                <li>
                  <a 
                    href="#promise" 
                    onClick={(e) => scrollToSection(e, 'promise')}
                    className={`block hover:text-[#E3120B] transition-colors leading-snug ${activeSection === 'promise' ? 'text-[#E3120B] font-bold bg-white -mx-6 px-6 py-1 border-l-2 border-[#E3120B]' : ''}`}
                  >
                    Our Editorial Promise
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
