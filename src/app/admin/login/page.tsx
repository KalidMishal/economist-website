'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();

      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (data.user.role === 'writer') {
          router.push('/writer/dashboard');
        } else if (data.user.role === 'reader') {
          router.push('/reader/dashboard');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-sm flex flex-col items-center">
          <img src="/imgi_5_logo-red.svg" alt="The Economist" className="h-[60px] w-auto object-contain mb-6" />
          <h1 className="text-3xl font-serif font-bold text-center mb-2">Log In</h1>
          <p className="text-center text-gray-500 mb-8">Access your customized dashboard</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm border border-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 focus:border-red-600 focus:outline-none transition-colors"
                placeholder="user@gmail.com"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 focus:border-red-600 focus:outline-none transition-colors"
                placeholder="Enter password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full p-3 mt-4 text-white font-bold tracking-widest uppercase transition-colors ${loading ? 'bg-red-400 cursor-not-allowed' : 'bg-[#e3120b] hover:bg-[#c11010]'}`}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-8 text-sm text-gray-500">
            <p className="mb-2 font-bold text-gray-700">Test Accounts:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Admin: admin@gmail.com / admin123</li>
              <li>Writer: writer@gmail.com / writer123</li>
              <li>Reader: reader@gmail.com / reader123</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
