'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WriterDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'writer') {
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
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#0f0f0f] mb-1">Writer Workspace</h1>
              <p className="text-gray-600">Logged in as: <span className="font-bold text-[#00508f]">{user.name}</span></p>
            </div>
            <button className="bg-[#c11010] hover:bg-red-800 text-white font-bold uppercase tracking-widest text-sm px-6 py-3">
              + Draft New Article
            </button>
          </div>
          
          <h2 className="text-xl font-bold mb-4 font-serif">Your Recent Articles</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 text-sm uppercase tracking-widest text-gray-500">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-serif">Trump Declares Iran Ceasefire 'Over'</td>
                  <td className="py-4 px-4"><span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Published</span></td>
                  <td className="py-4 px-4 text-sm text-gray-500">Jul 19, 2026</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-600 hover:underline text-sm mr-4">Edit</button>
                    <button className="text-red-600 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-serif">Future of Global Economics</td>
                  <td className="py-4 px-4"><span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Draft</span></td>
                  <td className="py-4 px-4 text-sm text-gray-500">Jul 23, 2026</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-600 hover:underline text-sm mr-4">Edit</button>
                    <button className="text-red-600 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
