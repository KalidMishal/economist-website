'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ReaderProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: (newProfile: any) => void;
}

export default function ReaderProfileSettingsModal({ isOpen, onClose, onProfileUpdate }: ReaderProfileSettingsModalProps) {
  const router = useRouter();
  const [user, setUser] = useState<{name: string, email: string, role: string} | null>(null);
  const [profileData, setProfileData] = useState({
    fullName: '',
    bio: '',
    linkedin: '',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg'
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      const storedProfile = localStorage.getItem(`userProfile_${parsedUser.email}`) || localStorage.getItem('userProfile');
      if (storedProfile) {
        try { 
          setProfileData(JSON.parse(storedProfile)); 
        } catch(e) {}
      } else {
        setProfileData(prev => ({ ...prev, fullName: parsedUser.name || 'Mishal Zuhrie' }));
      }
    }
  }, [isOpen]);

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

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (user) {
      localStorage.setItem(`userProfile_${user.email}`, JSON.stringify(profileData));
    }
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    onProfileUpdate(profileData);
    handleClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4 transition-all">
      <div className="bg-white rounded-xl w-full max-w-[500px] overflow-hidden shadow-2xl relative border border-gray-200">
        <div className="h-1 w-full bg-[#c11010]"></div>
        
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-8 pb-6">
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Profile Settings</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Manage Your Account</p>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded overflow-hidden bg-gray-200 shadow-sm border border-gray-100">
              <img 
                src={profileData.photo} 
                alt="Profile" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://randomuser.me/api/portraits/men/32.jpg'; }} 
              />
            </div>
            <div>
              <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-[#1a65d6] hover:underline mb-1">Change photo</button>
              <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
              <p className="text-xs text-gray-500 mb-2">{user.email || 'mishalzuhrie@gmail.com'}</p>
              <span className="inline-block bg-[#eef5ff] text-[#1a65d6] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                {user.role === 'writer' ? 'Writer' : 'Reader'}
              </span>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                value={profileData.fullName} 
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" 
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Bio</label>
              <textarea 
                value={profileData.bio} 
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})} 
                rows={3} 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] resize-none"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">LinkedIn Profile</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a65d6] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  value={profileData.linkedin} 
                  onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})} 
                  placeholder="https://www.linkedin.com/in/your-profile" 
                  className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" 
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-2">Connect your professional network.</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between gap-4 bg-gray-50">
          <button onClick={handleClose} className="flex-1 py-2.5 border border-gray-300 rounded font-bold text-[13px] text-gray-700 hover:bg-gray-100 transition-colors text-center">
            CANCEL
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-[#00508f] hover:bg-blue-900 rounded font-bold text-[13px] text-white transition-colors">
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}
