'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UsersTab from './UsersTab';
import ContactSubmissionsTab from './ContactSubmissionsTab';
import AdvertiseLeadsTab from './AdvertiseLeadsTab';
import ManageAdsTab from './ManageAdsTab';
import DatabaseBackupsTab from './DatabaseBackupsTab';
import ShortsReelsTab from './ShortsReelsTab';

// Simple SVG Icons
const IconHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconFileText = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconUsers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconMonitor = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconMessage = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconBriefcase = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const IconDatabase = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;

const extractTextFromHtml = (html: string) => {
  if (typeof window === 'undefined') return '';
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  const figures = temp.querySelectorAll('figure');
  figures.forEach(f => f.remove());
  
  return temp.innerText.trim();
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
};

const FullPageSkeleton = () => (
  <div className="flex h-screen bg-[#f8f9fa] animate-pulse">
    <div className="w-[280px] bg-[#131a26] shrink-0 h-full">
      <div className="p-8"><div className="h-10 bg-gray-700 rounded w-full"></div></div>
      <div className="mt-8 px-6 space-y-4">
        {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-12 bg-gray-700 rounded-lg w-full"></div>)}
      </div>
    </div>
    <div className="flex-1 p-4 md:p-10 overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <div className="h-10 bg-gray-200 rounded w-64"></div>
        <div className="h-10 bg-gray-200 rounded-full w-48"></div>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-12">
        {[1,2,3].map(i => <div key={i} className="h-28 bg-white border border-gray-100 rounded-xl"></div>)}
      </div>
      <div className="bg-white border border-gray-100 rounded-xl h-[500px]"></div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{id?: number, name: string, email: string, role: string, is_default_admin?: boolean} | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [pendingPosts, setPendingPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const savedTab = sessionStorage.getItem('adminDashboardTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    sessionStorage.setItem('adminDashboardTab', tab);
    setIsMobileMenuOpen(false); // Close sidebar on mobile
  };

  const [isMounted, setIsMounted] = useState(false);
  const [newsletterSubs, setNewsletterSubs] = useState<any[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<number[]>([]);

  // Published Posts State
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
  const [publishedPage, setPublishedPage] = useState(1);
  const [publishedTotalPages, setPublishedTotalPages] = useState(1);
  const [publishedTotalItems, setPublishedTotalItems] = useState(0);
  const [publishedLiveCount, setPublishedLiveCount] = useState(0);
  const [publishedSearch, setPublishedSearch] = useState('');
  const [publishedCategory, setPublishedCategory] = useState('');
  
  const [publishedPlacement, setPublishedPlacement] = useState('');
  const [publishedSortByViews, setPublishedSortByViews] = useState(false);

  const handleSelectAllSubs = () => {
    if (newsletterSubs.length === 0) return;
    if (selectedSubs.length === newsletterSubs.length) {
      setSelectedSubs([]);
    } else {
      setSelectedSubs(newsletterSubs.map(s => s.id));
    }
  };

  const toggleSubSelection = (id: number) => {
    if (selectedSubs.includes(id)) {
      setSelectedSubs(selectedSubs.filter(sId => sId !== id));
    } else {
      setSelectedSubs([...selectedSubs, id]);
    }
  };

    const handleBulkDeleteNewsletters = async () => {
    if (selectedSubs.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedSubs.length} subscribers?`)) return;
    try {
      const res = await fetch('http://localhost:5000/api/admin/newsletters/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedSubs })
      });
      if (res.ok) {
        setNewsletterSubs(prev => prev.filter(s => !selectedSubs.includes(s.id)));
        setSelectedSubs([]);
      }
    } catch(e) {
      console.error(e);
    }
  };

  const handleExportCsv = () => {
    const subsToExport = selectedSubs.length > 0 
      ? newsletterSubs.filter(sub => selectedSubs.includes(sub.id))
      : newsletterSubs;
      
    if (subsToExport.length === 0) {
      showToast('No subscribers to export.');
      return;
    }

    const headers = ['id', 'email', 'newsletters', 'subscribedAt'];
    const rows = subsToExport.map((sub, index) => {
      const fakeId = `nl-${Date.now()}${sub.id}`;
      const email = sub.email || '';
      
      let cats = [];
      try { cats = typeof sub.categories === 'string' ? JSON.parse(sub.categories) : sub.categories; } catch(e) {}
      const newsletters = (cats || []).join('|');
      
      // Use DD-MMM-YYYY format (e.g. 11-Aug 2026) to match screenshot and prevent comma splitting
      const d = new Date(sub.created_at || Date.now());
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const subscribedAt = `${d.getDate()}-${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      
      return `"${fakeId}","${email}","${newsletters}","${subscribedAt}"`;
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const d = new Date();
    const dateString = `${d.getFullYear()}_${String(d.getMonth() + 1).padStart(2, '0')}_${String(d.getDate()).padStart(2, '0')}`;
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `washington_times_subscribers_${dateString}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Profile Settings States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profileData, setProfileData] = useState({ fullName: 'mishal admin', bio: 'Admin User', linkedin: '', photo: '/profile-mishal.jpg' });
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRemoveSubscriber = async (id: number) => {
    if (!window.confirm("Are you sure you want to remove this subscriber?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/newsletters/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setNewsletterSubs(prev => prev.filter(sub => sub.id !== id));
        showToast("Subscriber removed successfully");
      }
    } catch (e) {
      console.error('Failed to remove subscriber', e);
    }
  };

  const handleReview = (id: number) => {
    // Navigate to post review page
    router.push(`/admin/review/${id}`);
  };

  useEffect(() => {
    const savedTab = sessionStorage.getItem('adminActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
      sessionStorage.removeItem('adminActiveTab');
    }
  }, []);

  useEffect(() => {
    // Only save when the user explicitly changes tabs (not on initial load)
    // We handle saving in the click handlers instead
  }, [activeTab]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
        router.push('/login');
        return;
      } else {
        setUser(parsedUser);
      }
    } else {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        const [res, nlRes, pubRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/pending-posts'),
          fetch('http://localhost:5000/api/admin/newsletters'),
          fetch('http://localhost:5000/api/admin/published-posts?limit=1')
        ]);
        
        if (res.ok) {
          const data = await res.json();
          setPendingPosts(data.posts || []);
        }
        if (nlRes.ok) {
          const nlData = await nlRes.json();
          setNewsletterSubs(nlData.subscribers || []);
        }
        if (pubRes.ok) {
          const pubData = await pubRes.json();
          setPublishedLiveCount(pubData.totalLive || 0);
        }
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        setIsInitialLoading(false);
      }
    };

    // Load profile data
    let email = '';
    if (storedUser) {
       const parsedUser = JSON.parse(storedUser);
       email = parsedUser.email;
       if (parsedUser.id) {
         fetch(`http://localhost:5000/api/users/${parsedUser.id}`)
           .then(res => res.json())
           .then(data => {
             if (data.success && data.user) {
               setProfileData({
                 fullName: data.user.name || parsedUser.name || 'Admin User',
                 bio: data.user.bio || '',
                 linkedin: data.user.linkedin_url || '',
                 photo: data.user.profile_picture || '/profile-mishal.jpg'
               });
               const mergedUser = { ...parsedUser, ...data.user };
               localStorage.setItem('user', JSON.stringify(mergedUser));
               if (mergedUser.role !== 'admin') {
                 if (mergedUser.role === 'writer') router.push('/writer/dashboard');
                 else if (mergedUser.role === 'reader') router.push('/reader/dashboard');
                 else router.push('/');
                 return;
               }
               setUser(mergedUser);
             }
           })
           .catch(err => console.error('Failed to sync profile on load', err));
       }
    }
    const storedProfile = localStorage.getItem(`userProfile_${email}`) || localStorage.getItem('userProfile');
    if (storedProfile) {
      try { setProfileData(JSON.parse(storedProfile)); } catch(e) {}
    } else {
       setProfileData(prev => ({...prev, fullName: JSON.parse(storedUser || '{}').name || 'mishal admin'}));
    }

    // Small delay to show skeleton and ensure hydration
    setTimeout(loadData, 600);
  }, [router]);

  useEffect(() => {
    const fetchPublishedPosts = async () => {
      if (activeTab !== 'publishedPosts') return;
      try {
        const queryParams = new URLSearchParams({
          page: publishedPage.toString(),
          limit: '20',
        });
        if (publishedSearch) queryParams.append('search', publishedSearch);
        if (publishedCategory) queryParams.append('category', publishedCategory);
        
        if (publishedPlacement) queryParams.append('placement', publishedPlacement);
          if (publishedSortByViews) queryParams.append('sortByViews', 'true');
        
        const res = await fetch(`http://localhost:5000/api/admin/published-posts?${queryParams}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setPublishedPosts(data.posts || []);
          setPublishedTotalPages(data.totalPages || 1);
          setPublishedTotalItems(data.total || 0);
          setPublishedLiveCount(data.totalLive || 0);
        }
      } catch (e) {
        console.error('Failed to fetch published posts', e);
      }
    };

    fetchPublishedPosts();
  }, [activeTab, publishedPage, publishedSearch, publishedCategory, publishedPlacement, publishedSortByViews]);

  if (isInitialLoading || !user) return <FullPageSkeleton />;

  const handleDeletePublishedPost = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPublishedPosts(prev => prev.filter(p => p.id !== id));
      } else {
        window.alert('Failed to delete post.');
      }
    } catch (e) {
      console.error(e);
      window.alert('An error occurred while deleting the post.');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setProfileData({ ...profileData, photo: dataUrl });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-[#e6ebe7] font-sans">
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-[140] md:hidden" />
      )}
      
      {/* Sidebar */}
      <aside className={`w-[280px] bg-[#131a26] text-white flex flex-col shrink-0 h-full overflow-y-auto custom-scrollbar absolute md:relative z-[150] transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Mobile close button */}
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="px-8 py-8 flex flex-col items-start border-b border-gray-800">
          <img src="/Logo 2 Newyork capital.svg" alt="Newyork Capital" className="w-[200px] object-contain mb-8" />
          
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Home
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('overview'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-bold text-[15px] shadow-sm transition-colors ${activeTab === 'overview' ? 'bg-[#e3120b] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <IconHome />
            Overview
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('newsletter'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'newsletter' ? 'bg-[#e3120b] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <IconMail />
            Newsletter
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('publishedPosts'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'publishedPosts' ? 'bg-[#e3120b] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <IconFileText />
            Published Posts
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('users'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'users' ? 'bg-[#e3120b] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <IconUsers />
            Users
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('manageAds'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'manageAds' ? 'bg-[#e3120b] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>
              Manage Ads
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('contactSubmissions'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'contactSubmissions' ? 'bg-[#e3120b] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <IconMessage />
              Contact Us Submissions
            </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('advertiseLeads'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'advertiseLeads' ? 'bg-[#e3120b] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <IconBriefcase />
              Advertise Leads
            </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('databaseBackups'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'databaseBackups' ? 'bg-[#e3120b] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <IconDatabase />
            Database Backups
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('shortsReels'); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-medium text-[15px] transition-colors ${activeTab === 'shortsReels' ? 'bg-[#e3120b] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
            Shorts & Reels
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="px-4 md:px-10 py-4 md:py-8 flex flex-row items-center justify-between z-50 gap-2 md:gap-0">
          <div className="flex items-center gap-3 md:gap-0">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-600 hover:text-black p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-[#131a26] mb-0.5 md:mb-1">My Workspace</h1>
              <p className="text-[11px] md:text-sm text-gray-500 line-clamp-1">Welcome back, {profileData.fullName}!</p>
            </div>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 bg-white border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-full shadow-sm cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img src={profileData.photo} alt={profileData.fullName} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                <span className="hidden text-[#003a6a] font-bold text-sm w-full h-full flex items-center justify-center">{profileData.fullName.charAt(0)}</span>
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-800 pr-2">{profileData.fullName}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-gray-400 mr-2 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
            </div>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-[110%] w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-[200]">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900 leading-none mb-1">{profileData.fullName}</p>
                  <p className="text-xs text-gray-500 mb-2 truncate">{user.email || 'mishalzuhrie@gmail.com'}</p>
                  <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Admin</span>
                </div>
                <div className="py-1 border-b border-gray-100">
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile Settings
                  </button>
                </div>
                <div className="py-1">
                  <button onClick={() => { localStorage.removeItem('user'); localStorage.removeItem('userProfile'); router.push('/login'); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 px-3 md:px-10 pb-4 md:pb-10 overflow-y-auto custom-scrollbar relative">
          
          {/* Global Toast Message */}
          {toastMessage && (
            <div className="fixed bottom-10 right-10 bg-[#0f0f0f] text-white px-6 py-3 rounded-lg shadow-xl font-bold text-[14px] z-[9999] flex items-center gap-3 animate-fade-in-up">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              {toastMessage}
            </div>
          )}
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Active Reviews */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8b5cf6]"></div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Active Reviews</p>
                <h2 className="text-3xl font-bold text-[#131a26]">{pendingPosts.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6]">
                <IconFileText />
              </div>
            </div>
            
            {/* Completed Releases */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10b981]"></div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Completed Releases</p>
                <h2 className="text-3xl font-bold text-[#131a26]">{publishedLiveCount}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
            </div>
            
            {/* Newsletter Subs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f97316]"></div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Newsletter Subs</p>
                <h2 className="text-3xl font-bold text-[#131a26]">{newsletterSubs.length}</h2>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#f97316]/10 flex items-center justify-center text-[#f97316]">
                <IconMail />
              </div>
            </div>
          </div>

          {activeTab === 'overview' && (
            <>
          {/* Data Table Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 md:p-6">
            <div className="flex justify-between items-start md:items-center mb-6 gap-2 md:gap-0">
              <h3 className="text-lg font-bold text-[#131a26]">Recent Projects (Pending Review)</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-[11px] font-bold text-gray-500">
                pending count: {pendingPosts.length}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] md:min-w-[800px] text-left table-fixed">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[45%]">Article Details</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[150px] md:w-auto">Category</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[130px] md:w-auto">Author</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[120px] md:w-auto">Submitted Date</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[100px] md:w-auto">Status</th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[100px] md:w-auto">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingPosts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-[#eafff5] rounded-2xl flex items-center justify-center mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </div>
                          <h3 className="text-[17px] font-bold text-[#131a26] font-serif mb-2">All Clear!</h3>
                          <p className="text-[11px] text-gray-500 font-mono max-w-[320px] leading-relaxed">
                            No articles are currently pending in the review queue. New drafts will appear here.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    pendingPosts.map((post, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 pr-4">
                          <div className="flex gap-4">
                            <div className="w-[80px] h-[60px] rounded shrink-0 overflow-hidden bg-gray-100">
                              {post.imageUrl ? (
                                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <h4 className="text-[13px] font-bold text-[#131a26] mb-1 line-clamp-1">{post.title || 'Untitled'}</h4>
                              <p className="text-[11px] text-gray-500 leading-snug line-clamp-2 mb-1.5">
                                {post.cardSummary || extractTextFromHtml(post.content) || 'No summary available...'}
                              </p>
                              <span className="text-[10px] text-gray-400 font-medium">{post.readDuration || '5'} min read</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-8 md:pr-4">
                          <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded whitespace-nowrap inline-block">
                            {post.mainCategory || 'World'}
                          </span>
                        </td>
                        <td className="py-4 text-[13px] text-gray-800 font-medium">
                          {post.authorName || 'Anonymous'}
                        </td>
                        <td className="py-4 text-[13px] text-gray-500">
                          {formatDate(post.date)}
                        </td>
                        <td className="py-4">
                          <span className="bg-yellow-50 text-yellow-600 border border-yellow-200 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                            PENDING
                          </span>
                        </td>
                        <td className="py-4">
                          <button 
                            onClick={() => router.push(`/admin/review-post/${post.id}`)}
                            className="bg-[#e3120b] hover:bg-[#b80f09] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded transition-colors shadow-sm"
                          >
                            OPEN
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </>
          )}

          {activeTab === 'newsletter' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 md:p-6">
              <div className="flex justify-between items-start md:items-center mb-6 gap-2 md:gap-0">
                <div className="flex-1 md:flex-none pr-2 md:pr-0">
                  <h3 className="text-lg font-bold text-[#131a26] mb-1">Newsletter Subscribers</h3>
                  <p className="text-xs text-gray-500">Emails collected from the Newsletter signup page.</p>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
                  {selectedSubs.length > 0 && (
                    <button onClick={handleBulkDeleteNewsletters} className="flex items-center gap-2 border border-red-300 rounded px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      DELETE ({selectedSubs.length})
                    </button>
                  )}
                  <button onClick={handleExportCsv} className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    EXPORT CSV
                  </button>
                  <div className="bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-[11px] font-bold text-gray-500">
                    Total: {newsletterSubs.length}
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto overflow-y-auto max-h-[500px] border border-[#131a26] rounded-xl custom-scrollbar" style={{ padding: '2px' }}>
                <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-6 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[40px]">
                        <input type="checkbox" className="rounded-sm border-gray-300 w-[14px] h-[14px] cursor-pointer" onChange={handleSelectAllSubs} checked={newsletterSubs.length > 0 && selectedSubs.length === newsletterSubs.length} />
                      </th>
                      <th className="py-4 px-6 font-bold text-[10px] uppercase tracking-widest text-gray-500">EMAIL</th>
                      <th className="py-4 px-6 font-bold text-[10px] uppercase tracking-widest text-gray-500">NEWSLETTERS</th>
                      <th className="py-4 px-6 font-bold text-[10px] uppercase tracking-widest text-gray-500 text-right w-[150px]">SUBSCRIBED</th>
                      <th className="py-4 px-6 font-bold text-[10px] uppercase tracking-widest text-gray-500 text-right w-[120px]">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {newsletterSubs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-sm text-gray-500 font-mono">
                          No subscribers found.
                        </td>
                      </tr>
                    ) : (
                      newsletterSubs.map((sub, idx) => {
                        let cats: string[] = [];
                        try {
                          cats = typeof sub.categories === 'string' ? JSON.parse(sub.categories) : sub.categories;
                        } catch (e) {}

                        return (
                          <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-6">
                              <input type="checkbox" className="rounded-sm border-gray-300 w-[14px] h-[14px] cursor-pointer" onChange={() => toggleSubSelection(sub.id)} checked={selectedSubs.includes(sub.id)} />
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <span className="font-serif text-sm font-bold text-[#131a26]">{sub.email}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-2">
                                {cats.map((c: string) => (
                                  <span key={c} className="bg-[#e6f0ff] text-[#0047b3] px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <span className="font-mono text-xs text-gray-500">
                                {new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button 
                                onClick={() => handleRemoveSubscriber(sub.id)}
                                className="flex items-center justify-center gap-1.5 ml-auto border border-[#e3120b] text-[#e3120b] hover:bg-[#e3120b] hover:text-white px-3 py-1.5 rounded text-[10px] font-bold tracking-widest transition-colors"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                REMOVE
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <UsersTab currentUser={user} />
          )}

          {activeTab === 'contactSubmissions' && (
          <ContactSubmissionsTab />
        )}

        {activeTab === 'advertiseLeads' && (
          <AdvertiseLeadsTab />
        )}

        {activeTab === 'manageAds' && (
          <ManageAdsTab />
        )}


        {activeTab === 'databaseBackups' && (
          <DatabaseBackupsTab />
        )}

        {activeTab === 'shortsReels' && (
          <ShortsReelsTab />
        )}

        {/* Published Posts Tab */}
          {activeTab === 'publishedPosts' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 md:p-8">
              <div className="flex justify-between items-start mb-4 gap-4 md:gap-0">
                <div className="flex-1 md:flex-none">
                  <h3 className="text-lg font-bold text-[#131a26] mb-2 whitespace-nowrap md:whitespace-normal">Published Posts</h3>
                  <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
                    This panel grants the Chief Editor absolute authority to inspect engagement metrics and permanently delete/de-list articles from the database.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
                  <button 
                    onClick={() => {
                      const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
                      window.location.href = `http://${hostname}:5000/api/admin/backup-articles`;
                    }}
                    className="flex items-center gap-2 text-[#e3120b] border border-[#e3120b] hover:bg-[#fff5f5] px-3 md:px-4 py-1.5 md:py-2 text-[8px] md:text-xs font-bold rounded transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    BACKUP ARTICLES (ZIP)
                  </button>
                  <div className="bg-gray-50 border border-gray-200 rounded-full px-3 md:px-3 py-1.5 md:py-1.5 text-[7px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Live items: {publishedLiveCount} / {publishedTotalItems}
                  </div>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="flex items-center justify-between bg-gray-50/50 border border-gray-200 rounded-lg p-4 mb-8 overflow-x-auto whitespace-nowrap custom-scrollbar-hide gap-4">
                <div className="flex items-center gap-4 flex-1 shrink-0">
                  <div className="w-48 shrink-0">
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">FILTER BY MAIN CATEGORY</label>
                    <select 
                      value={publishedCategory} 
                      onChange={(e) => { setPublishedCategory(e.target.value); setPublishedPage(1); }}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                    >
                      <option value="">All Categories</option>
                      <option value="World">World</option>
                      <option value="United States">United States</option>
                      <option value="China">China</option>
                      <option value="Europe">Europe</option>
                      <option value="Britain">Britain</option>
                      <option value="Middle East">Middle East</option>
                      <option value="Africa">Africa</option>
                      <option value="Asia">Asia</option>
                      <option value="Finance & Economics">Finance & Economics</option>
                      <option value="Politics">Politics</option>
                      <option value="Technology">Technology</option>
                      <option value="Industries">Industries</option>
                      <option value="Business">Business</option>
                      <option value="Opinions">Opinions</option>
                      <option value="Cost of Living">Cost of Living</option>
                      <option value="Stock Markets">Stock Markets</option>
                      <option value="Cryptocurrency">Cryptocurrency</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Elections">Elections</option>
                      <option value="The White House">The White House</option>
                      <option value="Congress">Congress</option>
                      <option value="International Relations">International Relations</option>
                      <option value="Human Rights">Human Rights</option>
                      <option value="Law & Justice">Law & Justice</option>
                      <option value="Artificial intelligence">Artificial intelligence</option>
                      <option value="Innovations">Innovations</option>
                      <option value="Banking">Banking</option>
                      <option value="Investment">Investment</option>
                      <option value="Energy">Energy</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Tourism & Hospitality">Tourism & Hospitality</option>
                      <option value="Culture">Culture</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div className="w-48 shrink-0">
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">FILTER BY PLACEMENT</label>
                    <select 
                      value={publishedPlacement}
                      onChange={(e) => { setPublishedPlacement(e.target.value); setPublishedPage(1); }}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                    >
                      <option value="">All Placements</option>
                      <option value="None(Category Only)">None(Category Only)</option>
                      <option value="Home Page A + Section">Home Page A + Section</option>
                      <option value="Top Highlight Section">Top Highlight Section</option>
                      <option value="Latest News Section">Latest News Section</option>
                      <option value="More News Section">More News Section</option>
                      <option value="Most Readed Article Section">Most Readed Article Section</option>
                      <option value="Trending Stories Section">Trending Stories Section</option>
                      <option value="Data That Tells Stories  Section">Data That Tells Stories  Section</option>
                    </select>
                  </div>
                  <div className="flex-1 max-w-sm shrink-0 min-w-[200px]">
                    <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">SEARCH ARTICLES</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={publishedSearch}
                        onChange={(e) => { setPublishedSearch(e.target.value); setPublishedPage(1); }}
                        placeholder="Search title, author..." 
                        className="w-full border border-gray-200 rounded pl-3 pr-8 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 ml-4 flex gap-2">
                  <button 
                    onClick={() => { setPublishedSortByViews(!publishedSortByViews); setPublishedPage(1); }}
                    className={`text-xs font-bold px-4 py-2 rounded transition-colors whitespace-nowrap shadow-sm border ${publishedSortByViews ? 'text-white bg-[#1a65d6] border-[#1a65d6]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-gray-300'}`}
                  >
                    View Count
                  </button>
                  <button 
                    onClick={() => { setPublishedSearch(''); setPublishedCategory(''); setPublishedPlacement(''); setPublishedSortByViews(false); setPublishedPage(1); }}
                    className="text-xs font-bold text-[#1a65d6] hover:text-white hover:bg-[#1a65d6] border border-[#1a65d6] px-4 py-2 rounded transition-colors whitespace-nowrap shadow-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
                  <thead>
                    <tr className="border-b border-gray-200 bg-white">
                      <th className="py-4 px-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 w-[50%]">ARTICLE DETAILS</th>
                      <th className="py-4 px-4 font-bold text-[10px] uppercase tracking-widest text-gray-500">CATEGORY</th>
                      <th className="py-4 px-4 font-bold text-[10px] uppercase tracking-widest text-gray-500">AUTHOR</th>
                      <th className="py-4 px-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 text-center">METRICS DESK</th>
                      <th className="py-4 px-4 font-bold text-[10px] uppercase tracking-widest text-gray-500 text-right">DELETE / EDIT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {publishedPosts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-sm text-gray-500 font-mono">No published posts found.</td>
                      </tr>
                    ) : (
                      publishedPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="py-4 px-4">
                            <div className="flex gap-4 items-start">
                              <img 
                                src={post.imageUrl || 'https://via.placeholder.com/60'} 
                                alt="" 
                                className="w-[60px] h-[60px] object-cover rounded-md flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="font-bold text-sm text-[#131a26] line-clamp-1 hover:text-[#e3120b] transition-colors cursor-pointer">{post.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{post.cardSummary || post.subtitle || post.content?.substring(0, 150).replace(/<[^>]+>/g, '') + '...'}</p>
                                <span className="text-[10px] font-bold text-gray-400 mt-1 block">{post.readDuration || 5} min read</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block bg-gray-100 px-2.5 py-1 text-[9px] font-bold text-gray-600 rounded uppercase tracking-widest">
                              {post.mainCategory || 'Uncategorized'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                            {post.authorName}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-xs font-bold text-gray-800">{post.views || 0} Views</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => router.push(`/admin/review-post/${post.id}`)} className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-100 rounded transition-colors" title="Edit Article">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                              </button>
                              <button onClick={() => handleDeletePublishedPost(post.id)} className="p-1.5 text-red-500 hover:bg-red-50 border border-red-100 rounded transition-colors" title="Delete Article">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {publishedTotalPages > 1 && (
                <div className="flex items-center justify-between mt-8 border-t border-gray-100 pt-6">
                  <button 
                    onClick={() => setPublishedPage(p => Math.max(1, p - 1))}
                    disabled={publishedPage === 1}
                    className="text-xs font-bold text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Previous
                  </button>
                  <span className="text-xs font-medium text-gray-400">
                    Page {publishedPage} of {publishedTotalPages}
                  </span>
                  <button 
                    onClick={() => setPublishedPage(p => Math.min(publishedTotalPages, p + 1))}
                    disabled={publishedPage === publishedTotalPages}
                    className="text-xs font-bold text-gray-700 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                  >
                    Next
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-xl w-full max-w-[500px] overflow-hidden shadow-2xl relative">
            <div className="h-1 w-full bg-[#c11010]"></div>
            
            <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (user && user.id) {
                try {
                  const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: profileData.fullName,
                      bio: profileData.bio,
                      profile_picture: profileData.photo,
                      linkedin_url: profileData.linkedin
                    })
                  });
                  if (res.ok) {
                    const updatedUser = { 
                      ...user, 
                      name: profileData.fullName, 
                      bio: profileData.bio, 
                      profile_picture: profileData.photo, 
                      linkedin_url: profileData.linkedin 
                    };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    localStorage.setItem(`userProfile_${user.email}`, JSON.stringify(profileData));
                    localStorage.setItem('userProfile', JSON.stringify(profileData));
                  }
                } catch (err) {
                  console.error('Failed to save profile to database', err);
                }
              }
              showToast('Profile Settings saved successfully');
              setIsSettingsOpen(false);
            }}>
              <div className="p-8 pb-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Profile Settings</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Manage Your Account</p>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 relative">
                    <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/profile-mishal.jpg'; }} />
                    <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-10 pointer-events-none"></div>
                  </div>
                  <div>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-[#1a65d6] hover:underline mb-1">Change photo</button>
                    <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
                    <p className="text-xs text-gray-500 mb-2">{user?.email || 'mishalzuhrie@gmail.com'}</p>
                    <span className="inline-block bg-[#eef5ff] text-[#1a65d6] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Admin</span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" value={profileData.fullName} onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Bio</label>
                    <textarea value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] resize-none"></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">LinkedIn Profile</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a65d6] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </div>
                      <input type="text" value={profileData.linkedin} onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})} placeholder="https://www.linkedin.com/in/your-profile" className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">Shown on your article bylines so readers can connect with you.</p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between gap-4">
                <button type="button" onClick={() => setIsSettingsOpen(false)} className="flex-1 py-2.5 border border-gray-300 rounded font-bold text-[13px] text-gray-700 hover:bg-gray-50 transition-colors">CANCEL</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#00508f] hover:bg-blue-900 rounded font-bold text-[13px] text-white transition-colors">SAVE CHANGES</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
