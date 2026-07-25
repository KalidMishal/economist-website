'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock Data
const authorData = {
  name: "Ronda B",
  title: "WRITER",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  bio: "A dedicated journalist with a passion for delivering accurate, timely, and impactful news. Committed to ethical reporting and in-depth storytelling, she covers a wide range of topics with professionalism, integrity, and a focus on informing audiences through credible journalism."
};

const articles = [
  {
    category: "POLITICS",
    title: "Trump Declares Iran Ceasefire 'Over,' Raising Questions About the Next Phase of the Conflict",
    description: "The fragile ceasefire between the United States and Iran appears to have entered a new and uncertain stage after President Donald Trump declared that the truce has effectively ended. While...",
    date: "JUL 19, 2026",
    image: "/imgi_581_20260718_LDD002_FH.jpg",
    slug: "donald-trump-doj" // Fallback to an existing article
  },
  {
    category: "BUSINESS",
    title: "U.S. Stocks End Higher as SK Hynix's Wall Street Debut and Meta's AI Momentum Lift Markets",
    description: "U.S. stock markets closed higher on Friday as investors responded positively to SK Hynix's debut on U.S. exchanges and continued optimism surrounding artificial intelligence investments. The S&P...",
    date: "JUL 11, 2026",
    image: "/imgi_13_20260718_BLP502-1-1024x576.jpg",
    slug: "president-le-pen-france"
  },
  {
    category: "BUSINESS",
    title: "New Exclusive Decoration Design & Fit Out LLC \u2013 Structural Acrylic Pioneers in the UAE",
    description: "Dubai, UAE \u2013 New Exclusive Decoration Design & Fit Out LLC, recognized as New Exclusive Structural Acrylic Pioneers, is redefining the future of luxury pool design and architectural transparency...",
    date: "JUL 15, 2026",
    image: "/imgi_574_20260718_AMP001.jpg",
    slug: "panama-canal"
  },
  {
    category: "SPORTS",
    title: "Argentina Edge Switzerland in Extra Time to Set Up World Cup Semi-Final Clash With England",
    description: "After defeating Switzerland 3-1 following extra time in an intense quarter-final that featured controversy, drama, and a stunning winning goal from Juli\u00e1n \u00c1lvarez. The reigning world champions will...",
    date: "JUL 12, 2026",
    image: "/imgi_573_20260718_CND001.jpg",
    slug: "china-ai-romances"
  },
  {
    category: "POLITICS",
    title: "Trump's Hormuz Retreat Highlights Struggles to End Iran Conflict",
    description: "On Monday, Trump announced that all vessels using the strategically important waterway would be required to pay a 20% fee, arguing that the charge would help cover the costs of maintaining...",
    date: "JUL 15, 2026",
    image: "/imgi_581_20260718_LDD002_FH.jpg",
    slug: "donald-trump-doj"
  },
  {
    category: "BUSINESS",
    title: "ICE Suspends Most Vehicle Stops After Fatal Shootings in Texas and Maine",
    description: "According to US media reports citing law enforcement sources, the suspension takes effect immediately and applies to most routine vehicle stops. Exceptions will be made for cases involving serious...",
    date: "JUL 15, 2026",
    image: "/imgi_572_20260718_BRD001.jpg",
    slug: "andy-burnham-mps"
  }
];

const mostRead = [
  { rank: 1, title: "New Exclusive Decoration Design & Fit Out LLC \u2013 Structural Acrylic Pioneers in the UAE", views: "57 views" },
  { rank: 2, title: "Trump Declares Iran Ceasefire 'Over,' Raising Questions About the Next Phase of the Conflict", views: "39 views" },
  { rank: 3, title: "Trump's Hormuz Retreat Highlights Struggles to End Iran Conflict", views: "14 views" },
  { rank: 4, title: "Crypto Market Overview: Bitcoin Stabilizes, Zcash Targets New Highs, Pump.fun Extends Recovery", views: "8 views" },
  { rank: 5, title: "U.S. Stocks End Higher as SK Hynix's Wall Street Debut and Meta's AI Momentum Lift Markets", views: "7 views" }
];

export default function AuthorPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="w-full flex-grow pt-10 pb-20">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-16">
          
          {/* Go Back */}
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest hover:text-black mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Go Back
          </button>

          {/* Author Header */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
            <div className="w-28 h-28 flex-shrink-0">
              <img 
                src={authorData.image} 
                alt={authorData.name} 
                className="w-full h-full rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex flex-col pt-1">
              <h1 className="text-[38px] font-serif font-bold text-[#0f0f0f] leading-none mb-2">
                {authorData.name}
              </h1>
              <h2 className="text-[#c11010] text-[13px] font-bold uppercase tracking-widest mb-4">
                {authorData.title}
              </h2>
              <p className="text-[15px] text-[#555] font-sans leading-[1.6] max-w-4xl">
                {authorData.bio}
              </p>
            </div>
          </div>

          <div className="w-full border-t border-gray-100 mb-12"></div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Column (Articles) */}
            <div className="w-full lg:col-span-8 flex flex-col">
              <h3 className="text-[20px] font-serif font-bold uppercase text-[#0f0f0f] mb-8 border-b-[4px] border-[#0f0f0f] pb-3">
                More from {authorData.name.toUpperCase()}
              </h3>
              
              <div className="flex flex-col">
                {currentArticles.map((article, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-200 first:pt-0 group">
                    <Link href={`/article/${article.slug}`} className="w-full sm:w-[260px] h-auto sm:h-[160px] flex-shrink-0 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="flex flex-col pt-1">
                      <Link href={`/article/${article.slug}`} className="text-[#00508f] text-[11px] font-bold uppercase tracking-widest hover:underline mb-2">
                        {article.category}
                      </Link>
                      <Link href={`/article/${article.slug}`}>
                        <h4 className="text-[19px] font-serif font-bold leading-[1.2] text-[#0f0f0f] group-hover:text-[#00508f] transition-colors mb-2 pr-4">
                          {article.title}
                        </h4>
                      </Link>
                      <p className="text-[14px] text-gray-500 font-sans leading-[1.5] mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="mt-auto text-[10px] text-gray-400 font-bold uppercase tracking-widest flex gap-2">
                        <span>BY {authorData.name.toUpperCase()}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#0f0f0f] border border-gray-300 hover:bg-gray-50'}`}
                  >
                    PREV
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button 
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center text-[13px] font-bold ${currentPage === page ? 'bg-[#c11010] text-white' : 'border border-gray-300 text-[#0f0f0f] hover:bg-gray-50'}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#0f0f0f] border border-gray-300 hover:bg-gray-50'}`}
                  >
                    NEXT
                  </button>
                </div>
              )}

            </div>

            {/* Right Column (Sidebar) */}
            <div className="w-full lg:col-span-4 flex flex-col pt-1">
              <div className="border border-gray-200 p-6 mb-8 bg-white">
                <h3 className="text-[14px] font-serif font-bold uppercase tracking-widest text-[#003a6a] mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  Most Read
                </h3>
                
                <div className="flex flex-col gap-6">
                  {mostRead.map((item, idx) => (
                    <div key={idx} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0 group cursor-pointer">
                      <span className="text-[32px] font-serif font-bold text-gray-200 leading-none pt-1">
                        {item.rank}
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-[14px] font-serif font-bold text-[#0f0f0f] leading-snug group-hover:text-[#00508f] transition-colors mb-2">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {item.views}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad Placeholder */}
              <div className="w-full">
                <img 
                  src="/imgi_575_20260718_WOT913.png" 
                  alt="Advertisement" 
                  className="w-full h-auto object-cover border border-gray-200"
                />
              </div>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
