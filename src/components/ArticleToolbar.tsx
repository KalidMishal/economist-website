"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShareDropdown from './ShareDropdown';

interface ArticleToolbarProps {
  article?: any;
}

export default function ArticleToolbar({ article }: ArticleToolbarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full pb-4 mb-8 border-b border-[#e6e6e6]">
      <button onClick={() => router.back()} className="text-[11px] font-bold text-[#767676] tracking-wider uppercase hover:text-[#0f0f0f] transition-colors flex items-center gap-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        BACK TO NEWSFEED
      </button>
    </div>
  );
}
