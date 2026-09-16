'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const categoryMapping: Record<string, string> = {
  "United States": "World",
  "China": "World",
  "Europe": "World",
  "Britain": "World",
  "Middle East": "World",
  "Africa": "World",
  "Asia": "World",
  "Business": "Finance & Economics",
  "Opinions": "Finance & Economics",
  "Cost of Living": "Finance & Economics",
  "Stock Markets": "Finance & Economics",
  "Cryptocurrency": "Finance & Economics",
  "Leadership": "Finance & Economics",
  "Elections": "Politics",
  "The White House": "Politics",
  "Congress": "Politics",
  "International Relations": "Politics",
  "Human Rights": "Politics",
  "Law & Justice": "Politics",
  "Artificial intelligence": "Technology",
  "Innovations": "Technology",
  "Banking": "Technology",
  "Investment": "Technology",
  "Energy": "Industries",
  "Real Estate": "Industries",
  "Agriculture": "Industries",
  "Healthcare": "Industries",
  "Entertainment": "Industries",
  "Tourism & Hospitality": "Industries",
  "Culture": "Industries",
  "Sports": "Industries"
};

export default function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [author, setAuthor] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [adsMap, setAdsMap] = useState<Record<string, any>>({});

  useEffect(() => {
    // Attempt to parse ID from slug (it could be id or name-slug, but we rely on the API to match ID or we need to lookup by name. Let's assume params.id is the numeric ID since we linked to /author/[id])
    const fetchAuthorData = async () => {
      setLoading(true);
      try {
        // Fetch profile
        const userRes = await fetch(`http://localhost:5000/api/users/${id}`);
        const userData = await userRes.json();
        
        if (userData.success && userData.user) {
          setAuthor(userData.user);
          
          // Fetch their published posts
          const postsRes = await fetch(`http://localhost:5000/api/author/${id}/posts?page=${page}&limit=10`, { cache: "no-store" });
          const postsData = await postsRes.json();
          if (postsData.success) {
            setPosts(postsData.posts);
            setTotalPages(postsData.pagination.totalPages);
          }
          
          const topRes = await fetch(`http://localhost:5000/api/author/${id}/top-posts?limit=5`, { cache: "no-store" });
          const topData = await topRes.json();
          if (topData.success) {
            setTopPosts(topData.posts);
          }

          try {
            const adsRes = await fetch('http://localhost:5000/api/ads/active');
            if (adsRes.ok) {
              const adsData = await adsRes.json();
              const map: Record<string, any> = {};
              adsData.forEach((ad: any) => map[ad.slot_id] = ad);
              setAdsMap(map);
            }
          } catch (e) {
            console.error('Failed to fetch ads', e);
          }
        } else {
          setError('Author not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load author data');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id, page]);

  // Extract text safely
  const extractTextFromHtml = (html: string) => {
    if (typeof window === 'undefined') return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove figure tags
    const figures = tempDiv.querySelectorAll('figure');
    figures.forEach(fig => fig.remove());
    
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const getAdHref = (ad: any) => {
    if (!ad) return null;
    if (ad.target_type === 'internal' && ad.internal_article_id) {
      return `/article/${ad.internal_article_slug || ad.internal_article_id}`;
    }
    return ad.target_url || null;
  };

  if (loading && !author) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 flex justify-center">
          <div className="w-8 h-8 border-4 border-[#00508f] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 text-center">
          <h1 className="text-3xl font-serif text-gray-900 mb-4">{error || 'Author not found'}</h1>
          <Link href="/" className="text-[#1a65d6] hover:underline font-bold">Return Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0f0f0f] font-sans selection:bg-[#c9e1f5] selection:text-[#0f0f0f]">
      <Header />
      
      <main className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-8 pb-20">
        <div className="mb-8">
          <button onClick={() => window.history.back()} className="text-[13px] font-bold text-[#1a65d6] hover:underline flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Go Back
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 border-b border-gray-200 pb-12">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100 shrink-0">
            {author.profile_picture ? (
              <img src={author.profile_picture} alt={author.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
            ) : null}
            <div className={`w-full h-full flex items-center justify-center text-4xl font-bold text-[#003a6a] ${author.profile_picture ? 'hidden' : ''}`}>
              {author.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{author.name}</h1>
            <span className="text-[#E3120B] text-[13px] font-bold uppercase tracking-widest mb-4 inline-block">Writer</span>
            {author.bio && (
              <p className="text-[15px] text-gray-600 max-w-3xl leading-relaxed">
                {author.bio}
              </p>
            )}

          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column (Articles) */}
          <div className="w-full lg:w-[65%]">
            <h2 className="text-[18px] font-bold font-sans tracking-wide uppercase text-gray-900 mb-8 pb-4 border-b-2 border-black block">
              More from {author.name}
            </h2>
            
            {posts.length === 0 && !loading && (
              <p className="text-gray-500 italic">No published articles yet.</p>
            )}

            <div className="flex flex-col gap-8">
              {posts.map(post => {
                let parsedArr = [];
                if (typeof post.sub_categories === 'string') {
                  try { parsedArr = JSON.parse(post.sub_categories); } catch(e){}
                } else if (Array.isArray(post.sub_categories)) {
                  parsedArr = post.sub_categories;
                }
                let firstSubCat = post.main_category || post.mainCategory || 'Uncategorized';
                if (parsedArr.length > 0) {
                  firstSubCat = parsedArr[0];
                }
                const displayParent = categoryMapping[firstSubCat] || firstSubCat;
                const dateObj = new Date(post.updated_at || post.created_at);
                const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const summary = extractTextFromHtml(post.cardSummary || post.content || "");
                
                return (
                  <div key={post.id} className="group flex flex-col sm:flex-row items-start gap-5 border-b border-gray-200 pb-8 last:border-0 cursor-pointer" onClick={() => { window.location.href = `/article/${post?.slug || post?.id}`; }}>
                    <div className="w-full sm:w-[280px] aspect-[1.5] shrink-0 overflow-hidden relative">
                      <img src={post.imageUrl || '/imgi_581_20260718_LDD002_FH.jpg'} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex flex-col flex-1 h-full py-1">
                      <div className="text-[11px] font-bold uppercase tracking-widest mb-2">
                        <Link
                          href={`/category/${displayParent.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-[#E3120B] hover:underline cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >{displayParent}</Link>
                        {firstSubCat && (
                          <>
                            <span className="text-[#0f0f0f] mx-1.5 font-normal">|</span>
                            <Link
                              href={`/category/${firstSubCat.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-[#0f0f0f] hover:underline hover:text-[#00508f] cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >{firstSubCat}</Link>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#003a6a] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      {summary && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {summary}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-2 flex items-center justify-between text-xs text-gray-500 font-bold tracking-wide uppercase w-full">
                        <div className="flex items-center">
                          <span>By {author.name}</span>
                          <span className="mx-2">•</span>
                          <span>{formattedDate}</span>
                        </div>
                        <span className="text-[#0f0f0f]">{post.views || 0} views</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                  <button 
                    onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={page === 1}
                    className={`px-6 py-2.5 border border-gray-300 rounded font-bold text-[13px] transition-colors flex items-center gap-2 ${page === 1 ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-800 hover:bg-gray-50 hover:text-[#1a65d6]'}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    PREVIOUS
                  </button>
                  <span className="text-[13px] font-bold text-gray-500 tracking-widest">
                    PAGE {page} OF {totalPages}
                  </span>
                  <button 
                    onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={page === totalPages}
                    className={`px-6 py-2.5 border border-gray-300 rounded font-bold text-[13px] transition-colors flex items-center gap-2 ${page === totalPages ? 'text-gray-400 cursor-not-allowed bg-gray-50' : 'text-gray-800 hover:bg-gray-50 hover:text-[#1a65d6]'}`}
                  >
                  NEXT
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          {/* Right Column (Most Read) */}
          <div className="hidden lg:block w-[35%] pl-10">
            <div className="bg-white border border-[#e6e6e6] shadow-sm p-6 w-full">
              <h2 className="text-[14px] font-bold font-sans uppercase tracking-widest text-black mb-6 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E3120B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                Most Read
              </h2>
              <div className="flex flex-col">
                {topPosts.length > 0 ? topPosts.map((post, idx) => (
                  <Link key={post.id} href={`/article/${post?.slug || post?.id}`} className="group flex flex-row items-start gap-4 border-b border-[#e6e6e6] py-5 first:pt-0 last:border-0 last:pb-0">
                    <div className="text-[28px] font-bold font-serif text-[#E3120B] leading-none mt-1 shrink-0 opacity-80">{idx + 1}</div>
                    <div className="flex flex-col">
                      <h4 className="text-[15px] font-serif font-bold text-[#0f0f0f] leading-snug group-hover:text-[#E3120B] transition-all line-clamp-3 break-words mb-2">
                        {post.title}
                      </h4>
                      <span className="text-[11px] font-sans text-gray-500 font-bold uppercase tracking-widest">{post.views || 0} views</span>
                    </div>
                  </Link>
                )) : (
                  <p className="text-sm text-gray-500 italic">No views yet.</p>
                )}
              </div>
            </div>

            {/* Ad Banner */}
            <div className="mt-8 flex flex-col items-center w-full">
              <span className="text-[10px] text-[#999] uppercase tracking-widest mb-2 font-sans">Advertisement</span>
              {adsMap.author_sidebar_1 ? (
                getAdHref(adsMap.author_sidebar_1) ? (
                  <a href={getAdHref(adsMap.author_sidebar_1)} target="_blank" className="w-full h-[660px] relative overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer hover:opacity-95 transition-opacity block">
                    <img src={adsMap.author_sidebar_1.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                  </a>
                ) : (
                  <div className="w-full h-[660px] relative overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={adsMap.author_sidebar_1.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                  </div>
                )
              ) : (
                <div className="w-full h-[660px] relative overflow-hidden bg-gray-50 flex-shrink-0 border border-[#e6e6e6] flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Advertisement</span>
                </div>
              )}
            </div>

          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
