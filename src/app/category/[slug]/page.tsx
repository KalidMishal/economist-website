'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';

const formatTitle = (slug: string): string => {
  if (!slug) return 'Category';
  const map: Record<string, string> = {
    'united-states': 'United States',
    'middle-east': 'Middle East',
    'usa': 'USA',
    'markets-and-economics': 'Markets & Economics',
    'cost-of-living': 'Cost of Living',
    'stock-markets': 'Stock Markets',
    'cryptocurrency': 'Cryptocurrency',
    'leadership': 'Leadership',
    'artificial-intelligence': 'Artificial intelligence',
    'innovations': 'Innovations',
    'banking': 'Banking',
    'investment': 'Investment',
    'energy': 'Energy',
    'real-estate': 'Real Estate',
    'agriculture': 'Agriculture',
    'healthcare': 'Healthcare',
    'tourism-and-hospitality-culture': 'Tourism & Hospitality- Culture',
    'finance-and-economics': 'Finance & Economics',
    'middle-east-and-africa': 'Middle East & Africa',
    'americas': 'Americas',
    'opinion': 'Opinions',
    'opinions': 'Opinions',
    'the-white-house': 'The White House',
    'law-and-justice': 'Law & Justice',
    'international-relations': 'International Relations',
    'human-rights': 'Human Rights',
    'politics': 'Politics',
    'business': 'Business',
    'technology': 'Technology',
    'china': 'China',
    'asia': 'Asia',
    'europe': 'Europe',
    'sports': 'Sports',
    'elections': 'Elections',
    'congress': 'Congress',
    'culture': 'Culture',
    'entertainment': 'Entertainment',
    'tourism': 'Tourism',
  };
  return map[slug] ?? (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '));
};

const WORLD_COUNTRIES = ["United States", "China", "Europe", "Britain", "Middle East", "Africa", "Asia"];

interface Article {
  id: number | string;
  category: string;
  mainCategory: string;
  firstSubCat: string;
  title: string;
  subtitle: string;
  readTime: string;
  image: string;
  slug: string;
}

const LIMIT = 12;

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) ?? '';
  const title = formatTitle(slug);

  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [ads, setAds] = useState<Record<string, any>>({});

  const fetchAds = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ads/active', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const adsMap: Record<string, any> = {};
        data.forEach((ad: any) => {
          adsMap[ad.slot_id] = ad;
        });
        setAds(adsMap);
      }
    } catch (error) {
      console.error('Error fetching active ads:', error);
    }
  }, []);

  const handleAdClick = (ad: any) => {
    if (ad.target_type === 'internal' && ad.internal_article_id) {
      window.open(`/article/${ad.internal_article_slug || ad.internal_article_id}`, '_blank');
    } else if (ad.target_url) {
      window.open(ad.target_url, '_blank');
    }
  };

  const fetchArticles = useCallback(async (pageNum: number, append = false) => {
    if (pageNum === 1) setLoading(true); else setLoadingMore(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/category/${slug}?page=${pageNum}&limit=${LIMIT}`,
        { cache: 'no-store' }
      );
      if (res.ok) {
        const data = await res.json();
        const mapped: Article[] = (data.posts || []).map((p: any) => {
          let mainCat = p.main_category || "Uncategorized";
          let subCat = "";
          try {
            const arr = typeof p.sub_categories === 'string' ? JSON.parse(p.sub_categories) : p.sub_categories;
            if (Array.isArray(arr) && arr.length > 0) {
              subCat = arr[0];
            }
          } catch(e) {}
          
          let displayCategory = mainCat;
          if (mainCat === 'World' && WORLD_COUNTRIES.includes(subCat)) {
            displayCategory = subCat;
          } else if (WORLD_COUNTRIES.includes(mainCat)) {
            displayCategory = mainCat;
          } else if (mainCat === 'World') {
            displayCategory = subCat || 'World';
          }
          
          return {
            id: p.id,
            category: displayCategory,
            mainCategory: displayCategory,
            firstSubCat: subCat,
            title: p.title,
            subtitle: p.subtitle || p.card_summary || '',
            readTime: `${p.read_duration || 5} min read`,
            image: p.image_url || '/imgi_573_20260718_CND001.jpg',
            slug: p.slug || p.id?.toString(),
          };
        });
        setTotal(data.total || 0);
        setHasMore(pageNum * LIMIT < (data.total || 0));
        if (append) {
          setArticles(prev => [...prev, ...mapped]);
        } else {
          setArticles(mapped);
        }
      }
    } catch (e) {
      console.error('Failed to fetch category articles', e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [slug]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setTotal(0);
    setHasMore(false);
    fetchArticles(1, false);
    fetchAds();
  }, [fetchArticles, fetchAds]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchArticles(newPage, false);
    // Scroll to top of the list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Blank Ad Banner component ─────────────────────────────────────────────
  const BlankAdBanner = ({ width, height, label }: { width: string; height: string; label: string }) => (
    <div
      className="w-full flex items-center justify-center border border-dashed border-gray-300 bg-gray-100 relative"
      style={{ height }}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] text-gray-400 font-mono font-semibold tracking-widest uppercase">
          {label}
        </span>
        <span className="text-[10px] text-gray-400 font-mono">{width} × {height}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="w-full flex-grow pt-10 pb-16">
        <div className="max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">

          {/* Header Section */}
          <div className={`mt-8 ${title === 'World' ? 'mb-10 text-center' : 'mb-4'}`}>
            <h1 className="text-[42px] font-bold font-serif text-[#0f0f0f] leading-none mb-4">{title}</h1>
          </div>

          <div className="w-full border-t-[1.5px] border-black mb-8"></div>

          {/* Main Layout Grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-16">

            {/* Left Column: Articles */}
            <div className="w-full lg:w-[70%]">

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-row justify-between items-start gap-5 border-b border-[#e6e6e6] pb-6 mb-6 animate-pulse">
                      <div className="flex flex-col w-[45%] gap-2">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-5 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="w-[55%] aspect-[3/2] bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : articles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-400 mb-2">No articles yet</h2>
                  <p className="text-sm text-gray-400">Articles tagged with <strong>{title}</strong> will appear here once published.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                    {articles.map((article, i) => (
                      <div
                        key={`${article.id}-${i}`}
                        className={`flex flex-row justify-between items-start gap-5 border-b border-[#e6e6e6] pb-6 mb-6 ${i < 2 ? 'pt-0' : ''}`}
                      >
                        <div className="flex flex-col w-[45%]">
                          {/* Category breadcrumb */}
                          <div className="flex items-center gap-[6px] mb-2 flex-wrap">
                            <Link
                              href={`/category/${WORLD_COUNTRIES.includes(article.mainCategory) ? 'world' : article.mainCategory.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-[#E3120B] text-[11px] font-bold hover:underline decoration-1 underline-offset-4 cursor-pointer"
                            >
                              {WORLD_COUNTRIES.includes(article.mainCategory) ? 'World' : article.mainCategory}
                            </Link>
                            {WORLD_COUNTRIES.includes(article.mainCategory) && (
                              <>
                                <span className="text-black text-[11px] font-normal">|</span>
                                <Link
                                  href={`/category/${article.mainCategory.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-black text-[11px] font-bold hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 cursor-pointer"
                                >
                                  {article.mainCategory}
                                </Link>
                              </>
                            )}
                          </div>
                          <Link href={`/article/${article?.slug || article?.id}`}>
                            <h3 className="text-[20px] font-medium font-serif leading-[1.2] text-[#0f0f0f] hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 cursor-pointer mb-2 line-clamp-3">
                              {article.title}
                            </h3>
                          </Link>
                          <p className="text-[15px] font-serif text-[#333] leading-[1.4] mb-3 line-clamp-2">
                            {article.subtitle}
                          </p>
                          <span className="text-[12px] text-[#555] font-sans font-medium mt-auto">
                            {article.readTime}
                          </span>
                        </div>
                        <div className="w-[55%] flex-shrink-0">
                          <Link href={`/article/${article?.slug || article?.id}`}>
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-auto object-cover aspect-[3/2]"
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Article count info */}
                  <div className="text-center text-[12px] text-gray-400 font-sans mb-4">
                    Showing {(page - 1) * LIMIT + 1} to {Math.min(page * LIMIT, total)} of {total} articles
                  </div>

                  {/* Pagination Buttons */}
                  {(total > LIMIT) && (
                    <div className="w-full flex justify-between items-center mt-8 mb-8 border-t border-[#e6e6e6] pt-6">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1 || loadingMore || loading}
                        className="border border-black px-[24px] py-[10px] text-[14px] font-bold hover:bg-[#f2f2f2] transition-colors rounded-sm text-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        Previous
                      </button>
                      
                      <span className="text-[14px] font-medium text-gray-600 hidden sm:block">
                        Page {page} of {Math.ceil(total / LIMIT)}
                      </span>

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={!hasMore || loadingMore || loading}
                        className="border border-black px-[24px] py-[10px] text-[14px] font-bold hover:bg-[#f2f2f2] transition-colors rounded-sm text-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        Next
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Column: Advertisement Sidebar */}
            <div className="w-full lg:w-[30%] relative">
              <div className="sticky top-[100px] flex flex-col items-center gap-4">
                <span className="text-[#767676] text-[9px] uppercase tracking-widest font-semibold self-start">Advertisement</span>

                {/* Banner 1: 300×250 (Medium Rectangle) */}
                {ads.category_sidebar_1 ? (
                  <div className="w-full h-[250px] relative overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer" onClick={() => handleAdClick(ads.category_sidebar_1)}>
                    <img src={ads.category_sidebar_1.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <BlankAdBanner width="300px" height="250px" label="Advertisement" />
                )}

                {/* Banner 2: 300×600 (Half Page) */}
                {ads.category_sidebar_2 ? (
                  <div className="w-full h-[600px] relative overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer" onClick={() => handleAdClick(ads.category_sidebar_2)}>
                    <img src={ads.category_sidebar_2.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <BlankAdBanner width="300px" height="600px" label="Advertisement" />
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
