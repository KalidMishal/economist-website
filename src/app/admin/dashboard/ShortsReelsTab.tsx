"use client";

import React, { useState, useEffect } from 'react';

interface ShortReel {
  id: number;
  slot_number: number;
  platform: string;
  video_url: string;
  title: string;
  thumbnail_url: string;
  duration: string;
  status: string;
}

export default function ShortsReelsTab() {
  const [shorts, setShorts] = useState<ShortReel[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [slotNumber, setSlotNumber] = useState<number>(1);
  const [platform, setPlatform] = useState('YouTube Shorts');
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('Active');
  
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchShorts();
  }, []);

  const fetchShorts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/shorts-reels');
      const data = await res.json();
      if (data.success) {
        setShorts(data.shorts);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load shorts');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFetch = async (urlToFetch?: string | React.MouseEvent, detectedPlatform?: string) => {
    const targetUrl = typeof urlToFetch === 'string' ? urlToFetch : videoUrl;
    if (!targetUrl) {
      alert('Please enter a Video URL first');
      return;
    }
    setIsFetchingMeta(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/fetch-video-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });
      const data = await res.json();
      if (data.success) {
        if (data.title && data.title !== 'Video Title') setTitle(data.title);
        if (data.thumbnail_url) setThumbnailUrl(data.thumbnail_url);
        if (data.duration) setDuration(data.duration);
        // Only show alert if it was a manual click (React.MouseEvent)
        if (typeof urlToFetch !== 'string') {
          alert('Metadata fetched successfully!');
        }
      } else {
        if (typeof urlToFetch !== 'string') alert('Failed to fetch metadata');
      }
    } catch (err) {
      console.error(err);
      if (typeof urlToFetch !== 'string') alert('Error fetching metadata');
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);
    
    let detectedPlatform = platform;
    let validDetection = false;
    
    if (newUrl.includes('youtube.com/') || newUrl.includes('youtu.be/')) {
      detectedPlatform = 'YouTube Shorts';
      validDetection = true;
    } else if (newUrl.includes('instagram.com/')) {
      detectedPlatform = 'Instagram Reel';
      validDetection = true;
    } else if (newUrl.includes('facebook.com/') || newUrl.includes('fb.watch/')) {
      detectedPlatform = 'Facebook Reel';
      validDetection = true;
    } else if (newUrl.includes('rumble.com/')) {
      detectedPlatform = 'Rumble Video';
      validDetection = true;
    }
    
    if (validDetection) {
      setPlatform(detectedPlatform);
      // Auto-trigger fetch silently
      handleAutoFetch(newUrl, detectedPlatform);
    }
  };


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    alert('Converting and uploading thumbnail...');
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
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
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const formData = new FormData();
          formData.append('folder', 'shorts');
          formData.append('file', blob, file.name.replace(/\.[^/.]+$/, "") + ".webp");
          
          try {
            const res = await fetch('http://localhost:5000/api/upload', {
              method: 'POST',
              body: formData,
            });
            const data = await res.json();
            if (data.success) {
              setThumbnailUrl(data.url);
              alert('Upload successful');
            } else {
              alert('Upload failed: ' + data.message);
            }
          } catch (err) {
            console.error(err);
            alert('Error uploading file');
          }
        }, 'image/webp', 0.8);
      };
      if (event.target && event.target.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl || !title || !thumbnailUrl) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('http://localhost:5000/api/admin/shorts-reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot_number: slotNumber,
          platform,
          video_url: videoUrl,
          title,
          thumbnail_url: thumbnailUrl,
          duration,
          status
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Saved successfully');
        fetchShorts();
        resetForm();
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      alert('Error saving short');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slotToDelete: number) => {
    if (!window.confirm(`Are you sure you want to delete Slot #${slotToDelete}?`)) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/admin/shorts-reels/${slotToDelete}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert('Deleted successfully');
        fetchShorts();
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Error deleting');
    }
  };

  const handleEdit = (slotInfo: ShortReel) => {
    setSlotNumber(slotInfo.slot_number);
    setPlatform(slotInfo.platform);
    setVideoUrl(slotInfo.video_url);
    setTitle(slotInfo.title);
    setThumbnailUrl(slotInfo.thumbnail_url);
    setDuration(slotInfo.duration);
    setStatus(slotInfo.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setVideoUrl('');
    setTitle('');
    setThumbnailUrl('');
    setDuration('');
    // keep slotNumber, platform, status to defaults or what they were
  };

  const getSlotOptions = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      const existing = shorts.find(s => s.slot_number === i);
      let label = `Slot #${i}`;
      if (existing) {
        label += ` (Occupied: "${existing.title.substring(0, 20)}${existing.title.length > 20 ? '...' : ''}")`;
      } else {
        label += ` (Available / Empty)`;
      }
      options.push({ value: i, label });
    }
    return options;
  };

  if (loading) return <div className="p-4">Loading Shorts & Reels...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <span className="text-xl">📱</span> Manage Shorts & Reels
      </h2>
      <p className="text-gray-600 mb-6">Curate short-form video stories from YouTube Shorts, Rumble, Instagram Reels, and Facebook Reels.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* Form Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-[#e3120b]">Add New Short / Reel Video</h3>
          <p className="text-sm text-gray-500 border-b pb-4 mb-4">Paste any YouTube, Rumble, Instagram, or Facebook link — platform and thumbnails are detected automatically.</p>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (Supports YouTube Shorts, Rumble videos, Instagram Reels, and Facebook Reels.)</label>
              <input type="text" value={videoUrl} onChange={handleUrlChange} className="w-full border p-2 rounded focus:ring-[#e3120b] focus:border-[#e3120b] transition-colors" placeholder="https://..." required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full border p-2 rounded">
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="Rumble Video">Rumble Video</option>
                <option value="Instagram Reel">Instagram Reel</option>
                <option value="Facebook Reel">Facebook Reel</option>
              </select>
            </div>
            
            <button type="button" onClick={handleAutoFetch} disabled={isFetchingMeta} className="w-fit bg-[#e3120b] hover:bg-[#c10f09] text-white py-2 px-4 rounded font-medium transition-colors text-sm">
              {isFetchingMeta ? 'Fetching...' : '⚡ Auto-Fetch Title, Image & Duration'}
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Title / Headline</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image / Thumbnail URL</label>
              <div className="flex gap-2">
                <input type="text" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="flex-1 border p-2 rounded" placeholder="https://..." required />
                <label className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer transition-colors flex items-center">
                  Upload
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Optional)</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border p-2 rounded" placeholder="e.g. 0:45" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Slot (1 to 10)</label>
              <select value={slotNumber} onChange={(e) => setSlotNumber(Number(e.target.value))} className="w-full border p-2 rounded border-[#e3120b] bg-red-50">
                {getSlotOptions().map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Warning: Assigning to an occupied slot will REPLACE the existing video.</p>
            </div>

            <button type="submit" disabled={isSaving} className="w-fit bg-[#e3120b] hover:bg-[#c10f09] text-white py-3 px-8 rounded-lg font-bold text-lg transition-colors mt-2">
              {isSaving ? 'Saving...' : 'SAVE & ASSIGN VIDEO'}
            </button>
          </form>
        </div>

        {/* Live Preview Section */}
        <div className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">LIVE PREVIEW</div>
          
          <div className="w-[200px] h-[350px] bg-black rounded-xl border-4 border-gray-800 overflow-hidden relative shadow-2xl mt-4">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">No Image</div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{platform}</span>
              <h4 className="font-bold text-sm mt-1 leading-tight line-clamp-3">{title || 'Video Title Goes Here'}</h4>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm pointer-events-none">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid Management Section */}
      <h3 className="text-xl font-bold mb-6 border-b pb-2">Current Shorts & Reels (10 Dedicated Slots)</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(slotNum => {
          const item = shorts.find(s => s.slot_number === slotNum);
          
          return (
            <div key={slotNum} className={`border rounded-lg overflow-hidden flex flex-col ${item && item.status === 'Inactive' ? 'opacity-60 grayscale' : ''} ${!item ? 'border-dashed border-gray-300 bg-gray-50' : 'border-gray-200 bg-white'}`}>
              {/* Header */}
              <div className="bg-gray-100 p-2 text-center border-b font-bold text-sm text-gray-700">
                SLOT #{slotNum}
              </div>
              
              {item ? (
                <>
                  <div className="relative aspect-[9/16] bg-black group">
                    <img src={item.thumbnail_url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {item.platform}
                    </div>
                    {item.status === 'Inactive' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">INACTIVE</span>
                      </div>
                    )}
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded hover:bg-gray-200">
                        EDIT
                      </button>
                      <button onClick={() => handleDelete(slotNum)} className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-red-700">
                        DEL
                      </button>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h4 className="text-sm font-semibold line-clamp-2 leading-tight flex-1" title={item.title}>{item.title}</h4>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center aspect-[9/16] text-gray-400 p-4 text-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => { setSlotNumber(slotNum); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <span className="text-4xl mb-2">+</span>
                  <p className="text-sm font-medium">Assign Slot #{slotNum}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
