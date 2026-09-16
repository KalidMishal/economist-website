'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import { Spinner } from '@/components/Skeletons';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setForgotLoading(true);
    
    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json();
      if (data.success) {
        setForgotSuccess(data.message);
      } else {
        setForgotError(data.message);
      }
    } catch (err) {
      setForgotError('Network error. Please try again later.');
    } finally {
      setForgotLoading(false);
    }
  };

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
          router.push('/');
        } else if (data.user.role === 'writer') {
          router.push('/');
        } else if (data.user.role === 'reader') {
          router.push('/');
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch('http://localhost:5000/api/google-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'admin') router.push('/');
        else router.push('/');
      } else {
        setError(data.message || 'Google Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error during Google login');
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
            <img src="/Logo 2 Newyork capital.svg" alt="Website Logo" className="h-[25px] w-auto object-contain" />
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 pr-10 text-sm focus:outline-none focus:border-black"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="text-[13px]">
              <button type="button" onClick={() => setIsForgotOpen(true)} className="underline text-gray-600 hover:text-black">Forgot password?</button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2.5 mt-2 text-white font-bold text-[14px] bg-[#3a479b] hover:bg-[#2b357a] transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? <Spinner /> : null}
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-[11px] text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="flex justify-center mb-8">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google login failed')}
              width="460"
              theme="outline"
              shape="rectangular"
              size="large"
            />
          </div>

          <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
            To connect a sign in method, make sure the email matches the one registered to your subscription.
          </p>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            By continuing, you agree to our <a href="#" className="underline hover:text-black">Terms & Conditions</a> and acknowledge our <a href="#" className="underline hover:text-black">Privacy Policy</a>
          </p>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setIsForgotOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 className="text-xl font-bold text-[#0f0f0f] mb-4">Reset Password</h2>
            <p className="text-[13px] text-gray-600 mb-6">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
            
            {forgotError && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm border border-red-200">{forgotError}</div>}
            {forgotSuccess && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm border border-green-200">{forgotSuccess}</div>}
            
            <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-[#0f0f0f] mb-1.5">Email address</label>
                <input 
                  type="email" 
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-black"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={forgotLoading}
                className={`w-full py-2.5 mt-2 text-white font-bold text-[14px] bg-[#e3120b] hover:bg-[#c90f09] transition-colors flex items-center justify-center gap-2 ${forgotLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {forgotLoading ? <Spinner /> : null}
                {forgotLoading ? 'Sending link...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
