"use client";

import React, { useState, useRef, useEffect } from 'react';
import SubscribeHeader from '@/components/SubscribeHeader';
import Footer from '@/components/Footer';

const exploreTabsData = [
  {
    buttonText: "Special group discounts",
    title: "Special group discounts",
    description: <>Explore our special subscription offers for students, educators and more</>,
    image: "/imgi_28_special-group-discounts.webp",
    links: ["Student discounts", "Teachers & Faculty"]
  },
  {
    buttonText: "Group and corporate",
    title: "Group and corporate",
    description: <>Unlock a world of analysis across your organisation <br /> with a group subscription</>,
    image: "/imgi_28_group-corporate.webp",
    links: ["Learn more"]
  },
  {
    buttonText: "Podcasts+",
    title: "Podcasts+",
    description: <>Get unlimited access to all our podcasts, including special series, daily and weekly shows</>,
    image: "/imgi_28_podcasts.webp",
    isPricing: true,
    disclaimer: "*Savings based on renewal price. Cancel auto-renewal at any time",
    pricingOptions: [
      {
        id: "2-year",
        bestValue: true,
        title: "2 year",
        savings: "Save $31.80*",
        price: "$3.10/month",
        billing: <>Billed as <s className="text-gray-500">$106</s> $74.20 for first 2 years, then auto-renews at $106 every 2 years</>
      },
      {
        id: "annual",
        bestValue: false,
        title: "Annual",
        savings: "Save $17.70*",
        price: "$3.45/month",
        billing: <>Billed as <s className="text-gray-500">$59</s> $41.30 for first year, then auto-renews at $59 annually</>
      },
      {
        id: "monthly",
        bestValue: false,
        title: "Monthly",
        savings: null,
        price: "$5.90/month",
        billing: <>Auto-renews monthly</>
      }
    ]
  },
  {
    buttonText: "Espresso",
    title: "Espresso",
    description: <>Stay ahead with quick daily updates on global issues, with the Espresso app</>,
    image: "/imgi_28_espresso.webp",
    isPricing: true,
    disclaimer: "Cancel auto-renewal at any time",
    pricingOptions: [
      {
        id: "annual",
        bestValue: true,
        title: "Annual",
        savings: "Save 16% vs Monthly",
        price: "$16.59/month",
        billing: <>Billed as $199 for first year, then auto-renews at $199 annually</>
      },
      {
        id: "monthly",
        bestValue: false,
        title: "Monthly",
        savings: "Includes 1-month free trial",
        price: "$19.90/month",
        billing: <>Auto-renews at $19.90 monthly when free trial ends</>
      }
    ]
  },
  {
    buttonText: "Gift subscriptions",
    title: "Gift subscriptions",
    description: <>Unwrap the world with a gift for family and friends</>,
    image: "/imgi_28_gift-subscriptions.webp",
    links: ["Learn more"]
  },
  {
    buttonText: "Multi-year plans",
    title: "Multi-year plans",
    description: <>Lock in your savings for longer</>,
    image: "/imgi_28_multi-year-plans.webp",
    links: ["Learn more"]
  }
];

export default function SubscribePage() {
  const [activeExploreTab, setActiveExploreTab] = useState(0);
  const [selectedPricingOption, setSelectedPricingOption] = useState("2-year");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRefClarity = useRef<HTMLDivElement>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const [canScrollLeftClarity, setCanScrollLeftClarity] = useState(false);
  const [canScrollRightClarity, setCanScrollRightClarity] = useState(true);

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScrollEventClarity = () => {
    if (scrollRefClarity.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRefClarity.current;
      setCanScrollLeftClarity(scrollLeft > 0);
      setCanScrollRightClarity(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollClarityByAmount = (amount: number) => {
    if (scrollRefClarity.current) {
      scrollRefClarity.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqs = [
    {
      question: "What is The Economist?",
      answer: "The Economist is a global weekly magazine written for those who share an uncommon interest in being well and broadly informed. Each issue explores domestic and international issues, business, finance, current affairs, science, technology and the arts."
    },
    {
      question: "How much does a digital subscription cost?",
      answer: "Pricing varies by region. Our standard introductory offer provides significant savings. After the introductory period, standard rates apply. Check the pricing cards above for current offers."
    },
    {
      question: "What is The Economist Pro?",
      answer: "The Economist Pro is our premium intelligence service designed for professionals, offering exclusive briefings, data, and analysis on global trends."
    },
    {
      question: "How can I cancel my subscription?",
      answer: "You can easily cancel your auto-renewal at any time through your online account settings, or by contacting our customer service team."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f0f0f] font-sans">
      <SubscribeHeader />
      
      <main className="w-full flex-grow">
        
        {/* HERO SECTION */}
        <section className="w-full max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Pricing */}
          <div className="w-full lg:w-[45%] flex flex-col">
            <h1 className="text-[38px] md:text-[46px] font-serif font-normal leading-tight mb-4 text-[#0f0f0f]">
              Save 30% today.
            </h1>
            <p className="text-[16px] text-[#0f0f0f] mb-8">
              Get unlimited access to <span className="italic">The Economist</span> - lock in your savings on an annual subscription with our introductory offer.
            </p>

            {/* Toggles */}
            <div className="flex border border-gray-300 rounded-full p-1 mb-8 w-fit bg-white">
              <button className="bg-[#242b6a] text-white px-6 py-1.5 rounded-full font-bold text-[13px]">
                Premium
              </button>
              <button className="text-[#0f0f0f] px-6 py-1.5 rounded-full font-bold text-[13px] hover:text-[#242b6a]">
                Premium + Print
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Annual Box */}
              <div className="border border-[#242b6a] bg-[#f4f6fa] rounded-sm p-4 relative cursor-pointer group">
                <div className="absolute top-[-10px] left-4 bg-[#242b6a] text-white text-[9px] font-bold uppercase px-2 py-0.5 tracking-widest rounded-sm">
                  Introductory Offer
                </div>
                <div className="flex items-start">
                  <input type="radio" checked readOnly className="mt-1 mr-3 w-4 h-4 accent-[#242b6a] flex-shrink-0 cursor-pointer" />
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[16px] text-[#0f0f0f]">Annual</span>
                      <span className="font-bold text-[16px] text-[#0f0f0f]">$27.36/month</span>
                    </div>
                    <span className="text-[#242b6a] text-[11px] mb-2 opacity-80">Save $140.70*</span>
                    <span className="text-gray-600 text-[12px] leading-snug">
                      Billed as <span className="line-through">$469</span> $328.30 for first year, then auto-renews at $469 annually
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Box */}
              <div className="border border-gray-300 bg-white rounded-sm p-4 cursor-pointer hover:border-gray-500 transition-colors group">
                <div className="flex items-start">
                  <input type="radio" readOnly className="mt-1 mr-3 w-4 h-4 accent-[#242b6a] flex-shrink-0 cursor-pointer" />
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[16px] text-[#0f0f0f]">Monthly</span>
                      <span className="font-bold text-[16px] text-[#0f0f0f]">$46.90/month</span>
                    </div>
                    <span className="text-[#00508f] text-[11px] mb-2">Includes 1-month free trial</span>
                    <span className="text-gray-600 text-[12px] leading-snug">
                      Auto-renews at $46.90 monthly when free trial ends
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 mt-3 text-center">
              *Savings based on renewal price. Cancel auto-renewal at any time
            </p>

            <button className="w-full bg-[#2a3084] text-white font-bold text-[15px] py-2.5 mt-5 hover:bg-[#1f2468] transition-colors rounded-sm">
              Continue to checkout
            </button>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-[50%] flex justify-end">
            <img 
              src="/imgi_2_digital-header-image-variant-b-light.webp" 
              alt="Capitol building" 
              className="w-full max-w-[550px] h-auto object-contain"
            />
          </div>
        </section>

        {/* INFO BAR */}
        <div className="w-full max-w-[1600px] mx-auto border-t border-b border-[#0f0f0f] py-8 mb-16 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
            <div className="flex items-center gap-5 px-2 md:px-6 py-2">
              <div className="flex-shrink-0">
                <img src="/imgi_3_read.svg" alt="Read" className="w-12 h-12" />
              </div>
              <span className="font-serif text-[18px] md:text-[20px] leading-snug text-[#0f0f0f]">Award-winning journalism with informed analysis</span>
            </div>
            <div className="flex items-center gap-5 px-2 md:px-6 py-2">
              <div className="flex-shrink-0">
                <img src="/imgi_4_search.svg" alt="Search" className="w-12 h-12" />
              </div>
              <span className="font-serif text-[18px] md:text-[20px] leading-snug text-[#0f0f0f]">Fact checked, data driven, in-depth coverage</span>
            </div>
            <div className="flex items-center gap-5 px-2 md:px-6 py-2">
              <div className="flex-shrink-0">
                <img src="/imgi_5_insider.svg" alt="Insider" className="w-12 h-12" />
              </div>
              <span className="font-serif text-[18px] md:text-[20px] leading-snug text-[#0f0f0f]">Full access to Insider—video debates with our senior editors</span>
            </div>
          </div>
        </div>
        
        {/* GET A GLOBAL PERSPECTIVE */}
        <section className="w-full max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] mb-20 relative">
          <h2 className="text-[44px] md:text-[50px] font-serif font-normal mb-2 text-[#0f0f0f]">Get a global perspective</h2>
          <p className="text-[16px] font-bold text-gray-700 mb-8">Stay informed on the world's most important developments with our incisive coverage</p>
          
          <div className="relative group">
            {canScrollLeft && (
              <button 
                onClick={() => scrollByAmount(-604)}
                className="absolute left-[-15px] md:left-[-25px] top-1/2 -translate-y-1/2 z-[60] w-[50px] h-[50px] bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-gray-50 transition-colors"
                aria-label="Previous"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}

            <div 
              ref={scrollRef}
              onScroll={handleScrollEvent}
              className="flex overflow-x-auto gap-6 pb-4 snap-x relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              <div className="min-w-[340px] md:min-w-[580px] h-[380px] bg-[#f4f2ee] relative group cursor-pointer snap-start overflow-hidden">
                <img src="/imgi_37_geopolitics-desktop.webp" alt="Geopolitics" className="absolute right-0 bottom-0 h-[90%] w-auto object-contain object-right-bottom z-10" />
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-[60%] md:w-[50%] pr-2">
                  <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-[#0f0f0f] mb-3 leading-tight">Geopolitics</h3>
                  <p className="text-[15px] md:text-[17px] font-medium text-[#333] leading-snug">Unpack the world's power plays</p>
                </div>
              </div>

              <div className="min-w-[340px] md:min-w-[580px] h-[380px] bg-[#f4f2ee] relative group cursor-pointer snap-start overflow-hidden">
                <img src="/imgi_38_usa-desktop.webp" alt="United States" className="absolute right-0 bottom-0 h-[90%] w-auto object-contain object-right-bottom z-10" />
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-[60%] md:w-[50%] pr-2">
                  <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-[#0f0f0f] mb-3 leading-tight whitespace-nowrap">United States</h3>
                  <p className="text-[15px] md:text-[17px] font-medium text-[#333] leading-snug">A level-headed look at American politics and its global impact</p>
                </div>
              </div>

              <div className="min-w-[340px] md:min-w-[580px] h-[380px] bg-[#f4f2ee] relative group cursor-pointer snap-start overflow-hidden">
                <img src="/imgi_39_finance-desktop.webp" alt="Finance" className="absolute right-0 bottom-0 h-[90%] w-auto object-contain object-right-bottom z-10" />
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-[60%] md:w-[50%] pr-2">
                  <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-[#0f0f0f] mb-3 leading-tight">Finance and economics</h3>
                  <p className="text-[15px] md:text-[17px] font-medium text-[#333] leading-snug">Take stock of the stories moving markets</p>
                </div>
              </div>

              <div className="min-w-[340px] md:min-w-[580px] h-[380px] bg-[#f4f2ee] relative group cursor-pointer snap-start overflow-hidden">
                <img src="/imgi_40_middle-east-desktop.webp" alt="Middle East" className="absolute right-0 bottom-0 h-[90%] w-auto object-contain object-right-bottom z-10" />
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-[60%] md:w-[50%] pr-2">
                  <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-[#0f0f0f] mb-3 leading-tight">The Middle East</h3>
                  <p className="text-[15px] md:text-[17px] font-medium text-[#333] leading-snug">Stay informed as developments unfold</p>
                </div>
              </div>
              
              <div className="min-w-[340px] md:min-w-[580px] h-[380px] bg-[#f4f2ee] relative group cursor-pointer snap-start overflow-hidden">
                <img src="/imgi_41_science-desktop.webp" alt="Science" className="absolute right-0 bottom-0 h-[90%] w-auto object-contain object-right-bottom z-10" />
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-[60%] md:w-[50%] pr-2">
                  <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-[#0f0f0f] mb-3 leading-tight">Science and <br /> technology</h3>
                  <p className="text-[15px] md:text-[17px] font-medium text-[#333] leading-snug">Understand the latest innovations</p>
                </div>
              </div>

              <div className="min-w-[340px] md:min-w-[580px] h-[380px] bg-[#f4f2ee] relative group cursor-pointer snap-start overflow-hidden">
                <img src="/imgi_42_culture-desktop.webp" alt="Culture" className="absolute right-0 bottom-0 h-[90%] w-auto object-contain object-right-bottom z-10" />
                <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-[60%] md:w-[50%] pr-2">
                  <h3 className="text-[32px] md:text-[40px] font-serif font-bold text-[#0f0f0f] mb-3 leading-tight">Culture</h3>
                  <p className="text-[15px] md:text-[17px] font-medium text-[#333] leading-snug">Explore literature, arts and more</p>
                </div>
              </div>
            </div>

            {canScrollRight && (
              <button 
                onClick={() => scrollByAmount(604)}
                className="absolute right-[-15px] md:right-[-25px] top-1/2 -translate-y-1/2 z-[60] w-[50px] h-[50px] bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-gray-50 transition-colors"
                aria-label="Next"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
          </div>
        </section>

        <div className="w-full border-t border-black max-w-[1600px] mx-auto mb-10"></div>

        {/* GAIN CLARITY IN A COMPLEX WORLD */}
        <section className="w-full max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] mb-20 relative">
          <h2 className="text-[44px] md:text-[50px] font-serif font-normal mb-2 text-[#0f0f0f]">Gain clarity in a complex world</h2>
          <p className="text-[16px] font-bold text-gray-700 mb-8">Sharpen your understanding with expert insights</p>
          
          <div className="relative group">
            {canScrollLeftClarity && (
              <button 
                onClick={() => scrollClarityByAmount(-693)}
                className="absolute left-[-15px] md:left-[-25px] top-1/2 -translate-y-1/2 z-[60] w-[50px] h-[50px] bg-white border border-gray-100 rounded-full hidden md:flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-gray-50 transition-colors"
                aria-label="Previous"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}

            <div 
              ref={scrollRefClarity}
              onScroll={handleScrollEventClarity}
              className="flex overflow-x-auto gap-4 pb-4 snap-x relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              {[
                { img: "imgi_18_image.webp", tag: "THE INSIDER", title: "Elon Musk: AI will be smarter than humans in five years", time: "2:22" },
                { img: "imgi_19_image.webp", tag: "Finance", title: "Has South Korea's stock market turned into a casino?", time: "2:54" },
                { img: "imgi_20_image.webp", tag: "Middle East", title: "Could this be Israel's next prime minister?", time: "2:51" },
                { img: "imgi_21_image.webp", tag: "Britain", title: "Meet Britain's new prime minister", time: "1:54" },
                { img: "imgi_22_image.webp", tag: "Culture", title: "The best non-fiction books of 2024 (so far)", time: "2:35" },
                { img: "imgi_23_image.webp", tag: "United States", title: "Why is New York City building a jail skyscraper?", time: "2:50" },
                { img: "imgi_24_image.webp", tag: "Technology", title: "The race to build the perfect battery", time: "3:10" },
                { img: "imgi_25_image.webp", tag: "Climate", title: "Can we re-freeze the Arctic?", time: "4:05" },
              ].map((video, idx) => (
                <div key={idx} className="min-w-[215px] max-w-[215px] h-[380px] relative group cursor-pointer snap-start flex-shrink-0 bg-black overflow-hidden group">
                  <img src={`/${video.img}`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Video Play Mark and Duration */}
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <div className="flex items-center gap-1.5 opacity-90">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                      </svg>
                      <span className="text-[12px] font-bold">{video.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll arrow overlay */}
            {canScrollRightClarity && (
              <button 
                onClick={() => scrollClarityByAmount(693)}
                className="absolute right-[-15px] md:right-[-25px] top-1/2 -translate-y-1/2 z-[60] w-[50px] h-[50px] bg-white border border-gray-100 rounded-full hidden md:flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-gray-50 transition-colors"
                aria-label="Next"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
          </div>
        </section>
        <div className="w-full border-t border-black max-w-[1600px] mx-auto mb-10 mt-16"></div>

        {/* WHAT'S INCLUDED */}
        <section className="w-full max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] mb-20">
          <h2 className="text-[44px] md:text-[50px] font-serif font-normal mb-10 text-[#0f0f0f]">What's included:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Box 1 */}
            <div className="bg-[#f4f2ee] px-10 pt-16 pb-0 flex flex-col items-center text-center overflow-hidden h-[550px] md:h-[650px]">
              <h3 className="text-[40px] md:text-[52px] font-serif font-bold text-[#0f0f0f] mb-4">Insider</h3>
              <p className="text-[18px] md:text-[20px] font-medium text-[#333] mb-10 max-w-[85%] leading-snug">Exclusive shows with our editors as they cover stories shaping the world from geopolitics to tech</p>
              <img src="/imgi_29_insider.webp" alt="Insider App" className="w-[320px] md:w-[380px] h-auto object-contain mt-auto drop-shadow-2xl translate-y-4" />
            </div>

            {/* Box 2 */}
            <div className="bg-[#f4f2ee] px-10 pt-16 pb-0 flex flex-col items-center text-center overflow-hidden h-[550px] md:h-[650px]">
              <h3 className="text-[40px] md:text-[52px] font-serif font-bold text-[#0f0f0f] mb-4">The Economist app</h3>
              <p className="text-[18px] md:text-[20px] font-medium text-[#333] mb-10 max-w-[85%] leading-snug">Full access to articles, videos, audio and our digital weekly edition</p>
              <img src="/imgi_30_app-2.webp" alt="Economist App" className="w-[320px] md:w-[380px] h-auto object-contain mt-auto drop-shadow-2xl translate-y-4" />
            </div>

            {/* Box 3 */}
            <div className="bg-[#f4f2ee] px-10 pt-16 pb-0 flex flex-col items-center text-center overflow-hidden h-[550px] md:h-[650px]">
              <h3 className="text-[40px] md:text-[52px] font-serif font-bold text-[#0f0f0f] mb-4">Podcasts and audio</h3>
              <p className="text-[18px] md:text-[20px] font-medium text-[#333] mb-10 max-w-[85%] leading-snug">Listen on-the-go with subscriber-only podcasts and professionally narrated articles</p>
              <img src="/imgi_31_podcast.webp" alt="Podcasts App" className="w-[320px] md:w-[380px] h-auto object-contain mt-auto drop-shadow-2xl translate-y-4" />
            </div>

            {/* Box 4 */}
            <div className="bg-[#f4f2ee] px-10 pt-16 pb-0 flex flex-col items-center text-center overflow-hidden h-[550px] md:h-[650px]">
              <h3 className="text-[40px] md:text-[52px] font-serif font-bold text-[#0f0f0f] mb-4">Exclusive newsletters</h3>
              <p className="text-[18px] md:text-[20px] font-medium text-[#333] mb-10 max-w-[85%] leading-snug">Get the best of <span className="italic">The Economist</span>, straight to your inbox with subscriber-only newsletters</p>
              <img src="/imgi_32_newsletter.webp" alt="Newsletter App" className="w-[320px] md:w-[380px] h-auto object-contain mt-auto drop-shadow-2xl translate-y-4" />
            </div>

          </div>
        </section>

        {/* EXPLORE OTHER SUBSCRIPTIONS */}
        <section className="w-full max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] mb-32 md:mb-48 border-t border-gray-300 pt-4">
          <h2 className="text-[44px] md:text-[50px] font-serif font-normal mb-8 text-[#0f0f0f]">Explore other subscriptions</h2>
          
          <div className="flex flex-wrap gap-3 mb-10">
            {exploreTabsData.map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setActiveExploreTab(idx);
                  if (tab.isPricing && tab.pricingOptions) {
                    setSelectedPricingOption(tab.pricingOptions[0].id);
                  }
                }}
                className={`px-4 py-2 text-[14px] font-bold border transition-colors ${
                  activeExploreTab === idx 
                    ? 'bg-[#1c1f51] text-white border-[#1c1f51]' 
                    : 'bg-white text-[#1c1f51] border-[#1c1f51] hover:bg-[#1c1f51] hover:text-white'
                }`}
              >
                {tab.buttonText}
              </button>
            ))}
          </div>

          <div className="w-full bg-[#dce1f1] flex flex-col md:flex-row items-center overflow-hidden min-h-[550px] md:min-h-[600px]">
            {exploreTabsData[activeExploreTab].isPricing ? (
              <>
                {/* Text & Pricing (Left) */}
                <div className="w-full md:w-1/2 p-8 md:p-16 order-2 md:order-1 flex flex-col justify-center">
                  <h3 className="text-[40px] md:text-[46px] font-serif font-bold text-[#0f0f0f] mb-4">{exploreTabsData[activeExploreTab].title}</h3>
                  <p className="text-[16px] md:text-[18px] text-[#333] mb-8 font-medium leading-snug pr-4">{exploreTabsData[activeExploreTab].description}</p>
                  
                  {/* Pricing Options */}
                  <div className="flex flex-col gap-3 w-full max-w-[520px]">
                    {exploreTabsData[activeExploreTab].pricingOptions?.map((option) => (
                      <div 
                        key={option.id}
                        onClick={() => setSelectedPricingOption(option.id)}
                        className={`relative border cursor-pointer p-4 ${selectedPricingOption === option.id ? 'border-[#1c1f51] bg-[#d3d9eb]' : 'border-gray-400 bg-transparent'}`}
                      >
                        {option.bestValue && <div className="absolute top-0 left-0 bg-[#1c1f51] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">Best Value</div>}
                        <div className={`flex justify-between items-start ${option.bestValue ? 'mt-3' : ''}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center">
                              {selectedPricingOption === option.id && <div className="w-2 h-2 bg-black rounded-full"></div>}
                            </div>
                            <div>
                              <div className="font-bold text-[16px] text-black">{option.title}</div>
                              {option.savings && <div className="text-[12px] text-[#1c1f51] font-medium italic mt-1">{option.savings}</div>}
                            </div>
                          </div>
                          <div className="font-bold text-[14px] text-black">{option.price}</div>
                        </div>
                        <div className="text-[12px] text-gray-700 mt-2 ml-7">{option.billing}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-gray-600 mt-4 max-w-[520px] text-center">{exploreTabsData[activeExploreTab].disclaimer}</div>
                  
                  <button className="bg-[#3b49ab] hover:bg-[#2b3582] text-white font-bold py-3 mt-4 w-full max-w-[520px] transition-colors text-[14px]">
                    Continue to checkout
                  </button>
                </div>

                {/* Image (Right) */}
                <div className="w-full md:w-1/2 h-full flex items-end justify-center md:justify-center order-1 md:order-2 pt-8 md:pt-16 px-4">
                  <img src={exploreTabsData[activeExploreTab].image} alt="Podcasts" className="h-[400px] md:h-[550px] w-auto object-contain object-bottom drop-shadow-2xl translate-y-6" />
                </div>
              </>
            ) : (
              <>
                {/* Image (Left) */}
                <div className="w-full md:w-1/2 h-full flex items-end justify-center md:justify-center order-2 md:order-1 pt-8 md:pt-16 px-4">
                  <img src={exploreTabsData[activeExploreTab].image} alt={exploreTabsData[activeExploreTab].title} className="h-[400px] md:h-[520px] w-auto object-contain object-bottom drop-shadow-2xl" />
                </div>
                
                {/* Text (Right) */}
                <div className="w-full md:w-1/2 p-8 md:p-16 order-1 md:order-2 flex flex-col justify-center">
                  <h3 className="text-[40px] md:text-[46px] font-serif font-bold text-[#0f0f0f] mb-2">{exploreTabsData[activeExploreTab].title}</h3>
                  <p className="text-[18px] md:text-[20px] text-[#333] mb-10 font-medium leading-snug">{exploreTabsData[activeExploreTab].description}</p>
                  
                  <ul className="flex flex-col gap-5">
                    {exploreTabsData[activeExploreTab].links?.map((link, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[16px] font-bold text-[#0f0f0f] hover:text-[#1c1f51] cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>

        {/* TRUSTED BY MILLIONS */}
        <section className="w-full max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] mb-32 border-t border-black pt-20 mt-24">
          <h2 className="text-[48px] md:text-[56px] font-serif font-normal mb-16 text-[#0f0f0f]">Trusted by millions of readers worldwide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="flex flex-col h-full">
              <div className="flex items-start gap-2 mb-8">
                <span className="text-[#e3120b] font-serif font-bold text-[28px] md:text-[32px] leading-none mt-1">“</span>
                <p className="text-[20px] md:text-[24px] font-serif text-[#0f0f0f] leading-snug">It helps make sense of our chaotic world</p>
              </div>
              <div className="mt-auto">
                <div className="w-6 h-[2px] bg-[#e3120b] mb-3"></div>
                <span className="text-[13px] font-bold text-[#0f0f0f]">Siefried</span>
              </div>
            </div>
            <div className="flex flex-col h-full">
              <div className="flex items-start gap-2 mb-8">
                <span className="text-[#e3120b] font-serif font-bold text-[28px] md:text-[32px] leading-none mt-1">“</span>
                <p className="text-[20px] md:text-[24px] font-serif text-[#0f0f0f] leading-snug">Unbeatable coverage and analysis! So accessible even in a busy schedule.</p>
              </div>
              <div className="mt-auto">
                <div className="w-6 h-[2px] bg-[#e3120b] mb-3"></div>
                <span className="text-[13px] font-bold text-[#0f0f0f]">Rich</span>
              </div>
            </div>
            <div className="flex flex-col h-full">
              <div className="flex items-start gap-2 mb-8">
                <span className="text-[#e3120b] font-serif font-bold text-[28px] md:text-[32px] leading-none mt-1">“</span>
                <p className="text-[20px] md:text-[24px] font-serif text-[#0f0f0f] leading-snug">A great way to receive information on politics from all regions of the world</p>
              </div>
              <div className="mt-auto">
                <div className="w-6 h-[2px] bg-[#e3120b] mb-3"></div>
                <span className="text-[13px] font-bold text-[#0f0f0f]">Sophie</span>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="w-full max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] mb-24">
          <h2 className="text-[48px] md:text-[56px] font-serif font-normal mb-16 text-[#0f0f0f]">Frequently asked questions</h2>
          
          <div className="flex flex-col">
            {faqs.map((faq, idx) => (
              <div key={idx} className="mb-2">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className={`w-full py-5 flex items-center justify-between text-left hover:underline decoration-black decoration-1 underline-offset-4 transition-colors ${openFaq === idx ? 'underline' : ''}`}
                >
                  <span className="text-[17px] md:text-[19px] font-bold text-black">{faq.question}</span>
                  <div className="flex flex-col items-center">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      className={`transform transition-transform duration-200 text-black ${openFaq === idx ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                    {openFaq === idx && <div className="w-4 h-[1px] bg-black mt-[2px]"></div>}
                  </div>
                </button>
                
                {/* Accordion Content */}
                {openFaq === idx && (
                  <div className="pb-6 pt-2 text-[16px] md:text-[17px] font-medium text-[#333] leading-relaxed max-w-[95%]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
