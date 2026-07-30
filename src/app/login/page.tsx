'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to specific dashboards based on role
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
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Top Header */}
      <div className="w-full flex items-center p-6">
        <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Main Content Centered */}
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[460px] flex flex-col">
          
          <div className="flex justify-center mb-8">
            <img src="/Logo Newyork Capital.svg" alt="Website Logo" className="h-[140px] w-auto object-contain" />
          </div>
          
          <h1 className="text-[28px] font-serif font-bold text-[#0f0f0f] mb-1 text-center">Log into your account</h1>
          <p className="text-[13px] text-gray-600 mb-8 text-center">
            Don't have an account? <Link href="/register" className="underline hover:text-black">Register now</Link>
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-[#0f0f0f] mb-1.5">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-black"
                required
              />
            </div>


            <div className="flex flex-col">
              <label className="text-[13px] font-bold text-[#0f0f0f] mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 pr-10 text-sm focus:outline-none focus:border-black"
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>

            <div className="text-[13px]">
              <button type="button" className="underline text-gray-600 hover:text-black">Forgot password?</button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2.5 mt-2 text-white font-bold text-[14px] bg-[#3a479b] hover:bg-[#2b357a] transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-[11px] text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 gap-2 mb-8">
            <button className="flex items-center justify-center py-2 border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.519-3.317-11.161-7.921l-6.6,5.081C9.529,39.638,16.241,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-700">Continue with Google</span>
            </button>
          </div>

          <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
            To connect a sign in method, make sure the email matches the one registered to your subscription.
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            By continuing, you agree to our <a href="#" className="underline hover:text-black">Terms & Conditions</a> and acknowledge our <a href="#" className="underline hover:text-black">Privacy Policy</a>
          </p>

        </div>
      </div>
    </div>
  );
}
