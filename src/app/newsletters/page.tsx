import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const newsletters = [
  {
    title: "World",
    frequency: "",
    description: "United States, China, Europe, Britain, Middle East, Africa, Asia"
  },
  {
    title: "Finance & Economics",
    frequency: "",
    description: "Business, Opinions, Cost of Living, Stock Markets, Cryptocurrency, Leadership"
  },
  {
    title: "Politics",
    frequency: "",
    description: "Elections, The White House, Congress, International Relations, Human Rights, Law & Justice"
  },
  {
    title: "Technology",
    frequency: "",
    description: "Artificial intelligence, Innovations, Banking, Investment"
  },
  {
    title: "Industries",
    frequency: "",
    description: "Energy, Real Estate, Agriculture, Healthcare, Entertainment, Tourism & Hospitality, Culture, Sports"
  }
];

export default function NewslettersPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif flex flex-col">
      <Header />
      
      {/* Top Banner */}
      <section className="w-full bg-[#fcfcfc] py-16 border-b border-[#e6e6e6]">
        <div className="max-w-[800px] mx-auto text-center px-4">
          <h1 className="text-[40px] md:text-[54px] font-serif text-[#E3120B] tracking-[0.25em] mb-4 uppercase">
            Newsletters
          </h1>
          <div className="w-[120px] h-[2px] bg-[#E3120B] mx-auto mb-6"></div>
          <p className="text-[14px] md:text-[15px] font-sans text-gray-500">
            Stay up to date with our daily newsletter
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="w-full max-w-[1000px] mx-auto px-4 py-16">
        
        {/* Intro Text */}
        <div className="text-center mb-16 max-w-[800px] mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-serif mb-8 leading-tight">
            Let the best of Washington Global Times news come to you.
          </h2>
          <p className="text-[14px] md:text-[15px] font-sans text-gray-600 leading-relaxed mb-10 max-w-[600px] mx-auto">
            Select any of the free newsletters below. Then, enter your email address and click "Sign Up." 
            Your newsletter subscriptions with us are subject to Washington Global Times's{' '}
            <a href="#" className="text-[#E3120B] underline hover:no-underline">Terms and Conditions</a> and{' '}
            <a href="#" className="text-[#E3120B] underline hover:no-underline">Privacy Policy</a>.
          </p>
          
          <button className="bg-[#E3120B] hover:bg-[#B30E08] transition-colors text-white font-sans font-bold text-[13px] tracking-widest uppercase py-4 px-8 rounded-sm">
            Select All Newsletters
          </button>
        </div>

        {/* Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-b border-[#e6e6e6] py-12">
          {newsletters.map((newsletter, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="mt-1">
                <input 
                  type="checkbox" 
                  className="w-[18px] h-[18px] border-2 border-gray-300 rounded-sm cursor-pointer accent-[#E3120B]"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-serif font-bold text-black mb-1 leading-snug">
                  {newsletter.title.includes('&') ? (
                    <>
                      {newsletter.title.split('&')[0]}
                      <span className="font-sans">&</span>
                      {newsletter.title.split('&')[1]}
                    </>
                  ) : (
                    newsletter.title
                  )}
                </h3>
                <span className="text-[13px] font-serif italic text-gray-500 mb-3">
                  {newsletter.frequency}
                </span>
                <p className="text-[14px] font-sans text-gray-700 leading-relaxed">
                  {newsletter.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Signup Bar */}
        <div className="mt-16 max-w-[600px] mx-auto text-center flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-sm font-sans text-[15px] focus:outline-none focus:border-[#E3120B] transition-colors"
              />
            </div>
            <button className="bg-[#E3120B] hover:bg-[#B30E08] transition-colors text-white font-sans font-bold text-[14px] tracking-wide uppercase py-3.5 px-8 rounded-sm whitespace-nowrap">
              Sign Up Now
            </button>
          </div>
          
          <p className="text-[12px] font-sans text-gray-500">
            You can unsubscribe at any time. By signing up you are agreeing to our{' '}
            <a href="#" className="text-[#E3120B] underline hover:no-underline">Terms of Service</a> and{' '}
            <a href="#" className="text-[#E3120B] underline hover:no-underline">Privacy Policy</a>.
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
