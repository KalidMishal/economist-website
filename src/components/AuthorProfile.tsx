'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ShareDropdown from './ShareDropdown';

interface AuthorProfileProps {
  authorId?: number | string;
  authorName: string;
  authorEmail?: string;
  authorBio?: string;
  authorPhoto?: string;
  authorLinkedin?: string;
  publishDate?: string;
  readTime?: string;
  disableLinks?: boolean;
  article?: any;
}

export default function AuthorProfile({
  authorId,
  authorName,
  authorEmail,
  authorBio,
  authorPhoto,
  authorLinkedin,
  publishDate,
  readTime,
  disableLinks = false,
  article
}: AuthorProfileProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  
  // If we have an authorName and links aren't disabled, wrap name/image in a Link
  const authorHref = authorName && !disableLinks ? `/author/${authorName.toLowerCase().replace(/\s+/g, '-')}` : undefined;

  useEffect(() => {
    const checkStaffStatus = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          const role = (user.role || '').toLowerCase();
          if (['admin', 'writer', 'superadmin', 'super admin', 'super_admin'].includes(role)) {
            setIsStaff(true);
          }
        } catch (e) {}
      }
    };
    checkStaffStatus();
    
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
            author: article.authorName || 'Newyork Capital'
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

  const AuthorNameText = () => (
    <span className={`font-serif font-bold text-[14.5px] text-[#0f0f0f] ${authorHref ? 'hover:text-[#E3120B] transition-colors cursor-pointer' : ''}`}>
      {authorName}
    </span>
  );

  return (
    <div className="flex items-center w-full my-6 py-4 border-t border-b border-gray-100">
      
      {/* Save and Share Icons Replacing Avatar */}
      <div className="flex items-center gap-3 mr-4">
        {!isStaff && (
          <button 
            onClick={handleBookmark}
            className={`w-[42px] h-[42px] rounded-full border flex items-center justify-center transition-colors bg-white flex-shrink-0 ${
              isBookmarked 
                ? 'border-[#E3120B] text-[#E3120B]' 
                : 'border-[#e6e6e6] text-gray-500 hover:text-[#E3120B] hover:border-[#E3120B]'
            }`}
            aria-label="Save Article"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
        )}
        <ShareDropdown title={article?.title}>
          <div className="w-[42px] h-[42px] rounded-full border border-[#fbd5d5] flex items-center justify-center text-[#E3120B] bg-[#fffcfc] hover:bg-[#fcf0f0] transition-colors cursor-pointer flex-shrink-0" aria-label="Share Article">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </div>
        </ShareDropdown>
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
          <span className="text-[14.5px] font-serif font-bold text-[#0f0f0f] mr-1.5 uppercase">By</span>
          {authorHref ? (
            <Link href={authorHref}>
              <AuthorNameText />
            </Link>
          ) : (
            <AuthorNameText />
          )}
          
          {authorLinkedin && (
            <a href={disableLinks ? undefined : (authorLinkedin.startsWith('http') ? authorLinkedin : `https://${authorLinkedin}`)} onClick={disableLinks ? (e) => e.preventDefault() : undefined} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`text-[#0077b5] ml-2.5 -mt-[2px] ${disableLinks ? 'cursor-default' : ''}`}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}
        </div>
        {(publishDate || readTime) && (
          <div className="text-[11px] text-[#767676] font-sans flex flex-wrap items-center gap-x-1.5 mt-0.5 tracking-wider">
            {publishDate && <span>Published <span className="uppercase">{publishDate}</span></span>}
            {publishDate && readTime && <span>•</span>}
            {readTime && <span className="whitespace-nowrap">{readTime}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
