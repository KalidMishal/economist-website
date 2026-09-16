'use client';
import React, { useState } from 'react';
import Link from 'next/link';

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
  disableLinks = false
}: AuthorProfileProps) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const hasValidImage = authorPhoto && authorPhoto.trim() !== '' && !imageError;
  const initials = authorName 
    ? authorName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'A';
    
  // If we have an authorName and links aren't disabled, wrap name/image in a Link
  const authorHref = authorName && !disableLinks ? `/author/${authorName.toLowerCase().replace(/\s+/g, '-')}` : undefined;

  const AuthorImage = () => (
    <div className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-gray-100 flex items-center justify-center mr-3 relative shadow-sm">
      {hasValidImage ? (
        <img 
          src={authorPhoto} 
          alt={authorName} 
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[#0f0f0f] font-serif font-bold text-lg">{initials}</span>
      )}
    </div>
  );

  const AuthorNameText = () => (
    <span className={`font-serif font-bold text-[14.5px] text-[#0f0f0f] ${authorHref ? 'hover:text-[#E3120B] transition-colors cursor-pointer' : ''}`}>
      {authorName}
    </span>
  );

  return (
    <div className="flex items-center w-full my-6 py-4 border-t border-b border-gray-100">
      {authorHref ? (
        <Link href={authorHref} className="flex-shrink-0">
          <AuthorImage />
        </Link>
      ) : (
        <AuthorImage />
      )}
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-y-1">
          <div className="flex items-center whitespace-nowrap">
            <span className="text-[12px] font-sans font-bold text-[#0f0f0f] mr-1.5 uppercase tracking-wide">By</span>
            {authorHref ? (
              <Link href={authorHref}>
                <AuthorNameText />
              </Link>
            ) : (
              <AuthorNameText />
            )}
          </div>
          
          {authorLinkedin && (
            <a href={disableLinks ? undefined : (authorLinkedin.startsWith('http') ? authorLinkedin : `https://${authorLinkedin}`)} onClick={disableLinks ? (e) => e.preventDefault() : undefined} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`text-[#0077b5] ml-0.5 -mt-[2px] ${disableLinks ? 'cursor-default' : ''}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
