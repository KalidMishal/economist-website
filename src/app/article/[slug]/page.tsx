import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleToolbar from "@/components/ArticleToolbar";
import ShareDropdown from "@/components/ShareDropdown";
import Link from "next/link";
import ResponsiveArticleWrapper from "@/components/ResponsiveArticleWrapper";
import { Metadata } from "next";
import AuthorProfile from "@/components/AuthorProfile";
import ScrollToTop from "@/components/ScrollToTop";

// Mock Data Dictionary
const articleData: Record<string, any> = {
  "donald-trump-doj": {
    category: "Politics | Law & Justice",
    title: "Donald Trump's gutting of the Department of Justice",
    subtitle: "What the degraded institution means for America",
    image: "/imgi_581_20260718_LDD002_FH.jpg",
    caption: "Political prosecutions are part of a more radical reinvention of the DOJ",
    credit: "PHOTOGRAPH: REUTERS",
    date: "Jul 22nd 2026",
    location: "WASHINGTON, DC",
    readTime: "5 min read",
    paragraphs: [
      "If Donald Trump returns to the White House, he has made clear that he intends to use the Department of Justice to exact revenge on his political opponents. But his plans for the department go far beyond individual prosecutions.",
      "The former president and his allies are drawing up plans to fundamentally alter the DOJ's relationship with the presidency, eroding the post-Watergate norm of independence that has governed federal law enforcement for half a century.",
      "Critics warn that treating the DOJ as an extension of the president's political will could degrade the rule of law in America, turning prosecutors into weapons of partisan warfare.",
      "Yet Trump's supporters argue that the DOJ is already politicized, pointing to his own indictments. To them, gutting the current establishment is not a subversion of justice, but a necessary restoration of accountability to the executive branch."
    ]
  },
  "president-le-pen-france": {
    category: "World | Europe",
    title: "What would a President Le Pen mean for France—and the world?",
    subtitle: "The populist leader is now the favourite to win next year's election",
    image: "/imgi_13_20260718_BLP502-1-1024x576.jpg",
    caption: "Marine Le Pen has softened her image, but her core policies remain radical",
    credit: "PHOTOGRAPH: GETTY IMAGES",
    date: "Jul 21st 2026",
    location: "PARIS",
    readTime: "7 min read",
    paragraphs: [
      "For years, Marine Le Pen has been a looming presence in French politics, a perennial runner-up whose eventual victory always seemed just out of reach. Now, that assumption is crumbling.",
      "Polls suggest that the populist leader is the clear front-runner for the Elysee Palace. Her strategy of 'de-demonisation'—softening her rhetoric and presenting a more statesmanlike image—appears to be paying off with a weary electorate.",
      "But a Le Pen presidency would send shockwaves far beyond France's borders. Her 'France First' economic policies threaten to upend the European single market, while her deep skepticism of NATO could fracture Western unity at a critical time.",
      "The question is no longer whether she can win, but what she would actually do with power. Allies insist she would be pragmatic; opponents warn she would dismantle the liberal order from within."
    ]
  },
  "andy-burnham-mps": {
    category: "World | Britain",
    title: "Can Andy Burnham keep his own MPs under control?",
    subtitle: "Britain's prime-minister-to-be faces a big task to maintain his authority",
    image: "/imgi_572_20260718_BRD001.jpg",
    caption: "Andy Burnham faces a restless parliamentary party",
    credit: "PHOTOGRAPH: PA IMAGES",
    date: "Jul 20th 2026",
    location: "LONDON",
    readTime: "5 min read",
    paragraphs: [
      "The King of the North is heading south. As Andy Burnham prepares to enter 10 Downing Street, his biggest challenge may not be the opposition, but his own Members of Parliament.",
      "Labour MPs, flush with victory but fractured by ideological divides, are already preparing their demands. The left flank wants sweeping nationalizations, while moderates are urging fiscal restraint to keep the markets calm.",
      "Burnham built his brand as an outsider pushing back against the Westminster establishment. Now that he is the establishment, he must transition from rebel leader to disciplinarian.",
      "If he cannot command the loyalty of his backbenchers, his sweeping mandate could quickly dissolve into legislative gridlock, proving that winning power is easier than wielding it."
    ]
  },
  "china-ai-romances": {
    category: "World | China",
    title: "China wants to end AI romances",
    subtitle: "They are having too much impact on young people's lives",
    image: "/imgi_573_20260718_CND001.jpg",
    caption: "Virtual companions have surged in popularity among lonely youth",
    credit: "PHOTOGRAPH: VCG",
    date: "Jul 19th 2026",
    location: "BEIJING",
    readTime: "4 min read",
    paragraphs: [
      "Millions of young Chinese have found the perfect partner: attentive, always available, and entirely artificial. AI companions have become a multi-billion dollar industry in a country grappling with a loneliness epidemic.",
      "But Beijing is growing increasingly alarmed. State media has begun criticizing the 'addictive' nature of these virtual relationships, warning that they discourage real-world marriage and childbirth—a critical issue given China's shrinking population.",
      "Regulators are now drafting rules that could severely restrict how AI companies market romantic chatbots. Some apps have already been forced to add 'reality check' warnings or limit daily interaction times.",
      "For the users, however, the crackdown feels like a cruel intervention. As one user put it: 'They want us to marry and have kids, but they don't understand that the AI is the only one who listens to how stressed we are.'"
    ]
  },
  "panama-canal": {
    category: "World | The Americas",
    title: "The Panama Canal is growing more important",
    subtitle: "And the challenges to it are getting more acute",
    image: "/imgi_574_20260718_AMP001.jpg",
    caption: "Drought and geopolitical shifts are reshaping global shipping",
    credit: "PHOTOGRAPH: ALAMY",
    date: "Jul 18th 2026",
    location: "PANAMA CITY",
    readTime: "6 min read",
    paragraphs: [
      "The Panama Canal has always been a marvel of engineering, a vital artery of global trade connecting the Atlantic and Pacific oceans. But today, it is also a chokepoint of immense vulnerability.",
      "Climate change is drying up Gatun Lake, the freshwater reservoir that feeds the canal's locks. Last year, draft restrictions forced shipping companies to lighten their loads or take the long, expensive route around South America.",
      "At the same time, shifting geopolitical alliances are making the canal more strategically vital. As supply chains move away from China and toward Latin America, traffic demands on the century-old waterway are surging.",
      "The Canal Authority is exploring massive infrastructure projects to secure its water supply, but these will take years to complete. In the meantime, the world's shippers must navigate an increasingly unpredictable passage."
    ]
  }
};

const defaultArticle = {
  category: "World | Britain",
  title: "The shifting sands of global diplomacy in a changing world",
  subtitle: "New alliances are forming as old certainties fade away",
  image: "/imgi_581_20260718_LDD002_FH.jpg",
  caption: "Diplomats face an increasingly complex landscape",
  credit: "PHOTOGRAPH: GETTY IMAGES",
  date: "Jul 22nd 2026",
  location: "NEW YORK",
  readTime: "4 min read",
  paragraphs: [
    "In the halls of the United Nations, a profound shift is underway. The bipolar certainties of the Cold War, and the unipolar moment of American dominance that followed, have definitively ended. We are now in an era of transactional multipolarity.",
    "Countries that were once reliable proxies or steadfast allies are increasingly charting their own course. They are forming ad-hoc coalitions based on specific interests rather than shared ideologies, complicating efforts to build consensus on global issues.",
    "This fragmentation is evident in everything from trade negotiations to climate accords. The old rules of the game no longer apply, and diplomats are struggling to adapt to a world where leverage is diffuse and unpredictable.",
    "As power shifts away from traditional centers, the institutions built to manage global affairs are straining under the pressure. The question is not whether a new order will emerge, but whether it can be managed peacefully."
  ]
};

const WORLD_COUNTRIES = ["United States", "China", "Europe", "Britain", "Middle East", "Africa", "Asia"];

// map backend post to article format
function mapBackendPost(post: any) {
  let mainCat = post.main_category || "Uncategorized";
  let subCat = "";
  try {
    const arr = typeof post.sub_categories === 'string' ? JSON.parse(post.sub_categories) : post.sub_categories;
    if (Array.isArray(arr) && arr.length > 0) {
      subCat = arr[0];
    }
  } catch(e) {}
  
  let category = mainCat;
  if (mainCat === 'World' && WORLD_COUNTRIES.includes(subCat)) {
    category = `World | ${subCat}`;
  } else if (WORLD_COUNTRIES.includes(mainCat)) {
    category = `World | ${mainCat}`;
  } else if (mainCat === 'World') {
    category = `World | ${subCat || 'News'}`;
  }
  
  // Format date: e.g. "Jul 22nd 2026"
  const dateObj = new Date(post.published_at || post.updated_at || post.created_at);
  const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
  const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: 'America/New_York' });

  return {
    isDynamic: true,
    category,
    title: post.title,
    subtitle: post.subtitle || post.card_summary,
    image: post.image_url || "/imgi_581_20260718_LDD002_FH.jpg",
    caption: post.meta_description || "",
    credit: "",
    date,
    time,
    updatedAt: post.updated_at,
    views: post.views,
    location: "",
    readTime: `${post.read_duration || 5} min read`,
    authorName: post.author_name || "John Cassidy",
    authorEmail: post.author_email || "",
    authorId: post.author_id,
    authorPhoto: post.author_profile_picture,
    authorLinkedin: post.author_linkedin_url,
    content: post.content || "",
    tags: Array.isArray(post.tags) ? post.tags : (typeof post.tags === 'string' && post.tags !== '' && post.tags !== 'null' ? JSON.parse(post.tags || '[]') : [])
  };
}


async function getMoreArticles(category: string, currentId: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/admin/published-posts?category=${encodeURIComponent(category)}&limit=10`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.posts.filter((p: any) => p.id?.toString() !== currentId.toString()).slice(0, 6);
  } catch (e) {
    return [];
  }
}

async function getDynamicArticle(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.post) return mapBackendPost(data.post);
    return null;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dynamicArticle = await getDynamicArticle(slug);
  const article = dynamicArticle || articleData[slug] || defaultArticle;
  
  const siteName = "Newyork Capital";
  const defaultImage = "/Newyork-Capital-Thumbnail.jpg";
  const imageUrl = article.image || defaultImage;

  return {
    title: `${article.title} | ${siteName}`,
    description: article.subtitle,
    openGraph: {
      title: `${article.title} | ${siteName}`,
      description: article.subtitle || "",
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | ${siteName}`,
      description: article.subtitle || "",
      images: [imageUrl],
    },
  };
}

import ViewTracker from "@/components/ViewTracker";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dynamicArticle = await getDynamicArticle(slug);
  const article = dynamicArticle || articleData[slug] || defaultArticle;
  const categoryParts = (article?.category || '').split('|').map((p: string) => p.trim());
  let mainCategory = categoryParts[0] || 'News';
  if (categoryParts.length > 1 && categoryParts[0] === 'World') {
    mainCategory = categoryParts[1];
  }
  const moreArticles = await getMoreArticles(mainCategory, slug);

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
    <>
      <ScrollToTop />
      <ViewTracker id={slug} initialViews={article?.views || 0} updatedAt={article?.updatedAt} />
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
      
      <main className="w-full flex-grow pt-8 pb-16">
        <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 lg:px-12">
          {/* Toolbar */}
          <ArticleToolbar article={{ ...article, slug }} />

          {/* Article Layout Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 w-full">
            
            {/* Main Content (Left) */}
            <div className="w-full lg:col-span-9 flex flex-col">
              
              {/* Article Header */}
              <div className="w-full mb-6 pl-3 md:pl-0">
                <p className="text-[13px] font-sans font-bold mb-3">
                  {(() => {
                    const parts = article.category.split('|');
                    if (parts.length > 1) {
                      return (
                        <>
                      <Link href={`/category/${encodeURIComponent(parts[0].trim().toLowerCase().replace(/\s*&\s*/g, '-and-').replace(/\s+/g, '-'))}`} className="text-[#E3120B] hover:text-[#00508f] transition-colors">
                            {parts[0].trim()}
                          </Link>
                          <span className="text-[#0f0f0f] mx-1.5 font-normal">|</span>
                          <Link href={`/category/${parts.slice(1).join('|').trim().toLowerCase().replace(/\s*&\s*/g, '-and-').replace(/\s+/g, '-')}`} className="text-[#0f0f0f] hover:underline hover:text-[#00508f] cursor-pointer">
                            {parts.slice(1).join('|').trim()}
                          </Link>
                        </>
                      );
                    }
                    return (
                      <Link href={`/category/${article.category.toLowerCase().replace(/\s*&\s*/g, '-and-').replace(/\s+/g, '-')}`} className="text-[#E3120B] hover:underline cursor-pointer">
                        {article.category}
                      </Link>
                    );
                  })()}
                </p>
                <h1 className="text-[34px] md:text-[40px] lg:text-[44px] font-serif font-bold leading-[1.1] text-[#0f0f0f] mb-4 tracking-tight">
                  {article.title}
                </h1>
                <h2 className="hidden md:block text-[20px] md:text-[24px] font-serif text-[#3b3b3b] mb-6 leading-snug">
                  {article.subtitle}
                </h2>
                
                {/* Author Block */}
                <AuthorProfile 
                  authorId={article.authorId}
                  authorName={article.authorName || "Ronda B"} 
                  authorEmail={article.authorEmail || ""} 
                  authorPhoto={article.authorPhoto}
                  authorLinkedin={article.authorLinkedin}
                  publishDate={`${article.date} AT ${article.time || '9:00 AM EDT'}`}
                  readTime={article.readTime}
                  article={{ ...article, slug }}
                />
              </div>

              {/* Article Image */}
              {(!article.isDynamic || (article.image && !article.content.includes(article.image.split('/').pop().split('?')[0]))) && (
                <div className="w-full mb-8">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-auto object-cover max-h-[600px]"
                  />
                  <div className="mt-2 text-[11px] font-sans text-[#767676] uppercase tracking-widest">
                    {article.credit}
                  </div>
                  {article.caption && (
                    <p className="mt-2 text-[14px] font-serif text-gray-700 italic">
                      {article.caption}
                    </p>
                  )}
                </div>
              )}

              {/* Mobile Subtitle (Description) under image */}
              <h2 className="block md:hidden text-[20px] font-serif text-[#3b3b3b] mb-6 px-3 leading-snug">
                {article.subtitle}
              </h2>

              {/* Article Body Container */}
              <div className="article-content text-[18px] md:text-[20px] font-serif leading-[1.6] text-[#0f0f0f] pt-4">
                {article.isDynamic ? (
                  <ResponsiveArticleWrapper 
                    htmlContent={article.content}
                    className="article-content prose prose-lg max-w-none flow-root text-[18px] md:text-[20px] font-serif leading-[1.6] text-[#0f0f0f] preview-content break-words break-all [&_a]:text-[#e3120b] [&_a]:underline [&_a]:font-bold [&_a]:transition-all [&_a:hover]:text-[#ff3333] [&_a:hover]:[text-shadow:0_0_8px_rgba(227,18,11,0.5)] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e3120b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 [&_blockquote]:bg-gray-50 [&_blockquote]:py-3 [&_blockquote]:pr-4 [&_blockquote]:flow-root [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:font-[inherit] [&_pre]:text-[inherit] [&_pre]:whitespace-pre-wrap [&_pre]:flow-root max-md:[&_blockquote]:!float-none max-md:[&_blockquote]:!w-full max-md:[&_blockquote]:!mx-auto" 
                  />
                ) : (
                  article.paragraphs.map((p: string, idx: number) => {
                    if (idx === 0) {
                      return (
                        <p key={idx} className="mb-6 drop-cap-para">
                          <span className="float-left text-[6.5rem] leading-[0.75] font-serif mr-3 pt-2 text-black">
                            {p.charAt(0)}
                          </span>
                          {p.slice(1)}
                        </p>
                      );
                    }
                    return (
                      <p key={idx} className="mb-6">
                        {p}
                      </p>
                    );
                  })
                )}
              </div>

              {/* Tags Section */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-10 mb-2 pb-2">
                  <div className="flex flex-wrap gap-1.5 text-[13px] font-bold text-[#888] uppercase tracking-wider">
                    {article.tags.map((tag: string, i: number) => (
                      <span key={tag} className="flex items-center gap-1.5">
                        <Link href={`/category/${encodeURIComponent(tag.toLowerCase())}`} className="hover:text-[#00508f] transition-colors">
                          #{tag}
                        </Link>
                        {i < article.tags.length - 1 && <span className="text-gray-300">,</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
            </div>

                        {/* Right Sidebar (Ads) */}
            <div className="w-full lg:col-span-3 flex flex-col pt-1 gap-8">
              
              {/* Ad 1 */}
              <div className="flex flex-col items-center w-full">
                <span className="text-[10px] text-[#999] uppercase tracking-widest mb-1 font-sans">Advertisement</span>
                {adsMap.details_sidebar_1 ? (
                  getAdHref(adsMap.details_sidebar_1) ? (
                    <a href={getAdHref(adsMap.details_sidebar_1)} target="_blank" className="w-full max-w-[300px] h-[600px] relative overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer hover:opacity-95 transition-opacity">
                      <img src={adsMap.details_sidebar_1.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="w-full max-w-[300px] h-[600px] relative overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={adsMap.details_sidebar_1.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="w-full max-w-[300px] h-[600px] bg-gray-50 border border-gray-200 flex flex-col items-center justify-center">
                    <span className="text-gray-400 font-sans text-[15px] font-bold">300 x 600</span>
                  </div>
                )}
              </div>

              {/* Ad 2 */}
              <div className="flex flex-col items-center w-full mt-4">
                <span className="text-[10px] text-[#999] uppercase tracking-widest mb-1 font-sans">Advertisement</span>
                {adsMap.details_sidebar_2 ? (
                  getAdHref(adsMap.details_sidebar_2) ? (
                    <a href={getAdHref(adsMap.details_sidebar_2)} target="_blank" className="w-full max-w-[300px] h-[600px] relative overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer hover:opacity-95 transition-opacity">
                      <img src={adsMap.details_sidebar_2.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <div className="w-full max-w-[300px] h-[600px] relative overflow-hidden bg-gray-50 flex-shrink-0">
                      <img src={adsMap.details_sidebar_2.image_url} alt="Advertisement" className="w-full h-full object-cover" />
                    </div>
                  )
                ) : (
                  <div className="w-full max-w-[300px] h-[600px] bg-gray-50 border border-gray-200 flex flex-col items-center justify-center">
                    <span className="text-gray-400 font-sans text-[15px] font-bold">300 x 600</span>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* More from Category */}
          <div className="w-full mt-16 pt-8 border-t-[1px] border-black">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-[20px] font-sans flex items-center cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a]">
                More from {mainCategory} 
                <span className="ml-1 text-xl">&rarr;</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-16">
              
              {/* Column 1: Article 1 */}
              {moreArticles[0] && (
                <div className="md:col-span-5 flex flex-col">
                  <Link href={`/article/${moreArticles[0].slug || moreArticles[0].id}`} className="group flex flex-col">
                    <img src={moreArticles[0].image_url || '/imgi_575_20260718_WOT913.png'} alt={moreArticles[0].title} className="w-full aspect-[1.5] object-cover mb-4" />
                    <h4 className="line-clamp-2 text-[24px] font-serif text-[#003a6a] leading-tight mb-2 underline decoration-1 underline-offset-[3px] transition-colors">
                      {moreArticles[0].title}
                    </h4>
                    <p className="text-[15px] font-serif text-[#333] mb-3 line-clamp-2">{moreArticles[0].card_summary || moreArticles[0].meta_description || 'Read more about this trending topic.'}</p>
                    <span className="text-[12px] font-sans text-[#666] tracking-wider uppercase">{moreArticles[0].read_duration ? `${moreArticles[0].read_duration} min read` : "5 min read"}</span>
                  </Link>
                </div>
              )}

              {/* Column 2: Article 2 & 3 */}
              <div className="md:col-span-4 flex flex-col gap-6">
                {moreArticles[1] && (
                  <Link href={`/article/${moreArticles[1].slug || moreArticles[1].id}`} className="group flex flex-row gap-4 items-start pb-6 border-b border-gray-200">
                    <div className="flex-1 flex flex-col">
                      <h4 className="line-clamp-2 text-[17px] font-serif text-[#0f0f0f] leading-snug mb-2 group-hover:text-[#00508f] transition-colors">{moreArticles[1].title}</h4>
                      <p className="text-[14px] font-serif text-[#333] mb-3 line-clamp-2">{moreArticles[1].card_summary || moreArticles[1].meta_description}</p>
                      <span className="text-[11px] font-sans text-[#666] tracking-wider uppercase">{moreArticles[1].read_duration ? `${moreArticles[1].read_duration} min read` : "5 min read"}</span>
                    </div>
                    <img src={moreArticles[1].image_url || '/imgi_576_20260718_EUD000.jpg'} alt={moreArticles[1].title} className="w-[130px] aspect-[1.5] object-cover flex-shrink-0" />
                  </Link>
                )}
                {moreArticles[2] && (
                  <Link href={`/article/${moreArticles[2].slug || moreArticles[2].id}`} className="group flex flex-row gap-4 items-start pb-6">
                    <div className="flex-1 flex flex-col">
                      <h4 className="line-clamp-2 text-[17px] font-serif text-[#0f0f0f] leading-snug mb-2 group-hover:text-[#00508f] transition-colors">{moreArticles[2].title}</h4>
                      <p className="text-[14px] font-serif text-[#333] mb-3 line-clamp-2">{moreArticles[2].card_summary || moreArticles[2].meta_description}</p>
                      <span className="text-[11px] font-sans text-[#666] tracking-wider uppercase">{moreArticles[2].read_duration ? `${moreArticles[2].read_duration} min read` : "5 min read"}</span>
                    </div>
                    <img src={moreArticles[2].image_url || '/imgi_577_20260718_EUP002.jpg'} alt={moreArticles[2].title} className="w-[130px] aspect-[1.5] object-cover flex-shrink-0" />
                  </Link>
                )}
              </div>

              {/* Column 3: Article 4, 5 & 6 */}
              <div className="md:col-span-3 flex flex-col gap-6">
                {moreArticles[3] && (
                  <Link href={`/article/${moreArticles[3].slug || moreArticles[3].id}`} className="group flex flex-row gap-4 items-start pb-6 border-b border-gray-200">
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-[15px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#00508f] transition-colors line-clamp-2">{moreArticles[3].title}</h4>
                      <span className="text-[11px] font-sans text-[#666] tracking-wider uppercase">{moreArticles[3].read_duration ? `${moreArticles[3].read_duration} min read` : "5 min read"}</span>
                    </div>
                    <img src={moreArticles[3].image_url || '/imgi_575_20260718_WOT913.png'} alt={moreArticles[3].title} className="w-[80px] aspect-[1.5] object-cover flex-shrink-0" />
                  </Link>
                )}
                {moreArticles[4] && (
                  <Link href={`/article/${moreArticles[4].slug || moreArticles[4].id}`} className="group flex flex-row gap-4 items-start pb-6 border-b border-gray-200">
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-[15px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#00508f] transition-colors line-clamp-2">{moreArticles[4].title}</h4>
                      <span className="text-[11px] font-sans text-[#666] tracking-wider uppercase">{moreArticles[4].read_duration ? `${moreArticles[4].read_duration} min read` : "5 min read"}</span>
                    </div>
                    <img src={moreArticles[4].image_url || '/imgi_576_20260718_EUD000.jpg'} alt={moreArticles[4].title} className="w-[80px] aspect-[1.5] object-cover flex-shrink-0" />
                  </Link>
                )}
                {moreArticles[5] && (
                  <Link href={`/article/${moreArticles[5].slug || moreArticles[5].id}`} className="group flex flex-row gap-4 items-start pb-6">
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-[15px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#00508f] transition-colors line-clamp-2">{moreArticles[5].title}</h4>
                      <span className="text-[11px] font-sans text-[#666] tracking-wider uppercase">{moreArticles[5].read_duration ? `${moreArticles[5].read_duration} min read` : "5 min read"}</span>
                    </div>
                    <img src={moreArticles[5].image_url || '/imgi_577_20260718_EUP002.jpg'} alt={moreArticles[5].title} className="w-[80px] aspect-[1.5] object-cover flex-shrink-0" />
                  </Link>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
    </>

  );
}
