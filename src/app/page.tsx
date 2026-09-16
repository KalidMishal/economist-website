import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LatestVideos from "@/components/LatestVideos";
import Link from "next/link";


async function getSectionsData() {
  try {
    const res = await fetch("http://localhost:5000/api/homepage/sections", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.sections || null;
  } catch (e) {
    return null;
  }
}

const getCategorySlug = (cat: string) => cat ? cat.toLowerCase().replace(/\s+&\s+/g, '-and-').replace(/\s+/g, '-') : '';

export default async function Home() {
  const sections = await getSectionsData();

  let adsMap: Record<string, any> = {};
  try {
    const res = await fetch('http://localhost:5000/api/ads/active', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      data.forEach((ad: any) => {
        adsMap[ad.slot_id] = ad;
      });
    }
  } catch (error) {
    console.error('Failed to fetch ads:', error);
  }


  const latestNews1 = sections?.latestNews?.[0];
  const latestNews2 = sections?.latestNews?.[1];
  const latestNews3 = sections?.latestNews?.[2];
  const latestNews4 = sections?.latestNews?.[3];
  const getAdHref = (ad: any) => {
    if (ad.target_type === 'internal' && ad.internal_article_id) {
      return `/article/${ad.internal_article_slug || ad.internal_article_id}`;
    }
    if (ad.target_type === 'external' && ad.target_url && ad.target_url.trim() !== '') {
      return ad.target_url;
    }
    return null;
  };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="w-full flex-grow">
        
        {/* Top Hero Section */}
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-0 mb-10 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          
          {/* Left + Center Wrapper */}
          <div className="w-full lg:w-[70%] flex flex-col pr-0 lg:pr-5">
            
            {/* Top Row: Original Left and Center */}
            <div className="flex flex-col lg:flex-row mb-6 lg:min-h-[360px]">
              {/* Left Column */}
              <div className="w-full lg:w-[48%] flex flex-col items-start text-left pt-2 px-0 lg:pr-4">
                <Link href={`/category/${getCategorySlug(sections?.aPlus?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[13px] xl:text-[14px] font-bold uppercase tracking-widest mb-3 hover:underline cursor-pointer">{sections?.aPlus?.[0]?.mainCategory || 'Category'}</Link>
                <Link href={`/article/${sections?.aPlus?.[0]?.slug || sections?.aPlus?.[0]?.id || 'fallback'}`}>
                  <h2 className="line-clamp-3 text-[38px] lg:text-[44px] xl:text-[54px] font-serif font-bold text-[#0f0f0f] mb-4 leading-[1.1] tracking-tight cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                    {sections?.aPlus?.[0]?.title || 'Article Title'}
                  </h2>
                </Link>
                <p className="line-clamp-3 text-[17px] xl:text-[19px] font-serif text-[#3b3b3b] mb-4 leading-snug pr-4">
                  {sections?.aPlus?.[0]?.subtitle || sections?.aPlus?.[0]?.cardSummary || 'Article description.'}
                </p>
                <span className="text-[#767676] text-[13px] xl:text-[14px] font-semibold">{sections?.aPlus?.[0]?.readDuration || 5} min read<span className="text-gray-300 font-normal mx-3">|</span>By <Link href={sections?.aPlus?.[0]?.authorName ? `/author/${sections.aPlus[0].authorName.toLowerCase().replace(/\s+/g, '-')}` : '#'} className="hover:underline hover:text-[#003a6a] transition-colors">{sections?.aPlus?.[0]?.authorName || "John Cassidy"}</Link></span>
              </div>

              {/* Center Column */}
              <div className="w-full lg:w-[52%] px-0 lg:px-3 flex flex-col">
                <div className="relative w-full h-full">
                  <Link href={`/article/${sections?.aPlus?.[0]?.slug || sections?.aPlus?.[0]?.id || 'fallback'}`} className="w-full h-full block aspect-[1.45] lg:aspect-auto lg:absolute lg:inset-0">
                    <img 
                      src={sections?.aPlus?.[0]?.imageUrl || "/imgi_581_20260718_LDD002_FH.jpg"} 
                      alt={sections?.aPlus?.[0]?.title || "Department of Justice Cover"} 
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="w-full h-[1px] bg-[#e6e6e6] mb-6 pr-4"></div>

            {/* 4 Articles Section */}
            <div className="flex flex-col md:flex-row mb-10 divide-y md:divide-y-0 md:divide-x divide-[#e6e6e6]">
              
              {/* Article 1 */}
              <div className="flex flex-row md:flex-col w-full md:w-1/4 pr-0 md:pr-5 pb-5 md:pb-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.aPlus?.[1]?.slug || sections?.aPlus?.[1]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <img src={sections?.aPlus?.[1]?.imageUrl || "/imgi_259_20260718_ASD000.jpg"} alt="Asia" className="w-full h-[110px] xl:h-[120px] 2xl:h-[140px] object-cover md:mb-2 cursor-pointer hover:opacity-90" />
                </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                <Link href={`/category/${getCategorySlug(sections?.aPlus?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline cursor-pointer">{sections?.aPlus?.[1]?.mainCategory || 'Asia'}</Link>
                <Link href={`/article/${sections?.aPlus?.[1]?.slug || sections?.aPlus?.[1]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <h4 className="line-clamp-2 text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    {sections?.aPlus?.[1]?.title || "Narendra Modi caves to India's Gen Z"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">{sections?.aPlus?.[1]?.readDuration || 4} min read</span>
              
</div></div>

              {/* Article 2 */}
              <div className="flex flex-row md:flex-col w-full md:w-1/4 px-0 md:px-5 py-5 md:py-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.aPlus?.[2]?.slug || sections?.aPlus?.[2]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <img src={sections?.aPlus?.[2]?.imageUrl || "/imgi_111_20260718_BRP502.jpg"} alt="Business" className="w-full h-[110px] xl:h-[120px] 2xl:h-[140px] object-cover md:mb-2 cursor-pointer hover:opacity-90" />
                </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                <Link href={`/category/${getCategorySlug(sections?.aPlus?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline cursor-pointer">{sections?.aPlus?.[2]?.mainCategory || 'Business'}</Link>
                <Link href={`/article/${sections?.aPlus?.[2]?.slug || sections?.aPlus?.[2]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <h4 className="line-clamp-2 text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    {sections?.aPlus?.[2]?.title || "Investors cool on Europe's old-style defence firms"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">{sections?.aPlus?.[2]?.readDuration || 4} min read</span>
              
</div></div>

              {/* Article 3 */}
              <div className="flex flex-row md:flex-col w-full md:w-1/4 px-0 md:px-5 py-5 md:py-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.aPlus?.[3]?.slug || sections?.aPlus?.[3]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <img src={sections?.aPlus?.[3]?.imageUrl || "/imgi_139_20221029_OPD002.webp"} alt="Finance & economics" className="w-full h-[110px] xl:h-[120px] 2xl:h-[140px] object-cover md:mb-2 cursor-pointer hover:opacity-90" />
                </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                <Link href={`/category/${getCategorySlug(sections?.aPlus?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline cursor-pointer">{sections?.aPlus?.[3]?.mainCategory || 'Finance & economics'}</Link>
                <Link href={`/article/${sections?.aPlus?.[3]?.slug || sections?.aPlus?.[3]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <h4 className="line-clamp-2 text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    {sections?.aPlus?.[3]?.title || "Can China dominate AI exports, too?"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">{sections?.aPlus?.[3]?.readDuration || 5} min read</span>
              
</div></div>

              {/* Article 4 */}
              <div className="flex flex-row md:flex-col w-full md:w-1/4 pl-0 md:pl-5 pt-5 md:pt-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.aPlus?.[4]?.slug || sections?.aPlus?.[4]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <img src={sections?.aPlus?.[4]?.imageUrl || "/imgi_42_culture-desktop.webp"} alt="Culture" className="w-full h-[110px] xl:h-[120px] 2xl:h-[140px] object-cover md:mb-2 cursor-pointer hover:opacity-90" />
                </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                <Link href={`/category/${getCategorySlug(sections?.aPlus?.[4]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline cursor-pointer">{sections?.aPlus?.[4]?.mainCategory || 'Culture'}</Link>
                <Link href={`/article/${sections?.aPlus?.[4]?.slug || sections?.aPlus?.[4]?.id || 'fallback'}`} className="block w-full cursor-pointer">
                  <h4 className="line-clamp-2 text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    {sections?.aPlus?.[4]?.title || "How the Cotswolds became a popular lifestyle brand"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">{sections?.aPlus?.[4]?.readDuration || 6} min read</span>
              </div>
            
</div></div>

            {/* Added Black Line Under A+ Section */}
            <div className="block md:hidden w-full h-[2px] mb-6 mt-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] before:h-[2px] before:bg-black before:z-10"></div>


            
            {/* Mobile Only: Stories most read by subscribers */}
            <div className="flex lg:hidden w-full flex-col px-0 mb-10">
              <h3 className="text-[18px] font-bold font-sans text-black mb-6 whitespace-nowrap">Stories most read by subscribers</h3>
              <ol className="flex flex-col w-full">
                {sections?.mostRead?.slice(0, 5).map((article: any, i: number) => (
                  <li key={article.id} className={`flex flex-row items-start border-b border-[#e6e6e6] pb-4 mb-4 ${i === 4 ? 'mb-0 border-b-0' : ''}`}>
                    <span className="text-[#E3120B] font-black text-[52px] leading-[0.8] w-[48px] flex-shrink-0 mt-1">{i + 1}</span>
                    <Link href={`/article/${article?.slug || article?.id}`} className="text-[15.5px] font-serif font-medium text-[#3b3b3b] leading-[1.3] hover:text-[#E3120B] hover:underline transition-all mt-1 line-clamp-3">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            {/* Added Black Line Under Most Read */}
            <div className="block md:hidden w-full h-[2px] mb-4 mt-2 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] before:h-[2px] before:bg-black before:z-10"></div>

            {/* MORE NEWS Section */}
            <div className="w-full mb-10 px-0 md:px-3 flex flex-col items-center">
               <h2 className="text-[13px] font-bold font-sans text-[#E3120B] uppercase tracking-widest mb-3 text-left w-full">More News</h2>
               
               <Link href={`/article/${sections?.moreNews?.[0]?.slug || sections?.moreNews?.[0]?.id || 'fallback-article'}`} className="group flex flex-col items-center w-full">
                 <img src={sections?.moreNews?.[0]?.imageUrl || "/imgi_13_20260718_BLP502-1-1024x576.jpg"} className="w-full aspect-[3/2] object-cover mb-5" alt="Article 1 image" />
                 
                 <h3 className="line-clamp-1 text-[20px] md:text-[24px] lg:text-[20px] 2xl:text-[27px] font-serif text-[#0f0f0f] mb-3 leading-tight tracking-tight text-center w-full group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                   {sections?.moreNews?.[0]?.title || '10 Ways Small Businesses Can Use AI To Grow—And Even Hire More Workers'}
                 </h3>
               </Link>
               
               <span className="text-[#3b3b3b] text-[12.5px] font-sans text-center">
                 By <Link href={sections?.moreNews?.[0]?.authorName ? `/author/${sections.moreNews[0].authorName.toLowerCase().replace(/\s+/g, '-')}` : `/author/${sections?.moreNews?.[0]?.authorId || 1}`} className="font-semibold underline hover:text-[#003a6a] cursor-pointer">{sections?.moreNews?.[0]?.authorName || 'John Schroyer'}</Link>, Staff Writer
               </span>
            </div>

            {/* Andy Burnham & 2 Stacked Articles Block */}
            <div className="w-full flex flex-col md:flex-row mt-4 px-0 md:px-3 mb-6">
              {/* Left Side: Andy Burnham */}
              <div className="w-full md:w-[53%] flex flex-row-reverse md:flex-col justify-between pr-0 md:pr-6 md:border-r border-[#e6e6e6] mb-8 md:mb-0 gap-4 md:gap-0">
                <div className="w-[130px] md:w-full flex-shrink-0">
                  <Link href={`/article/${sections?.moreNews?.[1]?.slug || sections?.moreNews?.[1]?.id || 'fallback'}`} className="group flex flex-col cursor-pointer">
                    <img src={sections?.moreNews?.[1]?.imageUrl || "/imgi_572_20260718_BRD001.jpg"} alt="Article 2" className="w-full aspect-[1.4] md:aspect-[16/9] object-cover md:mb-4" />
                  </Link>
                </div>
                <div className="flex flex-col flex-1">
                  <Link href={`/category/${getCategorySlug(sections?.moreNews?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-2 hover:underline cursor-pointer w-fit">{sections?.moreNews?.[1]?.mainCategory || 'Britain'}</Link>
                  <Link href={`/article/${sections?.moreNews?.[1]?.slug || sections?.moreNews?.[1]?.id || 'fallback'}`} className="group flex flex-col cursor-pointer">
                    <h3 className="line-clamp-2 text-[19px] md:text-[32px] lg:text-[38px] font-serif text-[#0f0f0f] leading-tight mb-2 md:mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                      {sections?.moreNews?.[1]?.title || "Can Andy Burnham keep his own MPs under control?"}
                    </h3>
                    <p className="hidden md:block line-clamp-2 text-[16px] font-serif text-[#3b3b3b] mb-4">
                      {sections?.moreNews?.[1]?.subtitle || sections?.moreNews?.[1]?.cardSummary || "Britain's prime-minister-to-be faces a big task to maintain his authority"}
                    </p>
                    <span className="text-[#767676] text-[12px] font-semibold">{sections?.moreNews?.[1]?.readDuration || 5} min read</span>
                  </Link>
                </div>
              </div>

              {/* Right Side: 2 Stacked Articles */}
              <div className="w-full md:w-[47%] flex flex-col md:pl-6">
                
                {/* China AI Romances */}
                <div className="group flex flex-row items-start justify-between border-b-0 md:border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4">
                  <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                    <Link href={`/category/${getCategorySlug(sections?.moreNews?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-2 hover:underline cursor-pointer w-fit">{sections?.moreNews?.[2]?.mainCategory || 'China'}</Link>
                    <Link href={`/article/${sections?.moreNews?.[2]?.slug || sections?.moreNews?.[2]?.id || 'fallback'}`} className="cursor-pointer group-hover:text-[#003a6a] transition-all">
                      <h4 className="line-clamp-2 text-[19px] 2xl:text-[25px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                        {sections?.moreNews?.[2]?.title || "China wants to end AI romances"}
                      </h4>
                      <p className="line-clamp-2 text-[14px] 2xl:text-[16.5px] font-serif text-[#3b3b3b] mb-3 leading-snug">
                        {sections?.moreNews?.[2]?.subtitle || sections?.moreNews?.[2]?.cardSummary || "They are having too much impact on young people's lives"}
                      </p>
                    </Link>
                    <span className="text-[#767676] text-[12px] font-semibold mt-auto">{sections?.moreNews?.[2]?.readDuration || 4} min read</span>
                  </div>
                  <Link href={`/article/${sections?.moreNews?.[2]?.slug || sections?.moreNews?.[2]?.id || 'fallback'}`}>
                    <img src={sections?.moreNews?.[2]?.imageUrl || "/imgi_573_20260718_CND001.jpg"} alt="Article 3" className="w-[130px] 2xl:w-[195px] aspect-[1.4] object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" />
                  </Link>
                </div>

                {/* Panama Canal */}
                <div className="group flex flex-row items-start justify-between mt-[-5px]">
                  <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                    <Link href={`/category/${getCategorySlug(sections?.moreNews?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-2 hover:underline cursor-pointer w-fit">{sections?.moreNews?.[3]?.mainCategory || 'The Americas'}</Link>
                    <Link href={`/article/${sections?.moreNews?.[3]?.slug || sections?.moreNews?.[3]?.id || 'fallback'}`} className="cursor-pointer group-hover:text-[#003a6a] transition-all">
                      <h4 className="line-clamp-2 text-[19px] 2xl:text-[25px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                        {sections?.moreNews?.[3]?.title || "The Panama Canal is growing more important"}
                      </h4>
                      <p className="line-clamp-2 text-[14px] 2xl:text-[16.5px] font-serif text-[#3b3b3b] mb-3 leading-snug">
                        {sections?.moreNews?.[3]?.subtitle || sections?.moreNews?.[3]?.cardSummary || "And the challenges to it are getting more acute"}
                      </p>
                    </Link>
                    <span className="text-[#767676] text-[12px] font-semibold mt-auto mb-1">{sections?.moreNews?.[3]?.readDuration || 6} min read</span>
                  </div>
                  <Link href={`/article/${sections?.moreNews?.[3]?.slug || sections?.moreNews?.[3]?.id || 'fallback'}`}>
                    <img src={sections?.moreNews?.[3]?.imageUrl || "/imgi_574_20260718_AMP001.jpg"} alt="Article 4" className="w-[130px] 2xl:w-[195px] aspect-[1.4] object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" />
                  </Link>
                </div>

              </div>
            </div>

            {/* Fourth Row: 4 Column Grid */}
            {/* Black line on mobile */}
            <div className="block md:hidden w-full h-[2px] mb-8 mt-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] before:h-[2px] before:bg-black before:z-10"></div>
            <div className="hidden md:block w-full h-[1px] bg-[#e6e6e6] mt-2 mb-3"></div>
            <h2 className="text-[14px] font-extrabold font-sans text-[#E3120B] uppercase tracking-widest mb-4 mt-2">INSIDE THE WHITE HOUSE</h2>
            <div className="flex flex-col md:flex-row w-full pb-0 md:-mx-4">
              {/* Col 1 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col">
                <div className="flex flex-col h-full flex-1 group">
                  <Link href={`/article/${sections?.whiteHouse?.[0]?.slug || sections?.whiteHouse?.[0]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.whiteHouse?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="White House 1" className="w-full aspect-[3/2] object-cover mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.whiteHouse?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.whiteHouse?.[0]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.whiteHouse?.[0]?.slug || sections?.whiteHouse?.[0]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.whiteHouse?.[0]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.whiteHouse?.[0]?.readDuration || 2} min read</span>
                </div>
              </div>
              
              {/* Col 2 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <div className="flex flex-row md:flex-col h-full flex-1 group mb-5 md:mb-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.whiteHouse?.[1]?.slug || sections?.whiteHouse?.[1]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.whiteHouse?.[1]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="White House 2" className="w-full aspect-[3/2] object-cover md:mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.whiteHouse?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.whiteHouse?.[1]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.whiteHouse?.[1]?.slug || sections?.whiteHouse?.[1]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.whiteHouse?.[1]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.whiteHouse?.[1]?.readDuration || 3} min read</span>
                </div>
              
</div></div>

              {/* Col 3 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <div className="flex flex-row md:flex-col h-full flex-1 group mb-5 md:mb-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.whiteHouse?.[2]?.slug || sections?.whiteHouse?.[2]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.whiteHouse?.[2]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="White House 3" className="w-full aspect-[3/2] object-cover md:mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.whiteHouse?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.whiteHouse?.[2]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.whiteHouse?.[2]?.slug || sections?.whiteHouse?.[2]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.whiteHouse?.[2]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.whiteHouse?.[2]?.readDuration || 4} min read</span>
                </div>
              
</div></div>

              {/* Col 4 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <div className="flex flex-row md:flex-col h-full flex-1 group mb-5 md:mb-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.whiteHouse?.[3]?.slug || sections?.whiteHouse?.[3]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.whiteHouse?.[3]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="White House 4" className="w-full aspect-[3/2] object-cover md:mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.whiteHouse?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.whiteHouse?.[3]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.whiteHouse?.[3]?.slug || sections?.whiteHouse?.[3]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.whiteHouse?.[3]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.whiteHouse?.[3]?.readDuration || 5} min read</span>
                </div>
              </div>
            </div>
            
            {/* Added Black Line Under White House */}
            <div className="block md:hidden w-full h-[2px] mb-8 mt-6 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] before:h-[2px] before:bg-black before:z-10"></div>
          
</div></div>

          {/* Right Column: Latest News & Top Highlights */}
          <div className="flex w-full lg:w-[30%] flex-col pl-0 lg:pl-6 border-l-0 md:border-l border-[#e6e6e6] mt-8 lg:mt-0">
            {/* LATEST NEWS */}
            <h2 className="text-[21px] font-bold font-serif text-[#0f0f0f] mb-4 -mt-[9px]">Latest News</h2>
            
            <Link href={latestNews1 ? `/article/${latestNews1.slug || latestNews1.id}` : "/article/latest-news-1"} className="group flex flex-col mb-6 border-b border-[#e6e6e6] pb-6">
              <img src={latestNews1?.imageUrl || "/imgi_243_20260718_IRD000.jpg"} alt={latestNews1?.title || "Latest News 1"} className="w-full aspect-[1.7] object-cover mb-3" />
              <h3 className="text-[15px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-2 line-clamp-3 break-words">
                {latestNews1?.title || "World in Brief: America launches fresh strikes on Iran; Ukrainians protest against ministerial sacking"}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[#E3120B] font-bold text-lg leading-none mt-[-2px]">&rarr;</span>
                <span className="text-[12px] font-bold text-[#0f0f0f] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">Read the rest of our daily news analysis</span>
              </div>
            </Link>

            <div className="group flex flex-row items-start gap-4 mb-5 border-b border-[#e6e6e6] pb-5">
              <Link href={latestNews2 ? `/article/${latestNews2.slug || latestNews2.id}` : "/article/latest-news-2"} className="flex-shrink-0">
                <img src={latestNews2?.imageUrl || "/imgi_158_20260718_FNP503.jpg"} alt={latestNews2?.title || "Latest News 2"} className="w-[145px] aspect-[1.4] object-cover" />
              </Link>
              <div className="flex flex-col flex-1 mt-[-2px]">
                <Link href={latestNews2?.mainCategory ? `/category/${latestNews2.mainCategory.toLowerCase().replace(/\s+/g, '-')}` : "#"} className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1 hover:underline w-fit relative z-10">
                  {latestNews2?.mainCategory || "Markets"}
                </Link>
                <Link href={latestNews2 ? `/article/${latestNews2.slug || latestNews2.id}` : "/article/latest-news-2"}>
                  <h4 className="text-[15px] xl:text-[16px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-1 line-clamp-3 break-words">
                    {latestNews2?.title || "Global stocks fall as investors weigh Fed rate outlook"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[11px] font-semibold">{latestNews2?.readDuration || 2} min read</span>
              </div>
            </div>

            <div className="group flex flex-row items-start gap-4 mb-5 border-b border-[#e6e6e6] pb-5">
              <Link href={latestNews3 ? `/article/${latestNews3.slug || latestNews3.id}` : "/article/latest-news-3"} className="flex-shrink-0">
                <img src={latestNews3?.imageUrl || "/imgi_16_image.webp"} alt={latestNews3?.title || "Latest News 3"} className="w-[145px] aspect-[1.4] object-cover" />
              </Link>
              <div className="flex flex-col flex-1 mt-[-2px]">
                <Link href={latestNews3?.mainCategory ? `/category/${latestNews3.mainCategory.toLowerCase().replace(/\s+/g, '-')}` : "#"} className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1 hover:underline w-fit relative z-10">
                  {latestNews3?.mainCategory || "Business"}
                </Link>
                <Link href={latestNews3 ? `/article/${latestNews3.slug || latestNews3.id}` : "/article/latest-news-3"}>
                  <h4 className="text-[15px] xl:text-[16px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-1 line-clamp-3 break-words">
                    {latestNews3?.title || "OpenAI raises another $20B in fresh funding"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[11px] font-semibold">{latestNews3?.readDuration || 3} min read</span>
              </div>
            </div>

            <div className="group flex flex-row items-start gap-4 mb-6">
              <Link href={latestNews4 ? `/article/${latestNews4.slug || latestNews4.id}` : "/article/latest-news-4"} className="flex-shrink-0">
                <img src={latestNews4?.imageUrl || "/imgi_16_image.webp"} alt={latestNews4?.title || "Latest News 4"} className="w-[145px] aspect-[1.4] object-cover" />
              </Link>
              <div className="flex flex-col flex-1 mt-[-2px]">
                <Link href={latestNews4?.mainCategory ? `/category/${latestNews4.mainCategory.toLowerCase().replace(/\s+/g, '-')}` : "#"} className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1 hover:underline w-fit relative z-10">
                  {latestNews4?.mainCategory || "Business"}
                </Link>
                <Link href={latestNews4 ? `/article/${latestNews4.slug || latestNews4.id}` : "/article/latest-news-4"}>
                  <h4 className="text-[15px] xl:text-[16px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-1 line-clamp-3 break-words">
                    {latestNews4?.title || "OpenAI raises another $20B in fresh funding"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[11px] font-semibold">{latestNews4?.readDuration || 3} min read</span>
              </div>
            </div>

            <Link href="/latest" className="flex items-center gap-2 mb-8 group">
              <span className="text-[#E3120B] text-[13px] font-bold group-hover:text-[#003a6a] transition-colors">View all latest news</span>
              <span className="text-[#E3120B] font-bold text-lg leading-none mt-[-2px] group-hover:text-[#003a6a] transition-colors">&rarr;</span>
            </Link>

            {/* ADVERTISEMENT 1 */}
            
            {/* ADVERTISEMENT (home_sidebar_1) */}
            <div className="w-full mb-6 flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#767676] font-medium tracking-wider mb-2">ADVERTISEMENT</span>
              <div className="w-full h-[300px] sm:h-[400px] lg:h-[550px] 2xl:h-[770px] relative overflow-hidden bg-[#f9f9f9] border border-[#e6e6e6]">
                {adsMap.home_sidebar_1 ? (
                  getAdHref(adsMap.home_sidebar_1) ? (
                    <a href={getAdHref(adsMap.home_sidebar_1)} target="_blank" className="absolute inset-0 cursor-pointer hover:opacity-95 transition-opacity z-20 bg-white">
                      <img src={adsMap.home_sidebar_1?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="absolute inset-0 z-20 bg-white">
                      <img src={adsMap.home_sidebar_1?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[26px] text-[#767676] font-medium tracking-wider">336 x 770</span>
                  </div>
                )}
              </div>
            </div>

            {/* TOP HIGHLIGHTS */}
            <h2 className="text-[15.5px] font-extrabold font-sans text-[#E3120B] uppercase tracking-widest mb-4">Top Highlights</h2>
            
            <div className="flex flex-col mb-6 border-b border-[#e6e6e6] pb-6">
              <Link href={`/article/${sections?.topHighlights?.[0]?.slug || sections?.topHighlights?.[0]?.id || 'fallback-article'}`} className="group cursor-pointer">
                <img src={sections?.topHighlights?.[0]?.imageUrl || "/imgi_572_20260718_BRD001.jpg"} alt="Highlight 1" className="w-full aspect-[1.6] object-cover mb-3 hover:opacity-90 transition-opacity" />
              </Link>
              <Link href={`/category/${getCategorySlug(sections?.topHighlights?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline cursor-pointer w-fit">{sections?.topHighlights?.[0]?.mainCategory || 'Britain'}</Link>
              <Link href={`/article/${sections?.topHighlights?.[0]?.slug || sections?.topHighlights?.[0]?.id || 'fallback-article'}`} className="group cursor-pointer">
                <h3 className="line-clamp-2 text-[22px] font-serif text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-colors mb-2">
                  {sections?.topHighlights?.[0]?.title || 'Can Andy Burnham keep his own MPs under control?'}
                </h3>
                <p className="line-clamp-2 text-[13px] font-serif text-[#3b3b3b] leading-snug">
                  {sections?.topHighlights?.[0]?.cardSummary || "Britain's prime-minister-to-be faces a big task to maintain his authority"}
                </p>
                <span className="text-[#767676] text-[11px] font-semibold mt-2 block">{sections?.topHighlights?.[0]?.readDuration || 4} min read</span>
              </Link>
            </div>

            <div className="flex flex-row items-center gap-4 mb-5 border-b border-[#e6e6e6] pb-5">
              <div className="flex flex-col flex-1">
                <Link href={`/category/${getCategorySlug(sections?.topHighlights?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline cursor-pointer w-fit">{sections?.topHighlights?.[1]?.mainCategory || 'The Telegram on geopolitics'}</Link>
                <Link href={`/article/${sections?.topHighlights?.[1]?.slug || sections?.topHighlights?.[1]?.id || 'fallback-article'}`} className="group cursor-pointer">
                  <h4 className="line-clamp-2 text-[20px] font-serif font-medium text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all mb-2">
                    {sections?.topHighlights?.[1]?.title || "When China's open-source AI is a trap"}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[11px] font-semibold">{sections?.topHighlights?.[1]?.readDuration || 5} min read</span>
              </div>
              <Link href={`/article/${sections?.topHighlights?.[1]?.slug || sections?.topHighlights?.[1]?.id || 'fallback-article'}`}>
                <img src={sections?.topHighlights?.[1]?.imageUrl || "/imgi_37_geopolitics-desktop.webp"} alt="Highlight 2" className="w-[110px] aspect-[1.4] object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" />
              </Link>
            </div>

            <div className="flex flex-row items-center gap-4 mt-auto">
              <div className="flex flex-col flex-1">
                <Link href={`/category/${getCategorySlug(sections?.topHighlights?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline cursor-pointer w-fit">{sections?.topHighlights?.[2]?.mainCategory || 'Chaguan on China'}</Link>
                <Link href={`/article/${sections?.topHighlights?.[2]?.slug || sections?.topHighlights?.[2]?.id || 'fallback-article'}`} className="group cursor-pointer">
                  <h4 className="line-clamp-2 text-[20px] font-serif font-medium text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all mb-2">
                    {sections?.topHighlights?.[2]?.title || 'A squeezed China is trying to wring more from its state assets'}
                  </h4>
                </Link>
                <span className="text-[#767676] text-[11px] font-semibold">{sections?.topHighlights?.[2]?.readDuration || 5} min read</span>
              </div>
              <Link href={`/article/${sections?.topHighlights?.[2]?.slug || sections?.topHighlights?.[2]?.id || 'fallback-article'}`}>
                <img src={sections?.topHighlights?.[2]?.imageUrl || "/imgi_159_20260718_CNP504.jpg"} alt="Highlight 3" className="w-[110px] aspect-[1.4] object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" />
              </Link>
            </div>

          </div>

        </div>

        {/* Horizontal Advertisement (Centered) */}
        
        {/* Horizontal Advertisement (home_leaderboard_1) */}
        <div className="w-full flex justify-center mt-10 mb-16 px-4">
          <div className="flex flex-row items-center w-full max-w-[1050px]">
            <div className="w-[30px] flex-shrink-0 flex items-center justify-center mr-4">
              <span className="text-[10px] text-[#767676] font-medium tracking-widest -rotate-90 whitespace-nowrap">
                ADVERTISEMENT
              </span>
            </div>
            <div className="w-full max-w-[1000px] h-[250px] md:h-[300px] lg:h-[350px] relative overflow-hidden bg-[#f9f9f9] border border-[#e6e6e6]">
              {adsMap.home_leaderboard_1 ? (
                  getAdHref(adsMap.home_leaderboard_1) ? (
                    <a href={getAdHref(adsMap.home_leaderboard_1)} target="_blank" className="absolute inset-0 cursor-pointer hover:opacity-95 transition-opacity z-20 bg-white">
                      <img src={adsMap.home_leaderboard_1?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="absolute inset-0 z-20 bg-white">
                      <img src={adsMap.home_leaderboard_1?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[26px] text-[#767676] font-medium tracking-wider">1000 x 350</span>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Latest Videos Section (Full Width) */}
        <div className="max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] mb-10">
          <LatestVideos />
        </div>

        {/* Black line separator */}
        <div className="max-w-[1600px] mx-auto w-full md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] border-t-[2px] border-black mb-6"></div>

        {/* BOTTOM SECTION (Recent Highlights etc) */}
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-0 mb-10 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          <div className="w-full lg:w-[70%] 2xl:w-[75%] flex flex-col pr-0 lg:pr-5">

            {/* Fourth Row: 4 Column Grid */}
            <h2 className="text-[14px] font-extrabold font-sans text-[#E3120B] uppercase tracking-widest mb-2 mt-2">POLITICAL HIGHLIGHTS</h2>
            <div className="flex flex-col md:flex-row w-full pb-0 md:pb-10 md:-mx-4">
              {/* Col 1 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col">
                <div className="flex flex-col h-full flex-1 group mb-8 md:mb-0">
                  <Link href={`/article/${sections?.political?.[0]?.slug || sections?.political?.[0]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.political?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Political 1" className="w-full aspect-[3/2] object-cover mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.political?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.political?.[0]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.political?.[0]?.slug || sections?.political?.[0]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.political?.[0]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[0]?.readDuration || 2} min read</span>
                </div>
              </div>
              
              {/* Col 2 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <div className="flex flex-row md:flex-col h-full flex-1 group mb-8 md:mb-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.political?.[1]?.slug || sections?.political?.[1]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.political?.[1]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Political 2" className="w-full aspect-[3/2] object-cover md:mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.political?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.political?.[1]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.political?.[1]?.slug || sections?.political?.[1]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.political?.[1]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[1]?.readDuration || 3} min read</span>
                </div>
              
</div></div>

              {/* Col 3 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <div className="flex flex-row md:flex-col h-full flex-1 group mb-8 md:mb-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.political?.[2]?.slug || sections?.political?.[2]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.political?.[2]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Political 3" className="w-full aspect-[3/2] object-cover md:mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.political?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.political?.[2]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.political?.[2]?.slug || sections?.political?.[2]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.political?.[2]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[2]?.readDuration || 4} min read</span>
                </div>
              
</div></div>

              {/* Col 4 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <div className="flex flex-row md:flex-col h-full flex-1 group mb-8 md:mb-0 gap-4 md:gap-0">
<div className="w-[130px] md:w-full flex-shrink-0">
<Link href={`/article/${sections?.political?.[3]?.slug || sections?.political?.[3]?.id || 'fallback-article'}`} className="block w-full cursor-pointer">
                    <img src={sections?.political?.[3]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Political 4" className="w-full aspect-[3/2] object-cover md:mb-3 hover:opacity-90 transition-opacity" />
                  </Link>
</div>
<div className="flex flex-col flex-1 mt-[-2px] md:mt-0">

                  <div className="min-h-0 md:min-h-[40px] flex items-start mb-1 md:mb-0">
                    <Link href={`/category/${getCategorySlug(sections?.political?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold hover:underline cursor-pointer">{sections?.political?.[3]?.mainCategory || 'Category'}</Link>
                  </div>
                  <Link href={`/article/${sections?.political?.[3]?.slug || sections?.political?.[3]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">{sections?.political?.[3]?.title || 'Article Title'}</h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[3]?.readDuration || 5} min read</span>
                </div>
              </div>
            </div>
            
            {/* Removed Black Line Under Political */}
            </div>

            {/* Ash color separator line */}
            <div className="hidden md:block w-full h-[1px] bg-[#e6e6e6] mt-4 mb-6"></div>
            {/* Fifth Row: Recent Highlights */}

            {/* Row 1 */}
            <div className="flex flex-col md:flex-row w-full mb-0 pb-0 md:mb-6 md:pb-6 border-b-0 md:border-b border-[#e6e6e6]">
              {/* Col 5 */}
              <div className="w-full md:w-[50%] pr-0 md:pr-6 flex flex-row-reverse md:flex-row group gap-4 md:gap-0 justify-between mb-8 md:mb-0">
                <div className="flex flex-col flex-1 md:w-[60%] pr-0 md:pr-4 mt-[-2px] md:mt-0">
                  <Link href={`/category/${getCategorySlug(sections?.political?.[4]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">{sections?.political?.[4]?.mainCategory || 'Category'}</Link>
                  <Link href={`/article/${sections?.political?.[4]?.slug || sections?.political?.[4]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] md:text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                      {sections?.political?.[4]?.title || 'Article Title 5'}
                    </h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[4]?.readDuration || 5} min read</span>
                </div>
                <div className="w-[130px] md:w-[40%] flex-shrink-0 flex items-start md:items-center justify-end mb-0">
                  <Link href={`/article/${sections?.political?.[4]?.slug || sections?.political?.[4]?.id || 'fallback-article'}`} className="w-full cursor-pointer">
                    <img src={sections?.political?.[4]?.imageUrl || "/imgi_579_20260711_EUP003.jpg"} alt="Political 5" className="w-full aspect-[1.4] md:aspect-[1.6] object-cover hover:opacity-90 transition-opacity" />
                  </Link>
                </div>
              </div>
              
              {/* Col 6 */}
              <div className="w-full md:w-[50%] pl-0 md:pl-6 flex flex-row-reverse md:flex-row border-l-0 md:border-l border-[#e6e6e6] group gap-4 md:gap-0 justify-between mb-8 md:mb-0">
                <div className="flex flex-col flex-1 md:w-[60%] pr-0 md:pr-4 mt-[-2px] md:mt-0">
                  <Link href={`/category/${getCategorySlug(sections?.political?.[5]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">{sections?.political?.[5]?.mainCategory || 'Category'}</Link>
                  <Link href={`/article/${sections?.political?.[5]?.slug || sections?.political?.[5]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] md:text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                      {sections?.political?.[5]?.title || 'Article Title 6'}
                    </h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[5]?.readDuration || 4} min read</span>
                </div>
                <div className="w-[130px] md:w-[40%] flex-shrink-0 flex items-start md:items-center justify-end mb-0">
                  <Link href={`/article/${sections?.political?.[5]?.slug || sections?.political?.[5]?.id || 'fallback-article'}`} className="w-full cursor-pointer">
                    <img src={sections?.political?.[5]?.imageUrl || "/imgi_580_20260711_FBD001.jpg"} alt="Political 6" className="w-full aspect-[1.4] md:aspect-[1.6] object-cover hover:opacity-90 transition-opacity" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row w-full mb-10 pb-2">
              {/* Col 7 */}
              <div className="w-full md:w-[50%] pr-0 md:pr-6 flex flex-row-reverse md:flex-row group gap-4 md:gap-0 justify-between mb-8 md:mb-0">
                <div className="flex flex-col flex-1 md:w-[60%] pr-0 md:pr-4 mt-[-2px] md:mt-0">
                  <Link href={`/category/${getCategorySlug(sections?.political?.[6]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">{sections?.political?.[6]?.mainCategory || 'Category'}</Link>
                  <Link href={`/article/${sections?.political?.[6]?.slug || sections?.political?.[6]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] md:text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                      {sections?.political?.[6]?.title || 'Article Title 7'}
                    </h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[6]?.readDuration || 6} min read</span>
                </div>
                <div className="w-[130px] md:w-[40%] flex-shrink-0 flex items-start md:items-center justify-end mb-0">
                  <Link href={`/article/${sections?.political?.[6]?.slug || sections?.political?.[6]?.id || 'fallback-article'}`} className="w-full cursor-pointer">
                    <img src={sections?.political?.[6]?.imageUrl || "/imgi_581_20251220_XMD035.jpg"} alt="Political 7" className="w-full aspect-[1.4] md:aspect-[1.6] object-cover hover:opacity-90 transition-opacity" />
                  </Link>
                </div>
              </div>
              
              {/* Col 8 */}
              <div className="w-full md:w-[50%] pl-0 md:pl-6 flex flex-row-reverse md:flex-row border-l-0 md:border-l border-[#e6e6e6] group gap-4 md:gap-0 justify-between mb-0 md:mb-0">
                <div className="flex flex-col flex-1 md:w-[60%] pr-0 md:pr-4 mt-[-2px] md:mt-0">
                  <Link href={`/category/${getCategorySlug(sections?.political?.[7]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">{sections?.political?.[7]?.mainCategory || 'Category'}</Link>
                  <Link href={`/article/${sections?.political?.[7]?.slug || sections?.political?.[7]?.id || 'fallback-article'}`} className="cursor-pointer">
                    <h4 className="line-clamp-2 text-[16px] md:text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                      {sections?.political?.[7]?.title || 'Article Title 8'}
                    </h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.political?.[7]?.readDuration || 7} min read</span>
                </div>
                <div className="w-[130px] md:w-[40%] flex-shrink-0 flex items-start md:items-center justify-end mb-0">
                  <Link href={`/article/${sections?.political?.[7]?.slug || sections?.political?.[7]?.id || 'fallback-article'}`} className="w-full cursor-pointer">
                    <img src={sections?.political?.[7]?.imageUrl || "/imgi_582_20260704_ESD005.jpg"} alt="Political 8" className="w-full aspect-[1.4] md:aspect-[1.6] object-cover hover:opacity-90 transition-opacity" />
                  </Link>
                </div>
              </div>
            

          

          </div>
          </div>
          {/* Right Column: Most Read & Ads */}
          <div className="hidden lg:flex w-full lg:w-[30%] 2xl:w-[25%] flex-col pt-0 pl-8 border-l-0 md:border-l border-[#e6e6e6]">
            <div className="w-full flex flex-col items-start pl-10 lg:pl-4 xl:pl-10 pr-4">
              <h3 className="text-[18px] lg:text-[15px] xl:text-[18px] font-bold font-sans text-black mb-6 lg:mb-4 2xl:mb-6 whitespace-nowrap">Stories most read by subscribers</h3>
              <ol className="flex flex-col w-full mb-10 lg:mb-5 2xl:mb-10">
                {sections?.mostRead?.slice(0, 5).map((article: any, i: number) => (
                  <li key={article.id} className={`flex flex-row items-start border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4 ${i === 4 ? 'mb-0 lg:mb-0 2xl:mb-0 border-b-0' : ''}`}>
                    <span className="text-[#E3120B] font-black text-[52px] leading-[0.8] w-[48px] flex-shrink-0 mt-1">{i + 1}</span>
                    <Link href={`/article/${article?.slug || article?.id}`} className="text-[15.5px] 2xl:text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] hover:text-[#E3120B] hover:underline transition-all mt-1 line-clamp-3">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            {/* Added Black Line Under Most Read */}
            <div className="block md:hidden w-full h-[2px] mb-4 mt-2 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] before:h-[2px] before:bg-black before:z-10"></div>
            
            {/* Vertical Advertisement (Home page Sidebar Ad 1) */}
            <div className="w-full mt-6 flex flex-col items-center">
              <div className="w-full text-center mb-1">
                <span className="text-[10px] text-[#767676] font-medium tracking-widest uppercase">ADVERTISEMENT</span>
              </div>
              <div className="w-[320px] h-[260px] bg-[#f9f9f9] border border-[#e6e6e6] relative overflow-hidden">
                {adsMap.home_sidebar_2 ? (
                  getAdHref(adsMap.home_sidebar_2) ? (
                    <a href={getAdHref(adsMap.home_sidebar_2)} target="_blank" className="absolute inset-0 cursor-pointer hover:opacity-95 transition-opacity z-20 bg-white block">
                      <img src={adsMap.home_sidebar_2?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="absolute inset-0 z-20 bg-white">
                      <img src={adsMap.home_sidebar_2?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center pointer-events-none">
                    <span className="text-[16px] text-[#767676] font-medium tracking-wider">320 x 260</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Black line separator */}
        <div className="max-w-[1600px] mx-auto w-full md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] border-t-[2px] border-black mb-8"></div>

        <div className="max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] py-4 mb-10">
          <h2 className="text-[21px] font-bold font-serif text-[#0f0f0f] mb-6">Trending Stories</h2>
          
          <div className="flex flex-col lg:flex-row w-full gap-8">
            
            {/* Left large article */}
            <div className="w-full lg:w-1/2 flex flex-col group cursor-pointer">
              <Link href={`/article/${sections?.trendingStories?.[0]?.slug || sections?.trendingStories?.[0]?.id || 'fallback-article'}`} className="w-full relative aspect-[1.6] mb-4 overflow-hidden bg-[#f9f9f9] block">
                <img src={sections?.trendingStories?.[0]?.imageUrl || "/imgi_329_20260718_WWP001.jpg"} alt="Political stories" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <Link href={`/category/${getCategorySlug(sections?.trendingStories?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">
                {sections?.trendingStories?.[0]?.mainCategory || 'The world this week'}
              </Link>
              <Link href={`/article/${sections?.trendingStories?.[0]?.slug || sections?.trendingStories?.[0]?.id || 'fallback-article'}`} className="cursor-pointer block">
                <h3 className="line-clamp-2 text-[32px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                  {sections?.trendingStories?.[0]?.title || "This week's most important political stories"}
                </h3>
                <p className="line-clamp-2 text-[15px] font-serif text-[#3b3b3b] mb-4 leading-[1.4]">
                  {sections?.trendingStories?.[0]?.cardSummary || "The ceasefire between America and Iran all but collapses; Iraq's new prime minister visits the White House—and more"}
                </p>
              </Link>
              <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-0">{sections?.trendingStories?.[0]?.readDuration || 5} min read</span>
            </div>

            {/* Right smaller articles */}
            <div className="w-full lg:w-1/2 flex flex-col pt-1">
              
              {/* Right Article 1 */}
              <div className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <Link href={`/category/${getCategorySlug(sections?.trendingStories?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">
                    {sections?.trendingStories?.[1]?.mainCategory || 'The world this week'}
                  </Link>
                  <Link href={`/article/${sections?.trendingStories?.[1]?.slug || sections?.trendingStories?.[1]?.id || 'fallback-article'}`} className="cursor-pointer block">
                    <h4 className="line-clamp-1 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      {sections?.trendingStories?.[1]?.title || "This week's most important business stories"}
                    </h4>
                    <p className="line-clamp-2 text-[14.5px] font-serif text-[#3b3b3b] mb-4 leading-[1.3]">
                      {sections?.trendingStories?.[1]?.cardSummary || "Kevin Warsh gives his first report to Congress as chair of the Fed; huge profits for America's big banks—and more"}
                    </p>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.trendingStories?.[1]?.readDuration || 4} min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <Link href={`/article/${sections?.trendingStories?.[1]?.slug || sections?.trendingStories?.[1]?.id || 'fallback-article'}`} className="block w-full">
                    <img src={sections?.trendingStories?.[1]?.imageUrl || "/imgi_338_20260718_WWP501.jpg"} alt="Business stories" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                </div>
              </div>

              {/* Right Article 2 */}
              <div className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <Link href={`/category/${getCategorySlug(sections?.trendingStories?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">
                    {sections?.trendingStories?.[2]?.mainCategory || 'Letters'}
                  </Link>
                  <Link href={`/article/${sections?.trendingStories?.[2]?.slug || sections?.trendingStories?.[2]?.id || 'fallback-article'}`} className="cursor-pointer block">
                    <h4 className="line-clamp-1 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      {sections?.trendingStories?.[2]?.title || "The best of your correspondence"}
                    </h4>
                    <p className="line-clamp-2 text-[14.5px] font-serif text-[#3b3b3b] mb-4 leading-[1.3]">
                      {sections?.trendingStories?.[2]?.cardSummary || "Dealmaking in geopolitics, the backlash against data centres, homelessness, Route 66 and admitting our mistakes"}
                    </p>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.trendingStories?.[2]?.readDuration || 6} min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <Link href={`/article/${sections?.trendingStories?.[2]?.slug || sections?.trendingStories?.[2]?.id || 'fallback-article'}`} className="block w-full">
                    <img src={sections?.trendingStories?.[2]?.imageUrl || "/imgi_348_20260718_LTD502.jpg"} alt="Correspondence" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                </div>
              </div>

              {/* Right Article 3 */}
              <div className="w-full flex flex-row items-start group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <Link href={`/category/${getCategorySlug(sections?.trendingStories?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline cursor-pointer w-fit">
                    {sections?.trendingStories?.[3]?.mainCategory || 'The world this week'}
                  </Link>
                  <Link href={`/article/${sections?.trendingStories?.[3]?.slug || sections?.trendingStories?.[3]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                    <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      {sections?.trendingStories?.[3]?.title || "A lighter look at events"}
                    </h4>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.trendingStories?.[3]?.readDuration || 1} min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <Link href={`/article/${sections?.trendingStories?.[3]?.slug || sections?.trendingStories?.[3]?.id || 'fallback-article'}`} className="block w-full">
                    <img src={sections?.trendingStories?.[3]?.imageUrl || "/imgi_109_20260718_WWD000.png"} alt="A lighter look" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Black line separator */}
        <div className="max-w-[1600px] mx-auto w-full md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] border-t-[2px] border-black mb-8"></div>

        {/* Section: World news & Business / Advertisement */}
        <div className="max-w-[1600px] mx-auto mb-16 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (58% lg, 72% xl) */}
          <div className="w-full lg:w-[58%] xl:w-[72%] flex flex-col pr-0 lg:pr-8">
            
            {/* World news Section */}
            <div className="w-full mb-12">
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">World news</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Item 1 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.world?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.world?.[0]?.mainCategory || 'Britain'}
                    </Link>
                    <Link href={`/article/${sections?.world?.[0]?.slug || sections?.world?.[0]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.world?.[0]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.world?.[0]?.readDuration || 3} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.world?.[0]?.slug || sections?.world?.[0]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.world?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Britain" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.world?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.world?.[1]?.mainCategory || 'United States'}
                    </Link>
                    <Link href={`/article/${sections?.world?.[1]?.slug || sections?.world?.[1]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.world?.[1]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.world?.[1]?.readDuration || 4} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.world?.[1]?.slug || sections?.world?.[1]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.world?.[1]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="United States" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] md:border-b-0 md:pb-0 group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.world?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.world?.[2]?.mainCategory || 'Asia'}
                    </Link>
                    <Link href={`/article/${sections?.world?.[2]?.slug || sections?.world?.[2]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.world?.[2]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.world?.[2]?.readDuration || 5} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.world?.[2]?.slug || sections?.world?.[2]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.world?.[2]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Asia" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex flex-row items-start w-full group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.world?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.world?.[3]?.mainCategory || 'Middle East & Africa'}
                    </Link>
                    <Link href={`/article/${sections?.world?.[3]?.slug || sections?.world?.[3]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.world?.[3]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.world?.[3]?.readDuration || 5} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.world?.[3]?.slug || sections?.world?.[3]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.world?.[3]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Middle East" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Business Section */}
            <div className="w-full mt-2">
              <div className="w-full h-[2px] mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:h-full before:bg-black before:z-10"></div>
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">Finance and economics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Item 1 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.financeEconomics?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.financeEconomics?.[0]?.mainCategory || 'Business'}
                    </Link>
                    <Link href={`/article/${sections?.financeEconomics?.[0]?.slug || sections?.financeEconomics?.[0]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.financeEconomics?.[0]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.financeEconomics?.[0]?.readDuration || 4} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.financeEconomics?.[0]?.slug || sections?.financeEconomics?.[0]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.financeEconomics?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Business" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.financeEconomics?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.financeEconomics?.[1]?.mainCategory || 'Finance'}
                    </Link>
                    <Link href={`/article/${sections?.financeEconomics?.[1]?.slug || sections?.financeEconomics?.[1]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.financeEconomics?.[1]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.financeEconomics?.[1]?.readDuration || 4} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.financeEconomics?.[1]?.slug || sections?.financeEconomics?.[1]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.financeEconomics?.[1]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Finance" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] md:border-b-0 md:pb-0 group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.financeEconomics?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.financeEconomics?.[2]?.mainCategory || 'Economics'}
                    </Link>
                    <Link href={`/article/${sections?.financeEconomics?.[2]?.slug || sections?.financeEconomics?.[2]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.financeEconomics?.[2]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.financeEconomics?.[2]?.readDuration || 3} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.financeEconomics?.[2]?.slug || sections?.financeEconomics?.[2]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.financeEconomics?.[2]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Economics" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex flex-row items-start w-full group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.financeEconomics?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.financeEconomics?.[3]?.mainCategory || 'Finance & economics'}
                    </Link>
                    <Link href={`/article/${sections?.financeEconomics?.[3]?.slug || sections?.financeEconomics?.[3]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.financeEconomics?.[3]?.title || 'Article Title'}</h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.financeEconomics?.[3]?.readDuration || 4} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.financeEconomics?.[3]?.slug || sections?.financeEconomics?.[3]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.financeEconomics?.[3]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Finance & economics" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column (42% lg, 28% xl) Advertisement */}
          <div className="hidden lg:flex w-full lg:w-[42%] xl:w-[28%] flex-col pt-0 pl-8 border-l-0 md:border-l border-[#e6e6e6]">
            
            {/* ADVERTISEMENT (home_sidebar_3) */}
            <div className="w-full mt-2 flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#767676] font-medium tracking-wider mb-2">ADVERTISEMENT</span>
              <div className="w-full h-[770px] relative overflow-hidden bg-[#f9f9f9] border border-[#e6e6e6]">
                {adsMap.home_sidebar_3 ? (
                  getAdHref(adsMap.home_sidebar_3) ? (
                    <a href={getAdHref(adsMap.home_sidebar_3)} target="_blank" className="absolute inset-0 cursor-pointer hover:opacity-95 transition-opacity z-20 bg-white">
                      <img src={adsMap.home_sidebar_3?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="absolute inset-0 z-20 bg-white">
                      <img src={adsMap.home_sidebar_3?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[26px] text-[#767676] font-medium tracking-wider">336 x 770</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>

                {/* Full-width line below finance and economics */}
        <div className="max-w-[1600px] mx-auto w-full md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] border-t-[2px] border-black mb-4 mt-12"></div>

        <div className="max-w-[1600px] mx-auto mb-16 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          <div className="w-full flex flex-col">
{/* Data That Tells Stories Section */}
            <div className="w-full mt-2">
              
              <h2 className="text-[21px] font-bold font-sans text-black mb-6 tracking-tight">Data That Tells Stories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                
                {/* Item 1 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer h-full">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.dataStories?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.dataStories?.[0]?.mainCategory || 'Graphic detail'}
                    </Link>
                    <Link href={`/article/${sections?.dataStories?.[0]?.slug || sections?.dataStories?.[0]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                        {sections?.dataStories?.[0]?.title || "Where is the home of football?"}
                      </h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.dataStories?.[0]?.readDuration || 2} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.dataStories?.[0]?.slug || sections?.dataStories?.[0]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.dataStories?.[0]?.imageUrl || "/imgi_429_20260711_WOT903.png"} alt="Data story" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                    </Link>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer h-full">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.dataStories?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.dataStories?.[1]?.mainCategory || 'Graphic detail'}
                    </Link>
                    <Link href={`/article/${sections?.dataStories?.[1]?.slug || sections?.dataStories?.[1]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                        {sections?.dataStories?.[1]?.title || "What can you do with 3.4 seconds of electricity?"}
                      </h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.dataStories?.[1]?.readDuration || 2} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.dataStories?.[1]?.slug || sections?.dataStories?.[1]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.dataStories?.[1]?.imageUrl || "/imgi_429_20260711_WOT903.png"} alt="Data story" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                    </Link>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer h-full">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.dataStories?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.dataStories?.[2]?.mainCategory || 'Graphic detail'}
                    </Link>
                    <Link href={`/article/${sections?.dataStories?.[2]?.slug || sections?.dataStories?.[2]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                        {sections?.dataStories?.[2]?.title || "Why is there a global semiconductor shortage?"}
                      </h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.dataStories?.[2]?.readDuration || 2} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.dataStories?.[2]?.slug || sections?.dataStories?.[2]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.dataStories?.[2]?.imageUrl || "/imgi_429_20260711_WOT903.png"} alt="Data story" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                    </Link>
                  </div>
                </div>
                
                {/* Item 4 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer h-full">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.dataStories?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.dataStories?.[3]?.mainCategory || 'Graphic detail'}
                    </Link>
                    <Link href={`/article/${sections?.dataStories?.[3]?.slug || sections?.dataStories?.[3]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                        {sections?.dataStories?.[3]?.title || "How long do most new businesses last?"}
                      </h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.dataStories?.[3]?.readDuration || 2} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.dataStories?.[3]?.slug || sections?.dataStories?.[3]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.dataStories?.[3]?.imageUrl || "/imgi_429_20260711_WOT903.png"} alt="Data story" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                    </Link>
                  </div>
                </div>
                
                {/* Item 5 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer h-full">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.dataStories?.[4]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.dataStories?.[4]?.mainCategory || 'Graphic detail'}
                    </Link>
                    <Link href={`/article/${sections?.dataStories?.[4]?.slug || sections?.dataStories?.[4]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                        {sections?.dataStories?.[4]?.title || "The shifting geography of global growth"}
                      </h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.dataStories?.[4]?.readDuration || 2} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.dataStories?.[4]?.slug || sections?.dataStories?.[4]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.dataStories?.[4]?.imageUrl || "/imgi_429_20260711_WOT903.png"} alt="Data story" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                    </Link>
                  </div>
                </div>
                
                {/* Item 6 */}
                <div className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer h-full">
                  <div className="w-[60%] pr-4 flex flex-col h-full">
                    <Link href={`/category/${getCategorySlug(sections?.dataStories?.[5]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                      {sections?.dataStories?.[5]?.mainCategory || 'Graphic detail'}
                    </Link>
                    <Link href={`/article/${sections?.dataStories?.[5]?.slug || sections?.dataStories?.[5]?.id || 'fallback-article'}`} className="cursor-pointer block flex-grow">
                      <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                        {sections?.dataStories?.[5]?.title || "Where will Europe's heatwave be most deadly?"}
                      </h4>
                    </Link>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.dataStories?.[5]?.readDuration || 2} min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <Link href={`/article/${sections?.dataStories?.[5]?.slug || sections?.dataStories?.[5]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.dataStories?.[5]?.imageUrl || "/imgi_453_20260627_WOT973.png"} alt="Data story" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
{/* Business Weekend Section */}
        <div className="max-w-[1600px] mx-auto mt-12 mb-16 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          <div className="w-full flex flex-col lg:flex-row gap-8">
            
            {/* Main Content Column (65% lg, 75% xl) */}
            <div className="w-full lg:w-[65%] xl:w-[75%] flex flex-col">
              <div className="w-full pt-2 pb-3 mb-2 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[20px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Business Weekend
                </h2>
              </div>
              
              {/* Top Row */}
              <div className="w-full flex flex-col md:flex-row mt-2 px-0">
                {/* Left Side: What to watch this week */}
                <div className="w-full md:w-[48%] flex flex-col pr-0 md:pr-6 mb-8 md:mb-0 relative">
                  <div className="hidden md:block absolute right-0 top-0 bottom-6 w-[1px] bg-[#e6e6e6]"></div>
                  <div className="group flex flex-col cursor-pointer pb-5 h-full">
                    <Link href={`/article/${sections?.business?.[0]?.slug || sections?.business?.[0]?.id || 'fallback-article'}`} className="block w-full">
                      <img src={sections?.business?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="What to watch this week" className="w-full aspect-[1.6] object-cover mb-4" />
                    </Link>
                    <Link href={`/category/${getCategorySlug(sections?.business?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-1 hover:underline w-fit z-10 relative">
                      {sections?.business?.[0]?.mainCategory || 'Culture'}
                    </Link>
                    <Link href={`/article/${sections?.business?.[0]?.slug || sections?.business?.[0]?.id || 'fallback-article'}`} className="block flex-grow">
                      <h3 className="line-clamp-2 text-[32px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">
                        {sections?.business?.[0]?.title || 'What to watch this week'}
                      </h3>
                      <p className="line-clamp-2 text-[16px] font-serif text-[#3b3b3b] mb-4 leading-snug">
                        {sections?.business?.[0]?.cardSummary || 'Our list this week uncovers truths about pretenders and Pompeii'}
                      </p>
                    </Link>
                    <span className="text-[#767676] text-[12px] font-semibold mt-auto pt-2">{sections?.business?.[0]?.readDuration || 2} min read</span>
                  </div>
                </div>

                {/* Right Side: 2 Stacked Articles */}
                <div className="w-full md:w-[52%] flex flex-col md:pl-6">
                  {/* Hikers */}
                  <div className="group flex flex-row items-start justify-between border-b border-[#e6e6e6] pb-5 mb-5 cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <Link href={`/category/${getCategorySlug(sections?.business?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline w-fit z-10 relative">
                        {sections?.business?.[1]?.mainCategory || 'Culture'}
                      </Link>
                      <Link href={`/article/${sections?.business?.[1]?.slug || sections?.business?.[1]?.id || 'fallback-article'}`} className="block">
                        <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">{sections?.business?.[1]?.title || 'Article Title'}</h4>
                      </Link>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto pt-2">{sections?.business?.[1]?.readDuration || 2} min read</span>
                    </div>
                    <Link href={`/article/${sections?.business?.[1]?.slug || sections?.business?.[1]?.id || 'fallback-article'}`} className="block flex-shrink-0">
                      <img src={sections?.business?.[1]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Hikers" className="w-[140px] md:w-[180px] 2xl:w-[250px] aspect-[3/2] object-cover" />
                    </Link>
                  </div>

                  {/* Colson Whitehead */}
                  <div className="group flex flex-row items-start justify-between pb-5 cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <Link href={`/category/${getCategorySlug(sections?.business?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline w-fit z-10 relative">
                        {sections?.business?.[2]?.mainCategory || 'Culture'}
                      </Link>
                      <Link href={`/article/${sections?.business?.[2]?.slug || sections?.business?.[2]?.id || 'fallback-article'}`} className="block">
                        <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">{sections?.business?.[2]?.title || 'Article Title'}</h4>
                      </Link>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto pt-2">{sections?.business?.[2]?.readDuration || 3} min read</span>
                    </div>
                    <Link href={`/article/${sections?.business?.[2]?.slug || sections?.business?.[2]?.id || 'fallback-article'}`} className="block flex-shrink-0">
                      <img src={sections?.business?.[2]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Colson Whitehead" className="w-[140px] md:w-[180px] 2xl:w-[250px] aspect-[3/2] object-cover" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="w-full flex flex-col md:flex-row border-t border-[#e6e6e6] pt-5">
                {/* Left Side: Romans */}
                <div className="w-full md:w-[48%] flex flex-col pr-0 md:pr-6 md:border-r border-[#e6e6e6] mb-8 md:mb-0">
                  <div className="group flex flex-row items-start justify-between cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <Link href={`/category/${getCategorySlug(sections?.business?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline w-fit z-10 relative">
                        {sections?.business?.[3]?.mainCategory || 'Culture'}
                      </Link>
                      <Link href={`/article/${sections?.business?.[3]?.slug || sections?.business?.[3]?.id || 'fallback-article'}`} className="block">
                        <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">{sections?.business?.[3]?.title || 'Article Title'}</h4>
                      </Link>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto mb-1 pt-2">{sections?.business?.[3]?.readDuration || 3} min read</span>
                    </div>
                    <Link href={`/article/${sections?.business?.[3]?.slug || sections?.business?.[3]?.id || 'fallback-article'}`} className="block flex-shrink-0">
                      <img src={sections?.business?.[3]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Romans" className="w-[140px] md:w-[180px] 2xl:w-[250px] aspect-[3/2] object-cover" />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Graeme James */}
                <div className="w-full md:w-[52%] flex flex-col md:pl-6">
                  <div className="group flex flex-row items-start justify-between cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <Link href={`/category/${getCategorySlug(sections?.business?.[4]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 hover:underline w-fit z-10 relative">
                        {sections?.business?.[4]?.mainCategory || 'Culture'}
                      </Link>
                      <Link href={`/article/${sections?.business?.[4]?.slug || sections?.business?.[4]?.id || 'fallback-article'}`} className="block">
                        <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">{sections?.business?.[4]?.title || 'Article Title'}</h4>
                      </Link>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto mb-1 pt-2">{sections?.business?.[4]?.readDuration || 2} min read</span>
                    </div>
                    <Link href={`/article/${sections?.business?.[4]?.slug || sections?.business?.[4]?.id || 'fallback-article'}`} className="block flex-shrink-0">
                      <img src={sections?.business?.[4]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Graeme James" className="w-[140px] md:w-[180px] 2xl:w-[250px] aspect-[3/2] object-cover" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (35% lg, 25% xl) Advertisement */}
            <div className="hidden lg:flex w-full lg:w-[35%] xl:w-[25%] flex-col pt-0 pl-8 pb-8 border-l-0 md:border-l border-[#e6e6e6]">
              
            {/* ADVERTISEMENT (home_sidebar_4) */}
            <div className="w-full mt-2 flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#767676] font-medium tracking-wider mb-2">ADVERTISEMENT</span>
              <div className="w-full h-[770px] relative overflow-hidden bg-[#f9f9f9] border border-[#e6e6e6]">
                {adsMap.home_sidebar_4 ? (
                  getAdHref(adsMap.home_sidebar_4) ? (
                    <a href={getAdHref(adsMap.home_sidebar_4)} target="_blank" className="absolute inset-0 cursor-pointer hover:opacity-95 transition-opacity z-20 bg-white">
                      <img src={adsMap.home_sidebar_4?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="absolute inset-0 z-20 bg-white">
                      <img src={adsMap.home_sidebar_4?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[26px] text-[#767676] font-medium tracking-wider">336 x 770</span>
                  </div>
                )}
              </div>
            </div>
            </div>

          </div>
        </div>
{/* Horizontal Empty Advertisement */}
        
        {/* Horizontal Advertisement (home_leaderboard_2) */}
        <div className="max-w-[1600px] mx-auto mb-16 mt-24 flex justify-center w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          <div className="flex flex-row items-center w-full max-w-[1200px]">
            <div className="w-[30px] flex-shrink-0 flex items-center justify-center mr-4">
              <span className="text-[10px] text-[#767676] font-medium tracking-widest -rotate-90 whitespace-nowrap">
                ADVERTISEMENT
              </span>
            </div>
            <div className="w-full max-w-[1150px] h-[380px] relative overflow-hidden bg-[#f9f9f9] border border-[#e6e6e6]">
              {adsMap.home_leaderboard_2 ? (
                  getAdHref(adsMap.home_leaderboard_2) ? (
                    <a href={getAdHref(adsMap.home_leaderboard_2)} target="_blank" className="absolute inset-0 cursor-pointer hover:opacity-95 transition-opacity z-20 bg-white">
                      <img src={adsMap.home_leaderboard_2?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="absolute inset-0 z-20 bg-white">
                      <img src={adsMap.home_leaderboard_2?.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[26px] text-[#767676] font-medium tracking-wider">1150 x 380</span>
                  </div>
                )}
            </div>
          </div>
        </div>
                {/* 4 Column Business Section */}

        {/* "This week" Section */}
        {/* Black line above Justice */}
        <div className="max-w-[1600px] mx-auto w-full md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%] border-t-[2px] border-black mb-8 mt-12"></div>

        <div className="max-w-[1600px] mx-auto mt-16 mb-16 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">Justice & Human Rights</h2>
          
          <div className="flex flex-col lg:flex-row w-full gap-8">
            
            {/* Left large article */}
            <div className="w-full lg:w-1/2 flex flex-col group cursor-pointer">
              <Link href={`/article/${sections?.justiceHumanRights?.[0]?.slug || sections?.justiceHumanRights?.[0]?.id || 'fallback-article'}`} className="w-full block mb-4">
                <div className="w-full relative aspect-[1.6] overflow-hidden bg-[#f9f9f9]">
                  <img src={sections?.justiceHumanRights?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Political stories" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
              <Link href={`/category/${getCategorySlug(sections?.justiceHumanRights?.[0]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                {sections?.justiceHumanRights?.[0]?.mainCategory || 'The world this week'}
              </Link>
              <Link href={`/article/${sections?.justiceHumanRights?.[0]?.slug || sections?.justiceHumanRights?.[0]?.id || 'fallback-article'}`} className="block">
                <h3 className="line-clamp-1 text-[32px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                  {sections?.justiceHumanRights?.[0]?.title || "This week's most important political stories"}
                </h3>
                <p className="line-clamp-2 text-[15px] font-serif text-[#3b3b3b] mb-4 leading-[1.4]">
                  {sections?.justiceHumanRights?.[0]?.cardSummary || "The ceasefire between America and Iran all but collapses; Iraq's new prime minister visits the White House—and more"}
                </p>
              </Link>
              <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.justiceHumanRights?.[0]?.readDuration || 5} min read</span>
            </div>

            {/* Right smaller articles */}
            <div className="w-full lg:w-1/2 flex flex-col pt-1">
              
              {/* Right Article 1 */}
              <div className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <Link href={`/category/${getCategorySlug(sections?.justiceHumanRights?.[1]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                    {sections?.justiceHumanRights?.[1]?.mainCategory || 'The world this week'}
                  </Link>
                  <Link href={`/article/${sections?.justiceHumanRights?.[1]?.slug || sections?.justiceHumanRights?.[1]?.id || 'fallback-article'}`} className="block flex-grow">
                    <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.justiceHumanRights?.[1]?.title || 'Article Title'}</h4>
                    <p className="line-clamp-2 text-[14.5px] font-serif text-[#3b3b3b] mb-4 leading-[1.3]">
                      {sections?.justiceHumanRights?.[1]?.cardSummary || "Kevin Warsh gives his first report to Congress as chair of the Fed; huge profits for America's big banks—and more"}
                    </p>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.justiceHumanRights?.[1]?.readDuration || 4} min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <Link href={`/article/${sections?.justiceHumanRights?.[1]?.slug || sections?.justiceHumanRights?.[1]?.id || 'fallback-article'}`} className="block w-full">
                    <img src={sections?.justiceHumanRights?.[1]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Business stories" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                </div>
              </div>

              {/* Right Article 2 */}
              <div className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <Link href={`/category/${getCategorySlug(sections?.justiceHumanRights?.[2]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                    {sections?.justiceHumanRights?.[2]?.mainCategory || 'Letters'}
                  </Link>
                  <Link href={`/article/${sections?.justiceHumanRights?.[2]?.slug || sections?.justiceHumanRights?.[2]?.id || 'fallback-article'}`} className="block flex-grow">
                    <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.justiceHumanRights?.[2]?.title || 'Article Title'}</h4>
                    <p className="line-clamp-2 text-[14.5px] font-serif text-[#3b3b3b] mb-4 leading-[1.3]">
                      {sections?.justiceHumanRights?.[2]?.cardSummary || "Dealmaking in geopolitics, the backlash against data centres, homelessness, Route 66 and admitting our mistakes"}
                    </p>
                  </Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">{sections?.justiceHumanRights?.[2]?.readDuration || 6} min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <Link href={`/article/${sections?.justiceHumanRights?.[2]?.slug || sections?.justiceHumanRights?.[2]?.id || 'fallback-article'}`} className="block w-full">
                    <img src={sections?.justiceHumanRights?.[2]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Correspondence" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                </div>
              </div>

              {/* Right Article 3 */}
              <div className="w-full flex flex-row items-start group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <Link href={`/category/${getCategorySlug(sections?.justiceHumanRights?.[3]?.mainCategory || '')}`} className="text-[#E3120B] text-[11px] font-bold mb-1 mt-[-2px] hover:underline w-fit z-10 relative">
                    {sections?.justiceHumanRights?.[3]?.mainCategory || 'The world this week'}
                  </Link>
                  <Link href={`/article/${sections?.justiceHumanRights?.[3]?.slug || sections?.justiceHumanRights?.[3]?.id || 'fallback-article'}`} className="block flex-grow">
                    <h4 className="line-clamp-2 text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">{sections?.justiceHumanRights?.[3]?.title || 'Article Title'}</h4>
                  </Link>
                  <div className="flex-grow"></div>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">{sections?.justiceHumanRights?.[3]?.readDuration || 1} min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <Link href={`/article/${sections?.justiceHumanRights?.[3]?.slug || sections?.justiceHumanRights?.[3]?.id || 'fallback-article'}`} className="block w-full">
                    <img src={sections?.justiceHumanRights?.[3]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="A lighter look" className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mb-16 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          <div className="w-full flex flex-col md:flex-row gap-8">
            
            {/* Col 1 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Sports
                </h2>
              </div>
              
              <Link href={`/article/${sections?.sports?.[0]?.slug || sections?.sports?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.sports?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Business" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.sports?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.sports?.[1]?.slug || sections?.sports?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.sports?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.sports?.[2]?.slug || sections?.sports?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.sports?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

            {/* Col 2 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Cryptocurrency
                </h2>
              </div>
              
              <Link href={`/article/${sections?.cryptocurrency?.[0]?.slug || sections?.cryptocurrency?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.cryptocurrency?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Finance" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.cryptocurrency?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.cryptocurrency?.[1]?.slug || sections?.cryptocurrency?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.cryptocurrency?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.cryptocurrency?.[2]?.slug || sections?.cryptocurrency?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.cryptocurrency?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

            {/* Col 3 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Technology
                </h2>
              </div>
              
              <Link href={`/article/${sections?.technology?.[0]?.slug || sections?.technology?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.technology?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="US" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.technology?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.technology?.[1]?.slug || sections?.technology?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.technology?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.technology?.[2]?.slug || sections?.technology?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.technology?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

            {/* Col 4 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Healthcare
                </h2>
              </div>
              
              <Link href={`/article/${sections?.healthcare?.[0]?.slug || sections?.healthcare?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.healthcare?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="AI" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.healthcare?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.healthcare?.[1]?.slug || sections?.healthcare?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.healthcare?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.healthcare?.[2]?.slug || sections?.healthcare?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.healthcare?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

          </div>
        </div>

        {/* Second 4 Column Section */}
        <div className="max-w-[1600px] mx-auto mb-16 w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          <div className="w-full flex flex-col md:flex-row gap-8">
            
            {/* Col 1 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Entertainment
                </h2>
              </div>
              
              <Link href={`/article/${sections?.entertainment?.[0]?.slug || sections?.entertainment?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.entertainment?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="1843" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.entertainment?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.entertainment?.[1]?.slug || sections?.entertainment?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.entertainment?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.entertainment?.[2]?.slug || sections?.entertainment?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.entertainment?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

            {/* Col 2 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Energy
                </h2>
              </div>
              
              <Link href={`/article/${sections?.energy?.[0]?.slug || sections?.energy?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.energy?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="By Invitation" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.energy?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.energy?.[1]?.slug || sections?.energy?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.energy?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.energy?.[2]?.slug || sections?.energy?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.energy?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

            {/* Col 3 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Opinions
                </h2>
              </div>
              
              <Link href={`/article/${sections?.opinions?.[0]?.slug || sections?.opinions?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.opinions?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Newsletters" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.opinions?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.opinions?.[1]?.slug || sections?.opinions?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.opinions?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.opinions?.[2]?.slug || sections?.opinions?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.opinions?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

            {/* Col 4 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full pt-2 pb-3 mb-4 relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[100vw] md:before:w-full before:border-t-[2px] before:border-black before:z-10">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Congress
                </h2>
              </div>
              
              <Link href={`/article/${sections?.congress?.[0]?.slug || sections?.congress?.[0]?.id || 'fallback-article'}`} className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src={sections?.congress?.[0]?.imageUrl || '/imgi_575_20260718_WOT913.png'} alt="Podcasts" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="line-clamp-2 text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.congress?.[0]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.congress?.[1]?.slug || sections?.congress?.[1]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.congress?.[1]?.title || 'Article Title'}</h4>
              </Link>

              <Link href={`/article/${sections?.congress?.[2]?.slug || sections?.congress?.[2]?.id || 'fallback-article'}`} className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="line-clamp-2 text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">{sections?.congress?.[2]?.title || 'Article Title'}</h4>
              </Link>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

