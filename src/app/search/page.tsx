"use client";

import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const filters = [
  'All', 'Articles', 'Authors', '|', 
  'World', 'Finance & Economics', 'Politics', 'Technology', 'Industries'
];

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

export default function SearchPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch articles and authors on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch published articles (using admin endpoint for simplicity since it returns published posts)
        const articlesRes = await fetch('http://localhost:5000/api/admin/published-posts?limit=1000');
        if (articlesRes.ok) {
          const data = await articlesRes.json();
          setArticles(data.posts || []);
        }

        // Fetch authors (users)
        const authorsRes = await fetch('http://localhost:5000/api/admin/users');
        if (authorsRes.ok) {
          const data = await authorsRes.json();
          setAuthors(data.users || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute displayed results
  let displayedArticles = [];
  let displayedAuthors = [];

  const lowerQuery = searchQuery.toLowerCase();

  if (activeFilter === 'Authors') {
    displayedAuthors = authors.filter(a => 
      (a.role === 'writer' || a.role === 'author') && 
      a.name?.toLowerCase().includes(lowerQuery)
    );
  } else {
    displayedArticles = articles.filter(a => {
      const titleStr = String(a.title || '').toLowerCase();
      const catStr = String(a.mainCategory || '').toLowerCase();
      const matchSearch = titleStr.includes(lowerQuery) || catStr.includes(lowerQuery);
      
      if (!matchSearch) return false;
      if (activeFilter === 'All' || activeFilter === 'Articles') return true;
      const normalizedCat = String(a.mainCategory || '').trim();
      if (activeFilter === 'World') {
        const worldCats = ['World', 'United States', 'China', 'Europe', 'Britain', 'Middle East', 'Africa', 'Asia'];
        return worldCats.includes(normalizedCat);
      }
      return normalizedCat === activeFilter;
    }).slice(0, 3);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Reduced pt-32 to pt-8 as requested */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] py-8 pt-8">
        
        {/* Search Input Row */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 max-w-[1000px] mx-auto">
          <h1 className="text-[26px] font-bold font-sans text-black">Search</h1>
          <div className="flex-1 w-full relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-4 mb-10 max-w-[1000px] mx-auto border-b border-gray-200 pb-4">
          {filters.map((f, i) => {
            if (f === '|') {
              return <span key={i} className="text-gray-300 font-light mx-1">/</span>;
            }
            const isActive = activeFilter === f;
            return (
              <button
                key={i}
                onClick={() => setActiveFilter(f)}
                className={`text-[12px] font-bold uppercase tracking-wider transition-colors px-4 py-2 rounded ${isActive ? 'bg-[#E3120B] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Search Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-[1000px] mx-auto min-h-[220px]">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-10"><div className="w-6 h-6 border-2 border-[#E3120B] border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <>
              {activeFilter === 'Authors' ? (
                displayedAuthors.length > 0 ? displayedAuthors.map((author, idx) => (
                  <Link href={`/author/${author.name?.toLowerCase().replace(/\s+/g, '-') || author.id}`} key={idx} className="border border-[#e6e6e6] p-5 flex flex-col items-center justify-center h-[210px] bg-white hover:shadow-md transition-shadow cursor-pointer text-center group">
                    <img src={author.profile_picture || 'https://via.placeholder.com/80'} alt={author.name} className="w-[80px] h-[80px] rounded-full object-cover mb-4 shadow-sm group-hover:scale-105 transition-transform" />
                    <h3 className="font-sans font-bold text-[16px] text-[#333]">
                      {author.name}
                    </h3>
                    <span className="text-[12px] font-sans text-[#666] mt-1">{author.role || 'Writer'}</span>
                  </Link>
                )) : (
                  <div className="col-span-full text-center text-gray-500 py-10 font-sans">No authors found.</div>
                )
              ) : (
                displayedArticles.length > 0 ? displayedArticles.map((article, idx) => (
                  <Link href={`/article/${article.slug || article.id}`} key={idx} className="border border-[#e6e6e6] p-5 flex flex-col justify-between h-[210px] bg-white hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-sans font-medium text-[15.5px] leading-tight text-[#333] flex-1 line-clamp-4">
                        {article.title}
                      </h3>
                      {article.imageUrl && (
                        <img src={article.imageUrl} alt={article.mainCategory} className="w-[65px] h-[65px] object-cover flex-shrink-0 bg-gray-100" />
                      )}
                    </div>
                    <div className="mt-4 flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#E3120B]">{article.mainCategory}</span>
                      <span className="text-[12px] font-sans font-bold text-[#666]">{formatDate(article.date)}</span>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-full text-center text-gray-500 py-10 font-sans">No articles found for this category.</div>
                )
              )}
            </>
          )}
        </div>

      </main>
      
      
    </div>
  );
}
