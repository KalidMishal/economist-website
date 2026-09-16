import React, { useState, useEffect } from 'react';

interface AdSlot {
  id: number;
  slot_id: string;
  slot_name: string;
  dimensions: string;
  description: string;
  group_name: string;
  is_active: boolean;
  image_url: string | null;
  target_type: 'external' | 'internal';
  target_url: string | null;
  internal_article_id: number | null;
}

export default function ManageAdsTab() {
  const [ads, setAds] = useState<AdSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishedArticles, setPublishedArticles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('homepage');

  useEffect(() => {
    fetchAds();
    fetchPublishedArticles();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ads');
      if (res.ok) {
        const data = await res.json();
        setAds(data);
      }
    } catch (error) {
      console.error('Error fetching ads', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPublishedArticles = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/published-posts?limit=100');
      if (res.ok) {
        const data = await res.json();
        setPublishedArticles(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching published posts', error);
    }
  };

  const handleUpdateField = (slotId: string, field: string, value: any) => {
    setAds(prev => prev.map(ad => ad.slot_id === slotId ? { ...ad, [field]: value } : ad));
  };

  const handleImageUpload = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/gif') {
        // Upload GIF directly to B2
        const formData = new FormData();
        formData.append('folder', 'ads');
            formData.append('file', file, file.name);
        
        fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              handleUpdateField(slotId, 'image_url', data.url);
            } else {
              alert('Upload failed: ' + data.message);
            }
          })
          .catch(err => {
            console.error('Upload error', err);
            alert('Network error during upload');
          });
      } else {
        // Convert static images to WebP then upload to B2
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(async (blob) => {
                if (!blob) return;
                const formData = new FormData();
                formData.append('folder', 'ads');
            formData.append('file', blob, file.name.replace(/\.[^/.]+$/, "") + ".webp");
                
                try {
                  const res = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData
                  });
                  const data = await res.json();
                  if (data.success) {
                    handleUpdateField(slotId, 'image_url', data.url);
                  } else {
                    alert('Upload failed: ' + data.message);
                  }
                } catch (err) {
                  console.error('Upload error', err);
                  alert('Network error during upload');
                }
              }, 'image/webp', 0.85);
            }
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSaveConfig = async (slot: AdSlot) => {
    try {
      const res = await fetch(`http://localhost:5000/api/ads/${slot.slot_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_active: slot.is_active,
          image_url: slot.image_url,
          target_type: slot.target_type,
          target_url: slot.target_url,
          internal_article_id: slot.internal_article_id
        })
      });
      if (res.ok) {
        alert('Ad config saved successfully!');
      } else {
        alert('Failed to save ad config.');
      }
    } catch (error) {
      console.error('Error saving ad', error);
      alert('Error saving ad config.');
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading ads configuration...</div>;

  const homepageSlots = ads.filter(ad => ad.group_name === 'Homepage');
  const categorySlots = ads.filter(ad => ad.group_name === 'Category');
  const detailsSlots = ads.filter(ad => ad.group_name === 'Details');
  const authorSlots = ads.filter(ad => ad.group_name === 'Author Page');

  return (
    <div className="flex-1 min-h-screen">
      <div className="bg-white px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-[#131a26]">Manage Ads</h1>
          <p className="text-gray-500 text-[15px] mt-1">Configure customized advertisement graphics or promote internal articles in predefined slots.</p>
        </div>
      </div>

      <div className="px-8 mt-6">
        <div className="flex space-x-4 md:space-x-8 border-b border-gray-200 overflow-x-auto whitespace-nowrap flex-nowrap custom-scrollbar-hide">
          <button 
            className={`shrink-0 pb-4 text-[14.5px] font-extrabold tracking-wider uppercase ${activeTab === 'all' ? 'text-[#e3120b] border-b-2 border-[#e3120b]' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('all')}
          >
            ALL AD SLOTS ({ads.length})
          </button>
          <button 
            className={`shrink-0 pb-4 text-[14.5px] font-extrabold tracking-wider uppercase ${activeTab === 'homepage' ? 'text-[#e3120b] border-b-2 border-[#e3120b]' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('homepage')}
          >
            HOMEPAGE SLOTS ({homepageSlots.length})
          </button>
          <button 
            className={`shrink-0 pb-4 text-[14.5px] font-extrabold tracking-wider uppercase ${activeTab === 'category' ? 'text-[#e3120b] border-b-2 border-[#e3120b]' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('category')}
          >
            CATEGORY PAGE SLOTS ({categorySlots.length})
          </button>
          <button 
            className={`shrink-0 pb-4 text-[14.5px] font-extrabold tracking-wider uppercase ${activeTab === 'details' ? 'text-[#e3120b] border-b-2 border-[#e3120b]' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('details')}
          >
            DETAILS PAGE SLOTS ({detailsSlots.length})
          </button>
          <button 
            className={`shrink-0 pb-4 text-[14.5px] font-extrabold tracking-wider uppercase ${activeTab === 'author' ? 'text-[#e3120b] border-b-2 border-[#e3120b]' : 'text-gray-500 hover:text-gray-900'}`}
            onClick={() => setActiveTab('author')}
          >
            AUTHOR SLOTS ({authorSlots.length})
          </button>
        </div>

        <div className="py-8 space-y-8">
          {(activeTab === 'homepage' ? homepageSlots : activeTab === 'category' ? categorySlots : activeTab === 'details' ? detailsSlots : activeTab === 'author' ? authorSlots : ads).map(slot => (
            <div key={slot.id} className="bg-white border border-gray-200 rounded-xl p-8 relative shadow-sm">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2 gap-2 md:gap-0">
                  <div className="flex-1 md:flex-none pr-4 md:pr-0 min-w-0">
                  <div className="text-[#e3120b] text-[11px] font-bold tracking-widest uppercase mb-2">SLOT DIMENSIONS: {slot.dimensions}</div>
                    <h3 className="text-xl font-bold text-gray-900 whitespace-nowrap md:whitespace-normal">{slot.slot_name}</h3>

                </div>
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                  <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">ACTIVE</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={slot.is_active} 
                      onChange={(e) => handleUpdateField(slot.slot_id, 'is_active', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e3120b]"></div>
                  </label>
                </div>
                </div>
                <p className="text-gray-500 text-sm mt-1">{slot.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Image Section */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div className={slot.image_url ? "bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden w-fit mx-auto" : "bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden w-full"} style={{ minHeight: '180px' }}>
                    {slot.image_url ? (
                      <img src={slot.image_url} alt="Banner Preview" className="max-w-full max-h-[180px] object-contain" />
                    ) : (
                      <span className="text-gray-400 text-sm">No image uploaded</span>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">UPLOAD BANNER IMAGE</label>
                    <input 
                      type="file" 
                      accept="image/*,.gif" 
                      onChange={(e) => handleImageUpload(slot.slot_id, e)} 
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                  </div>
                </div>

                {/* Settings Section */}
                <div className="md:col-span-7 flex flex-col justify-between min-w-0 overflow-hidden">
                  <div className="space-y-6 mt-4 min-w-0">
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">TARGET ACTION TYPE</label>
                      <select 
                        value={slot.target_type} 
                        onChange={(e) => handleUpdateField(slot.slot_id, 'target_type', e.target.value)}
                        className="w-full max-w-[calc(100vw-6rem)] md:max-w-full h-[46px] rounded-lg border-gray-200 bg-gray-50 px-4 text-sm focus:border-gray-300 focus:ring-0 outline-none truncate"
                      >
                        <option value="external">External Link (URL)</option>
                        <option value="internal">Internal Promoted Article</option>
                      </select>
                    </div>

                    <div>
                      {slot.target_type === 'external' ? (
                        <>
                          <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">TARGET LINK URL</label>
                          <input 
                            type="text" 
                            placeholder="https://..."
                            value={slot.target_url || ''} 
                            onChange={(e) => handleUpdateField(slot.slot_id, 'target_url', e.target.value)}
                            className="w-full max-w-[calc(100vw-6rem)] md:max-w-full h-[46px] rounded-lg border-gray-200 bg-gray-50 px-4 text-sm focus:border-gray-300 focus:ring-0 outline-none truncate"
                          />
                        </>
                      ) : (
                        <>
                          <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">-- CHOOSE PUBLISHED ARTICLE --</label>
                          <div className="w-full overflow-x-auto custom-scrollbar-hide pb-1">
                          <select 
                            value={slot.internal_article_id || ''} 
                            onChange={(e) => handleUpdateField(slot.slot_id, 'internal_article_id', parseInt(e.target.value))}
                            className="w-max min-w-full md:w-full h-[46px] rounded-lg border-gray-200 bg-gray-50 px-4 text-sm focus:border-gray-300 focus:ring-0 outline-none"
                          >
                            <option value="">Select an article</option>
                            {publishedArticles.map(article => (
                              <option key={article.id} value={article.id}>{article.title?.length > 45 ? article.title.substring(0, 45) + "..." : article.title}</option>
                            ))}
                          </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-end items-stretch md:items-center gap-4 mt-8">
                    <button 
                      onClick={() => handleUpdateField(slot.slot_id, 'image_url', null)}
                      className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      CLEAR IMAGE
                    </button>
                    <button 
                      onClick={() => handleSaveConfig(slot)}
                      className="px-6 py-2.5 bg-[#e3120b] hover:bg-[#c8100a] text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      SAVE AD CONFIG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
