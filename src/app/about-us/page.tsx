import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Newyork Capital',
  description: 'Delivering Trusted News, Empowering Informed Communities.'
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-[1200px] mx-auto w-[92%] py-12 md:py-20">
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#E3120B] text-[11px] md:text-[13px] font-sans font-bold tracking-[0.15em] uppercase mb-4">
            Established 2026 • Editorial Profile
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0f0f0f] mb-6">
            About Newyork Capital
          </h1>
          <p className="text-[18px] md:text-[22px] font-serif italic text-gray-600">
            "Delivering Trusted News, Empowering Informed Communities."
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Who We Are */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-6 border-b border-gray-200 pb-3">
                Who We Are
              </h2>
              <div className="text-[16px] font-sans text-gray-800 leading-relaxed flex flex-col gap-4">
                <p>
                  Welcome to <strong>Newyork Capital</strong>, an independent digital news platform dedicated to delivering
                  accurate, timely, and impactful journalism. Our mission is to provide readers with reliable news coverage,
                  insightful analysis, and balanced reporting on the stories that matter most locally, nationally, and around the world.
                </p>
                <p>
                  We strive to uphold the highest standards of journalistic integrity while embracing innovation in digital
                  media. Our newsroom is committed to factual reporting, editorial independence, and responsible storytelling
                  that informs, educates, and inspires.
                </p>
              </div>
            </section>

            {/* What We Cover */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-6 border-b border-gray-200 pb-3">
                What We Cover
              </h2>
              <p className="text-[16px] font-sans text-gray-800 leading-relaxed mb-6">
                Newyork Capital publishes dynamic, professional content across a comprehensive range of critical topics:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'U.S. News', 'World News', 'Politics', 
                  'Business & Economy', 'Technology', 'Science', 
                  'Health', 'Education', 'Environment', 
                  'Sports', 'Entertainment', 'Lifestyle', 
                  'Opinion & Editorials', 'Press Releases', 'Sponsored Content'
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 text-[15px] font-sans text-[#0f0f0f] font-medium p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3120B]"></span>
                    {topic}
                  </div>
                ))}
              </div>
            </section>

            {/* Our Editorial Values */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#0f0f0f] mb-6 border-b border-gray-200 pb-3">
                Our Editorial Values
              </h2>
              <p className="text-[16px] font-sans text-gray-800 leading-relaxed mb-8">
                Every story published by Newyork Capital is guided by our core journalistic values:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { title: 'Accuracy & Fact-Checking', desc: 'Rigorous fact-checking and verify-first reporting on all articles.' },
                  { title: 'Editorial Independence', desc: 'Free from corporate bias, external influence, or political agendas.' },
                  { title: 'Transparency & Accountability', desc: 'Openly correcting mistakes and revealing information sources.' },
                  { title: 'Fairness & Balance', desc: 'Presenting multi-dimensional viewpoints and stories without prejudice.' },
                  { title: 'Respect for Diversity', desc: 'Representing varied perspectives and amplifying underrepresented voices.' },
                  { title: 'Ethical Journalism', desc: 'Following professional standard ethics and respect for privacy.' },
                ].map((value, i) => (
                  <div key={i} className="flex flex-col gap-2 p-5 border border-gray-200 bg-white">
                    <h3 className="text-[15px] font-bold font-serif text-[#0f0f0f]">{value.title}</h3>
                    <p className="text-[13.5px] font-sans text-gray-600 leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-[14px] font-sans text-gray-500 italic p-4 bg-gray-50 border-l-4 border-gray-300">
                Our editorial team follows strict review processes to ensure our reporting meets professional standards and serves the public interest.
              </p>
            </section>
            
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Our Mission */}
            <div className="bg-[#f4f7f9] p-8 border-t-[3px] border-[#2962ff]">
              <h3 className="text-xl font-serif font-bold text-[#0f0f0f] mb-4">Our Mission</h3>
              <p className="text-[14.5px] font-sans text-gray-700 leading-relaxed">
                Our mission is to empower individuals through credible journalism by providing fair, accurate, and accessible news. 
                We believe that informed citizens build stronger communities, and we are dedicated to making trustworthy information available to everyone.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-[#fff4f4] p-8 border-t-[3px] border-[#E3120B]">
              <h3 className="text-xl font-serif font-bold text-[#0f0f0f] mb-4">Our Vision</h3>
              <p className="text-[14.5px] font-sans text-gray-700 leading-relaxed">
                We aim to become one of the most trusted digital news platforms in the United States by delivering high-quality journalism, 
                embracing technological innovation, and fostering meaningful public dialogue.
              </p>
            </div>

            {/* Contact Us */}
            <div className="border border-gray-200 p-8 bg-white">
              <h3 className="text-xl font-serif font-bold text-[#0f0f0f] mb-6">Contact Us</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[#E3120B] mt-1 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-[14px] font-sans text-gray-600 leading-relaxed">
                    <p className="font-bold text-[#0f0f0f] mb-1">Newyork Capital Headquarters</p>
                    <p>2316 Eastgate St #180</p>
                    <p>Walla Walla, Washington (WA) 99362</p>
                    <p>United States</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[#E3120B] mt-1 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-[14px] font-sans text-gray-600">
                    <p className="font-bold text-gray-400 text-[11px] uppercase tracking-wider mb-1">Email Inquiry</p>
                    <a href="mailto:newyorkcapital4@gmail.com" className="font-bold text-[#0f0f0f] hover:text-[#E3120B] transition-colors">
                      newyorkcapital4@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-[12.5px] font-sans text-gray-500 italic">
                  We will make reasonable efforts to respond to inquiries in a timely manner.
                </p>
              </div>
            </div>

            {/* Stay Connected */}
            <div className="bg-[#1c1c1c] text-white p-8 text-center flex flex-col items-center">
              <h3 className="text-[20px] font-serif font-bold mb-3">Stay Connected</h3>
              <p className="text-[13.5px] font-sans text-gray-300 mb-8 leading-relaxed">
                Join our Newyork Capital community to receive weekly summaries, breaking alerts, and premium content editor highlights.
              </p>
              <Link href="/subscribe" className="bg-[#E3120B] hover:bg-[#c40f09] text-white font-bold font-sans text-[13px] py-3.5 px-8 tracking-wider transition-colors uppercase w-full">
                Subscribe Now
              </Link>
            </div>

          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
