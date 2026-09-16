'use client';
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from '@/components/Skeletons';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass: string) => {
    const minLength = pass.length >= 7;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be 7 Characters long and include Atleast 1 Uppercase Letter,1 Lowercase letter,one number, and one special character.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSuccess('Password has been reset successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2500);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full text-center">
        <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded mb-4">
          Invalid or missing password reset link.
        </div>
        <Link href="/login" className="text-[#3a479b] hover:underline font-bold">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center mb-2">Create New Password</h1>
      <p className="text-gray-500 text-sm text-center mb-8">Please enter your new strong password below.</p>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm border border-red-200">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm border border-green-200">{success}</div>}
      
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        {/* Password */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="text-[14px] font-bold text-[#0f0f0f]">New Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 pr-10 font-sans text-[15px] focus:outline-none focus:border-[#004e9a] focus:ring-1 focus:ring-[#004e9a] transition-all placeholder:text-gray-400"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-[11px] text-gray-500 mt-1 leading-tight">
            Password must be 7 Characters long and include Atleast 1 Uppercase Letter,1 Lowercase letter,one number, and one special character.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5 relative mt-2">
          <label className="text-[14px] font-bold text-[#0f0f0f]">Confirm New Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm new password"
            className="w-full border border-gray-300 rounded-[3px] px-3 py-2.5 font-sans text-[15px] focus:outline-none focus:border-[#004e9a] focus:ring-1 focus:ring-[#004e9a] transition-all placeholder:text-gray-400"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-3 mt-4 text-white font-bold text-[15px] bg-[#e3120b] hover:bg-[#c90f09] transition-colors rounded-[3px] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? <Spinner /> : null}
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-[#1a1a1a] font-sans flex flex-col justify-center items-center py-12 px-4">
      <Link href="/" className="mb-8">
        <img src="/Logo 2 Newyork capital.svg" alt="Newyork Capital" className="h-[30px] w-auto object-contain" />
      </Link>
      
      <main className="w-full max-w-[460px] bg-white p-8 rounded shadow border border-gray-200 flex flex-col items-center">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </main>
    </div>
  );
}
