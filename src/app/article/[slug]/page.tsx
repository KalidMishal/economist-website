import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleData[slug] || defaultArticle;
  return {
    title: `${article.title} | The Economist Clone`,
    description: article.subtitle,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleData[slug] || defaultArticle;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="w-full flex-grow pt-8 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
          
          {/* Article Layout Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 w-full">
            
            {/* Main Content (Left) */}
            <div className="w-full lg:col-span-9 flex flex-col">
              
              {/* Article Header */}
              <div className="w-full mb-6">
                <p className="text-[13px] font-sans font-bold mb-3">
                  {(() => {
                    const parts = article.category.split('|');
                    if (parts.length > 1) {
                      return (
                        <>
                          <Link href={`/topics/${parts[0].trim().toLowerCase().replace(/\s+/g, '-')}`} className="text-[#E3120B] hover:underline cursor-pointer">
                            {parts[0].trim()}
                          </Link>
                          <span className="text-[#0f0f0f] mx-1.5 font-normal">|</span>
                          <Link href={`/topics/${parts.slice(1).join('|').trim().toLowerCase().replace(/\s+/g, '-')}`} className="text-[#0f0f0f] hover:underline hover:text-[#00508f] cursor-pointer">
                            {parts.slice(1).join('|').trim()}
                          </Link>
                        </>
                      );
                    }
                    return (
                      <Link href={`/topics/${article.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#E3120B] hover:underline cursor-pointer">
                        {article.category}
                      </Link>
                    );
                  })()}
                </p>
                <h1 className="text-[34px] md:text-[40px] lg:text-[44px] font-serif font-bold leading-[1.1] text-[#0f0f0f] mb-4 tracking-tight">
                  {article.title}
                </h1>
                <h2 className="text-[20px] md:text-[24px] font-serif text-[#3b3b3b] mb-6 leading-snug">
                  {article.subtitle}
                </h2>
                
                {/* Author Block */}
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-6">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Author" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold text-[#0f0f0f]">By</span>
                      <Link href="/author/ronda-b" className="text-[14px] font-bold text-[#0f0f0f] hover:underline">
                        Ronda B
                      </Link>
                      <a href="#" aria-label="LinkedIn" className="text-[#0077b5] ml-0.5 -mt-[2px]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                    <div className="text-[11px] text-[#767676] font-sans flex items-center gap-1.5 mt-0.5 tracking-wider">
                      <span>Published <span className="uppercase">{article.date} AT 9:02 AM EDT</span></span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Image */}
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

              {/* Article Body Container */}
              <div className="article-content text-[18px] md:text-[20px] font-serif leading-[1.6] text-[#0f0f0f] pt-4 border-t border-gray-300">
                {article.paragraphs.map((p: string, idx: number) => {
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
                })}
              </div>

              {/* Tags Section */}
              <div className="mt-10 mb-2 pb-2">
                <div className="flex flex-wrap gap-1.5 text-[13px] font-bold text-[#888] uppercase tracking-wider">
                  <Link href="#" className="hover:text-[#00508f] transition-colors">#INDIAN STUDENT PROTESTERS</Link><span className="text-gray-300">,</span>
                  <Link href="#" className="hover:text-[#00508f] transition-colors">#POLICE CRACKDOWN</Link><span className="text-gray-300">,</span>
                  <Link href="#" className="hover:text-[#00508f] transition-colors">#BLENDING</Link><span className="text-gray-300">,</span>
                  <Link href="#" className="hover:text-[#00508f] transition-colors">#DIGITAL CULTURE</Link>
                </div>
              </div>
              {/* End of article line removed */}
              
            </div>

            {/* Right Sidebar (Recent in Category) */}
            <div className="w-full lg:col-span-3 flex flex-col pt-1">
              <h3 className="text-[13px] font-bold font-serif uppercase tracking-widest text-black mb-6 border-b border-gray-900 pb-2">
                Recent in {article.category.split('|')[0].trim()}
              </h3>
              
              <div className="flex flex-col gap-6">
                {[
                  { title: "Man Arrested in South Yorkshire Over Ann...", date: "Jul 12, 2026", img: "/imgi_572_20260718_BRD001.jpg", slug: "man-arrested-south-yorkshire" },
                  { title: "China Evacuates Nearly Two Million People as...", date: "Jul 12, 2026", img: "/imgi_573_20260718_CND001.jpg", slug: "china-evacuates-nearly" },
                  { title: "British Couple Seriously Injured Afte...", date: "Jul 14, 2026", img: "/imgi_574_20260718_AMP001.jpg", slug: "british-couple-injured" },
                  { title: "China Evacuates Nearly Two Million Residents...", date: "Jul 13, 2026", img: "/imgi_13_20260718_BLP502-1-1024x576.jpg", slug: "china-evacuates-residents" },
                  { title: "Two Killed, Several Injured in Shooting at...", date: "Jul 12, 2026", img: "/imgi_581_20260718_LDD002_FH.jpg", slug: "two-killed-several-injured" }
                ].map((item, i) => (
                  <Link href={`/article/${item.slug}`} key={i} className="flex gap-4 group cursor-pointer border-b border-gray-100 pb-6 last:border-b-0 items-stretch">
                    <div className="w-[125px] flex-shrink-0 bg-gray-200 overflow-hidden">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Thumbnail" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-serif font-bold text-[15px] leading-snug group-hover:text-[#00508f] group-hover:underline transition-colors line-clamp-3">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-sans text-gray-400 mt-1 uppercase tracking-wider">{item.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Share Button Section */}
          <div className="w-full lg:w-[75%] mt-6 border-t border-gray-300 pt-8 mb-4">
            <div className="flex">
              <button className="flex items-center gap-3 border border-gray-300 rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <span className="text-[16px] font-bold">Share</span>
              </button>
            </div>
          </div>

          {/* More from Category */}
          <div className="w-full mt-16 pt-8 border-t-[1px] border-black">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-[20px] font-sans flex items-center cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a]">
                More from {article.category.split('|')[0].trim()} 
                <span className="ml-1 text-xl">&rarr;</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Article 1 */}
              <Link href={`/article/fallback-article-1-${Math.random().toString(36).substring(7)}`} className="flex flex-col group">
                <img src="/imgi_575_20260718_WOT913.png" alt="More 1" className="w-full aspect-[3/2] object-cover mb-3" />
                <h4 className="text-[19px] font-serif font-bold text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] cursor-pointer transition-colors pr-2">
                  A new geopolitical reality takes shape
                </h4>
                <p className="text-[14px] font-serif text-gray-700">Global alliances are shifting faster than expected.</p>
              </Link>
              {/* Article 2 */}
              <Link href={`/article/fallback-article-2-${Math.random().toString(36).substring(7)}`} className="flex flex-col group">
                <img src="/imgi_576_20260718_EUD000.jpg" alt="More 2" className="w-full aspect-[3/2] object-cover mb-3" />
                <h4 className="text-[19px] font-serif font-bold text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] cursor-pointer transition-colors pr-2">
                  Economic pressures mount in capital cities
                </h4>
                <p className="text-[14px] font-serif text-gray-700">Inflation and interest rates continue to squeeze budgets.</p>
              </Link>
              {/* Article 3 */}
              <Link href={`/article/fallback-article-3-${Math.random().toString(36).substring(7)}`} className="flex flex-col group">
                <img src="/imgi_577_20260718_EUP002.jpg" alt="More 3" className="w-full aspect-[3/2] object-cover mb-3" />
                <h4 className="text-[19px] font-serif font-bold text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] cursor-pointer transition-colors pr-2">
                  The future of technological innovation
                </h4>
                <p className="text-[14px] font-serif text-gray-700">AI and robotics are fundamentally altering the workforce.</p>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
