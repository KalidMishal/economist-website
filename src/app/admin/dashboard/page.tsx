'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
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
            router.push('/admin/login');
          }}
          className="text-sm font-bold text-gray-500 hover:text-black uppercase tracking-widest"
        >
          Log Out
        </button>
      </div>
      <main className="flex-grow max-w-6xl w-full mx-auto p-8">
        <div className="bg-white p-8 border border-gray-200 shadow-sm mt-8">
          <h1 className="text-3xl font-serif font-bold mb-4 text-[#0f0f0f]">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mb-8">Welcome back, <span className="font-bold text-[#c11010]">{user.name}</span>!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-100 bg-gray-50 rounded shadow-sm">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-gray-500">Manage Users</h3>
              <p className="text-gray-600 text-sm mb-4">View and edit writers and readers.</p>
              <button className="bg-[#0f0f0f] text-white px-4 py-2 text-sm font-bold uppercase w-full">View Users</button>
            </div>
            <div className="p-6 border border-gray-100 bg-gray-50 rounded shadow-sm">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-gray-500">Global Settings</h3>
              <p className="text-gray-600 text-sm mb-4">Configure site-wide settings.</p>
              <button className="bg-[#0f0f0f] text-white px-4 py-2 text-sm font-bold uppercase w-full">Settings</button>
            </div>
            <div className="p-6 border border-gray-100 bg-gray-50 rounded shadow-sm">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-gray-500">Analytics</h3>
              <p className="text-gray-600 text-sm mb-4">View site traffic and metrics.</p>
              <button className="bg-[#0f0f0f] text-white px-4 py-2 text-sm font-bold uppercase w-full">View Analytics</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
