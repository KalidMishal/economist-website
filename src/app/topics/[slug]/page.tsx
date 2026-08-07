import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const formatTitle = (slug: string) => {
    if (!slug) return 'Topic';
    if (slug === 'united-states') return 'United States';
    if (slug === 'middle-east') return 'Middle East';
    if (slug === 'usa') return 'USA';
    if (slug === 'markets-and-economics') return 'Markets & Economics';
    if (slug === 'cost-of-living') return 'Cost of Living';
    if (slug === 'stock-markets') return 'Stock Markets';
    if (slug === 'cryptocurrency') return 'Cryptocurrency';
    if (slug === 'leadership') return 'Leadership';
    if (slug === 'artificial-intelligence') return 'Artificial intelligence';
    if (slug === 'innovations') return 'Innovations';
    if (slug === 'banking') return 'Banking';
    if (slug === 'investment') return 'Investment';
    if (slug === 'energy') return 'Energy';
    if (slug === 'real-estate') return 'Real Estate';
    if (slug === 'agriculture') return 'Agriculture';
    if (slug === 'healthcare') return 'Healthcare';
    if (slug === 'tourism-and-hospitality-culture') return 'Tourism & Hospitality- Culture';
    if (slug === 'finance-and-economics') return 'Finance & economics';
    if (slug === 'middle-east-and-africa') return 'Middle East & Africa';
    if (slug === 'americas') return 'Americas';
    if (slug === 'opinion') return 'Opinion';
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };
  
  const title = formatTitle(slug);

  const articles = [
    {
      category: "China",
      title: "China wants to end AI romances",
      subtitle: "They are having too much impact on young people's lives",
      readTime: "4 min read",
      image: "/imgi_573_20260718_CND001.jpg",
      isPodcast: false,
    },
    {
      category: "Leaders",
      title: "China's rulers have a woman problem",
      subtitle: "Antagonism between the sexes does nothing to address China's demographic problems",
      readTime: "4 min read",
      image: "/imgi_156_20260718_LDP501.jpg",
      isPodcast: false,
    },
    {
      category: "Leaders",
      title: "How to make AI safe—and lessen dependence on America and China",
      subtitle: "State-backed efforts to catch up with frontier models are doomed",
      readTime: "4 min read",
      image: "/imgi_157_20260718_LDD003.jpg",
      isPodcast: false,
    },
    {
      category: "Finance & economics",
      title: "China's trade gap is narrowing. And other surprises",
      subtitle: "The world's second-biggest economy is stumbling into fiscal austerity",
      readTime: "4 min read",
      image: "/imgi_158_20260718_FNP503.jpg",
      isPodcast: false,
    },
    {
      category: "China",
      title: "Xi Jinping expels another leader from his top team",
      subtitle: "He has set a record for booting out members of the Politburo",
      readTime: "2 min read",
      image: "/imgi_159_20260718_CNP504.jpg",
      isPodcast: false,
    },
    {
      category: "Podcasts",
      title: "State funding threatens Chinese tech",
      subtitle: "A handpicked article read aloud from the latest issue of The Economist",
      readTime: "07:14",
      image: "/imgi_160_20260711_PDD003.jpg",
      isPodcast: true,
    },
    {
      category: "Podcasts",
      title: "Inside the world's most important exam (part one)",
      subtitle: "Our weekly podcast on China. This week, what is it like to prepare for the gaokao?",
      readTime: "35:23",
      image: "/imgi_161_20260718_PDP504.jpg",
      isPodcast: true,
    },
    {
      category: "China",
      title: "A squeezed China is trying to wring more from its state assets",
      subtitle: "Its latest campaign won't solve its debt woes, but inches in the right direction",
      readTime: "5 min read",
      image: "/imgi_251_20260618_CND000.jpg",
      isPodcast: false,
    },
    {
      category: "China",
      title: "China is dealing with its own manosphere",
      subtitle: "But online misogyny is only one corner of a much bigger problem",
      readTime: "7 min read",
      image: "/imgi_163_20260718_CNP001.jpg",
      isPodcast: false,
    },
    {
      category: "China",
      title: "China's media gloat at Britain's chaotic democracy",
      subtitle: "But Chinese viewers also love British comedy that laughs at politics",
      readTime: "2 min read",
      image: "/imgi_164_20260711_CNP003.jpg",
      isPodcast: false,
    },
    {
      category: "China",
      title: "China releases a prominent Christian pastor",
      subtitle: "Jin Mingri formerly ran a large house church in Beijing",
      readTime: "1 min read",
      image: "/imgi_165_20260711_CNP002.jpg",
      isPodcast: false,
    },
    {
      category: "Finance & economics",
      title: "China may struggle to fund Xi Jinping's tech dreams",
      subtitle: "Even though capital markets are staging a comeback",
      readTime: "5 min read",
      image: "/imgi_166_20260711_FND004.jpg",
      isPodcast: false,
    }
  ];

  const businessArticles = [
    {
      category: "Business",
      title: "How SK Hynix became the king of advanced memory chips",
      subtitle: "Its advantages will not protect it if demand falters",
      readTime: "5 min read",
      image: "/imgi_501_20260718_WBP503.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "How to sell a kettle",
      subtitle: "Brand positioning reaches boiling point",
      readTime: "4 min read",
      image: "/imgi_156_20260718_WBD001.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "Eli Lilly is reinventing the pharma business",
      subtitle: "The world's largest drugmaker is betting big on preventive medicines—and learning from big tech",
      readTime: "6 min read",
      image: "/imgi_157_20260718_WBD002.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "Meet the committee to buy Europe",
      subtitle: "The continent's dealmakers deserve much more attention",
      readTime: "5 min read",
      image: "/imgi_65_20260718_WBD000.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "Demis Hassabis has a plan to harness AI safely",
      subtitle: "The Google DeepMind co-founder sets out his vision in an exclusive interview",
      readTime: "4 min read",
      image: "/imgi_398_20260718_WBP502.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "How high can Red Bull fly?",
      subtitle: "The world's most formidable marketing machine faces growing threats",
      readTime: "4 min read",
      image: "/imgi_81_20260718_WBP001.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "The secret to good questions",
      subtitle: "Consideration, consistency and curveballs",
      readTime: "4 min read",
      image: "/imgi_267_20260711_WBD001.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "Could a Chinese bike win the Tour de France?",
      subtitle: "The country's manufacturers hope that high-performance models will improve their image",
      readTime: "2 min read",
      image: "/imgi_97_20260711_WBP502.jpg",
      isPodcast: false,
    },
    {
      category: "Podcasts",
      title: "Lime bikes v liberalism",
      subtitle: "A handpicked article read aloud from the latest issue of The Economist",
      readTime: "07:46",
      image: "/imgi_163_20260704_PDD003.jpg",
      isPodcast: true,
    },
    {
      category: "Business",
      title: "Elon Musk and the age of the corporate leviathan",
      subtitle: "For the world's largest companies, the normal rules of corporate governance no longer apply",
      readTime: "5 min read",
      image: "/imgi_164_20260711_WBD000.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "Microsoft's gaming strategy has misfired badly",
      subtitle: "A supply-chain crisis for Xbox couldn't have come at a worse time",
      readTime: "4 min read",
      image: "/imgi_165_20260711_WBP503.jpg",
      isPodcast: false,
    },
    {
      category: "Business",
      title: "China's semiconductor industry is racing to catch the West's",
      subtitle: "But it is proving easier to design chips than to make them",
      readTime: "6 min read",
      image: "/imgi_129_20260711_WBP501.jpg",
      isPodcast: false,
    }
  ];

  const activeArticles = slug === 'business' ? businessArticles : articles;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="w-full flex-grow pt-10 pb-16">
        <div className="max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
          
          {/* Header Section */}
          <div className="mt-8 mb-4">
            <h1 className="text-[42px] font-bold font-serif text-[#0f0f0f] leading-none mb-4">{title}</h1>
            {slug !== 'business' && (
              <p className="text-[17px] italic font-serif text-[#333] max-w-[600px]">
                Explore our coverage of {title}&apos;s politics, economics,<br /> business and culture, in articles, charts, podcasts and video
              </p>
            )}
          </div>
          
          <div className="w-full border-t-[1.5px] border-black mb-8"></div>

          {/* Main Layout Grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-16">
            
            {/* Left Column: Articles Grid */}
            <div className="w-full lg:w-[70%]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                {activeArticles.map((article, i) => (
                  <div key={i} className={`flex flex-row justify-between items-start gap-5 border-b border-[#e6e6e6] pb-6 mb-6 ${i < 2 ? 'pt-0' : ''}`}>
                    <div className="flex flex-col w-[45%]">
                      <div className="flex items-center gap-[6px] mb-2">
                        {article.isPodcast && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e3120b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                          </svg>
                        )}
                        <span className="text-[10px] font-bold text-[#e3120b] hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 tracking-[0.08em] uppercase cursor-pointer">
                          {article.category}
                        </span>
                      </div>
                      <Link href="/article/fallback-article"><h3 className="text-[20px] font-medium font-serif leading-[1.2] text-[#0f0f0f] hover:text-[#00508f] hover:underline decoration-1 underline-offset-4 cursor-pointer mb-2">
                        {article.title}
                      </h3></Link>
                      <p className="text-[15px] font-serif text-[#333] leading-[1.4] mb-3">
                        {article.subtitle}
                      </p>
                      <span className="text-[12px] text-[#555] font-sans font-medium mt-auto">
                        {article.readTime}
                      </span>
                    </div>
                    <div className="w-[55%] flex-shrink-0">
                      <Link href="/article/fallback-article"><img src={article.image} alt={article.title} className="w-full h-auto object-cover aspect-[3/2]" /></Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="w-full flex justify-center mt-12 mb-4">
                <button className="border border-black px-[18px] py-[8px] text-[14px] font-bold hover:bg-[#f2f2f2] transition-colors rounded-sm text-black">
                  Load more
                </button>
              </div>
            </div>

            {/* Right Column: Advertisement Sidebar */}
            <div className="w-full lg:w-[30%] relative">
              <div className="sticky top-[100px] flex flex-col items-center">
                <span className="text-[#767676] text-[9px] uppercase tracking-widest mb-3 font-semibold">Advertisement</span>
                
                {/* The Economist Pro Ad Box */}
                <div className="bg-[#e3120b] text-white p-6 w-full relative h-auto min-h-[300px] flex flex-col">
                  {/* Ad Icon top right */}
                  <div className="absolute top-2 right-2 bg-white/20 px-1 py-[2px] text-[8px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                  </div>

                  <div className="flex items-center gap-2 mb-10">
                     <div className="bg-white p-2 flex items-center justify-center h-[35px] w-[120px]">
                       <Link href="/article/fallback-article"><img src="/imgi_5_logo-red.svg" className="h-[18px] w-auto object-contain" alt="The Economist" /></Link>
                     </div>
                     <span className="text-[10px] font-bold border border-white px-2 py-[6px] tracking-widest leading-none">PRO</span>
                  </div>
                  
                  <h3 className="text-[28px] font-serif font-medium leading-[1.1] mb-8">
                    scaled for your<br/>organisation.
                  </h3>
                  
                  <div className="mt-auto">
                    <button className="bg-white text-black px-6 py-[10px] rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors inline-block shadow-sm">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
