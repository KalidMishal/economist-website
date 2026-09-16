"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShareDropdown from './ShareDropdown';

interface ArticleToolbarProps {
  article?: any;
}

export default function ArticleToolbar({ article }: ArticleToolbarProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!article || !article.slug) return;
    const fetchBookmarkStatus = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      try {
        const res = await fetch(`http://localhost:5000/api/bookmarks?email=${user.email}`);
        const data = await res.json();
        if (data.success) {
          setIsBookmarked(data.bookmarks.some((b: any) => b.slug === article.slug));
        }
      } catch (err) {
        console.error('Failed to fetch bookmark status', err);
      }
    };
    fetchBookmarkStatus();
  }, [article]);

  const handleBookmark = async () => {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
      router.push('/login');
    } else {
      const user = JSON.parse(userStr);
      try {
        const res = await fetch('http://localhost:5000/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: user.email, 
            article_slug: article.slug,
            title: article.title,
            image: article.image,
            category: article.category,
            date: article.date,
            author: article.authorName || 'The Economist'
          }),
        });
        const data = await res.json();
        if (data.success) {
          setIsBookmarked(data.bookmarked);
        }
      } catch (err) {
        console.error('Failed to toggle bookmark', err);
      }
    }
  };

  return (
    <div className="flex items-center justify-between w-full pb-4 mb-8 border-b border-[#e6e6e6]">
      <button onClick={() => router.back()} className="text-[11px] font-bold text-[#767676] tracking-wider uppercase hover:text-[#0f0f0f] transition-colors flex items-center gap-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        BACK TO NEWSFEED
      </button>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleBookmark}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors bg-white ${
            isBookmarked 
              ? 'border-[#E3120B] text-[#E3120B]' 
              : 'border-[#e6e6e6] text-gray-500 hover:text-[#E3120B] hover:border-[#E3120B]'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </button>
        <ShareDropdown title={article?.title}>
          <div className="w-9 h-9 rounded-full border border-[#fbd5d5] flex items-center justify-center text-[#E3120B] bg-[#fffcfc] hover:bg-[#fcf0f0] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </div>
        </ShareDropdown>
      </div>
    </div>
  );
}
