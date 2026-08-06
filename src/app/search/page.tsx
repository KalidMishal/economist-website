"use client";

import Header from "@/components/Header";
import React, { useState } from "react";

const allArticles = [
  {
    title: "Before ChatGPT: The Journey That Changed Artificial Intelligence...",
    category: "Technology",
    date: "2 days ago",
    img: "/imgi_576_20260718_EUD000.jpg"
  },
  {
    title: "The Race for Critical Minerals",
    category: "Economic",
    date: "2 days ago",
    img: "/imgi_460_20260718_DE_AP.jpg"
  },
  {
    title: "The Race to Live Forever",
    category: "opinion",
    date: "2 days ago",
    img: "/img_girl_lighter_clear.png"
  },
  {
    title: "The Future of Space Exploration",
    category: "Universe",
    date: "3 days ago",
    img: "/imgi_578_20260718_CUP506.jpg"
  },
  {
    title: "Global Supply Chains Under Pressure",
    category: "Business",
    date: "4 days ago",
    img: "/imgi_577_20260718_EUP002.jpg"
  },
  {
    title: "Artificial Intelligence in Healthcare",
    category: "Health",
    date: "5 days ago",
    img: "/imgi_6_20250123_drp045.png"
  },
  {
    title: "Next Generation Quantum Computers",
    category: "Technology",
    date: "1 week ago",
    img: "/imgi_12_20260624_drp081.png"
  },
  {
    title: "The Ethics of Autonomous Vehicles",
    category: "Innovation",
    date: "1 week ago",
    img: "/imgi_8_20250123_drp046.png"
  },
  {
    title: "Sustainable Fashion Trends",
    category: "Fashion",
    date: "2 weeks ago",
    img: "/imgi_9_20250123_drp044.png"
  },
];

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const itemsPerPage = 3;

  // Simple logic to show different articles per page (looping if we run out)
  const startIndex = ((currentPage - 1) * itemsPerPage) % allArticles.length;
  const visibleArticles = [
    allArticles[startIndex % allArticles.length],
    allArticles[(startIndex + 1) % allArticles.length],
    allArticles[(startIndex + 2) % allArticles.length],
  ];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 w-full max-w-[1200px] mx-auto w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%] py-8 pt-32">
        
        {/* Search Input Row */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 max-w-[1000px] mx-auto">
          <h1 className="text-[26px] font-bold font-sans text-black">Search</h1>
          <div className="flex-1 w-full relative">
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="w-full border border-[#d3d3d3] rounded-md px-4 py-3 text-[15px] font-sans text-[#333] outline-none focus:border-black transition-colors"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Search Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-[1000px] mx-auto min-h-[220px]">
          {visibleArticles.map((article, idx) => (
            <div key={idx} className="border border-[#e6e6e6] p-5 flex flex-col justify-between h-[210px] bg-white hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-sans font-medium text-[15.5px] leading-tight text-[#333] flex-1">
                  {article.title}
                </h3>
                <img src={article.img} alt={article.category} className="w-[65px] h-[65px] object-cover flex-shrink-0" />
              </div>
              <div className="mt-4">
                <p className="text-[#666] text-[14px] mb-2 font-sans">{article.category}</p>
                <p className="text-[#333] text-[13px] font-semibold font-sans">{article.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 md:gap-5 mt-8 mb-20 text-[#666] font-sans text-[15px]">
          <button 
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`p-2 rounded transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black hover:bg-gray-100'}`}
          >
            &lt;&lt;
          </button>
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black hover:bg-gray-100'}`}
          >
            &lt;
          </button>
          
          {[1, 2, 3, 4, 5].map(pageNum => (
            <button 
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === pageNum ? 'font-bold text-black border border-[#e6e6e6] bg-white' : 'hover:text-black hover:bg-gray-100'}`}
            >
              {pageNum}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-black hover:bg-gray-100'}`}
          >
            &gt;
          </button>
          <button 
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-black hover:bg-gray-100'}`}
          >
            &gt;&gt;
          </button>
        </div>
      </main>

      <div className="w-full border-t-[1.5px] border-black mt-12 mb-20"></div>
    </div>
  );
}
