'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ReaderDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'reader') {
        router.push('/login');
      } else {
        setUser(parsedUser);
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <img src="/imgi_5_logo-red.svg" alt="The Economist" className="h-[65px] w-auto object-contain" />
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            router.push('/login');
          }}
          className="text-sm font-bold text-gray-500 hover:text-black uppercase tracking-widest"
        >
          Log Out
        </button>
      </div>
      <main className="flex-grow max-w-6xl w-full mx-auto p-8">
        <div className="bg-white p-8 border border-gray-200 shadow-sm mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#0f0f0f] mb-2">My Reading Hub</h1>
              <p className="text-gray-600">Welcome back, <span className="font-bold text-[#c11010]">{user.name}</span>! Here are your tailored recommendations.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm text-[#003a6a] border-b pb-2">Saved Articles</h3>
              <div className="p-4 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Politics</p>
                <h4 className="font-serif font-bold">Trump Declares Iran Ceasefire 'Over'</h4>
                <p className="text-xs text-gray-400 mt-2">Saved 2 days ago</p>
              </div>
              <div className="p-4 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Business</p>
                <h4 className="font-serif font-bold">U.S. Stocks End Higher as SK Hynix's Wall Street Debut</h4>
                <p className="text-xs text-gray-400 mt-2">Saved 5 days ago</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold uppercase tracking-widest text-sm text-[#003a6a] border-b pb-2">Reading History</h3>
              <div className="p-4 bg-gray-50 border border-gray-100">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Sports</p>
                <h4 className="font-serif font-bold text-gray-700">Argentina Edge Switzerland in Extra Time</h4>
                <p className="text-xs text-gray-400 mt-2">Read yesterday</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/" className="inline-block bg-[#0f0f0f] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#c11010] transition-colors">
              Read Latest News
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
