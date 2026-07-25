import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WeeklyEditionPage() {
  const worldThisWeek = [
    { tag: "The world this week", title: "Politics", readTime: "5 min read" },
    { tag: "The world this week", title: "Business", readTime: "4 min read" },
    { tag: "The world this week", title: "Cartoon: Continuing uncertainty over the Strait of Hormuz", readTime: "1 min read" }
  ];

  const leaders = [
    { tag: "Our cover", title: "It's too darn hot. Blame global dimming", subtitle: "Earth is absorbing a lot more sunshine", readTime: "5 min read", img: "/imgi_582_20260704_ESD005.jpg" },
    { tag: "Our cover", title: "Donald Trump's gutting of the Department of Justice", subtitle: "What the degraded institution means for America", readTime: "5 min read", img: "/imgi_581_20251220_XMD035.jpg" },
    { tag: "A man, no plan, Iran", title: "Donald Trump's blind alley", subtitle: "America's president looks bereft of good options for solving the stand-off in the Gulf", readTime: "3 min read", img: "/imgi_581_20260718_LDD002_FH.jpg" },
    { tag: "Lonely hearts clubbed", title: "China's rulers have a woman problem", subtitle: "Antagonism between the sexes does nothing to address China's demographic problems", readTime: "4 min read", img: "/imgi_576_20260718_EUD000.jpg" }
  ];

  const letters = [
    { tag: "A selection of correspondence", title: "The United States is once again in a state of rebellion", subtitle: "Also this week, the backlash against AI, homelessness, Eisenhower and roads, oil predictions", readTime: "6 min read", img: "/imgi_295_20260310_drp061.png" }
  ];

  const byInvitation = [
    { tag: "The psychological battle", title: "Would Europeans fight, if it came to that?", subtitle: "Putting boots on the ground would not help Ukraine, but it might help Europe find the stomach for war, writes Nathalie Tocci", readTime: "5 min read", img: "/imgi_309_20250121_DRP043.png" }
  ];

  const briefing = [
    { tag: "What is at stake for Israel?", title: "Israel's future hangs in the balance", subtitle: "The country's coming election may be its most important ever", readTime: "13 min read", img: "/20260718_DE_AP.jpg" }
  ];

  const fourColSections = [
    {
      name: "Asia",
      mainArticle: { tag: "Myanmar", title: "Is Aung San Suu Kyi dead?", subtitle: "Myanmar's jailed leader has not been seen since 2022", readTime: "5 min read", img: "/imgi_382_20260718_ASP001.jpg" },
      col3Articles: [
        { tag: "Magical mystery tour", title: "An unreliable America is drawing Asia's middle powers closer", readTime: "3 min read" },
        { tag: "Prince and purge", title: "A real but selective crackdown on Cambodia's scam industry", readTime: "4 min read" }
      ],
      col4Articles: [
        { tag: "Lingering spirits", title: "Haunted houses are in demand in Japan", readTime: "3 min read" },
        { tag: "Ashoka", title: "An incomplete list of falling objects in India", readTime: "4 min read" }
      ]
    },
    {
      name: "China",
      mainArticle: { tag: "Sex imbalance", title: "China is dealing with its own manosphere", subtitle: "But online misogyny is only one corner of a much bigger problem", readTime: "7 min read", img: "/imgi_576_20260718_EUD000.jpg" },
      col3Articles: [
        { tag: "Biting the dust", title: "Xi Jinping expels another leader from his top team", readTime: "2 min read" },
        { tag: "Chaguan", title: "A squeezed China is trying to wring more from its state assets", readTime: "5 min read" }
      ],
      col4Articles: [
        { tag: "No more bots", title: "China wants to end AI romances", readTime: "4 min read" }
      ]
    },
    {
      name: "United States",
      mainArticle: { tag: "The rule of law", title: "Donald Trump's transformation of the Department of Justice will be hard to undo", subtitle: "Political prosecutions are just part of a more radical reinvention", readTime: "10 min read", img: "/imgi_581_20251220_XMD035.jpg" },
      col3Articles: [
        { tag: "Not so fast", title: "Democrats challenge a big Hollywood tie-up", readTime: "4 min read" },
        { tag: "Tortured voters", title: "America's other elections problem", readTime: "5 min read" }
      ],
      col4Articles: [
        { tag: "The night shift", title: "Cities are rethinking what happens after dark", readTime: "4 min read" },
        { tag: "Lexington", title: "Lindsey Graham tried to save the wrong countries from Donald Trump", readTime: "6 min read" }
      ]
    },
    {
      name: "The Americas",
      mainArticle: { tag: "The Americas chokepoint", title: "The Panama Canal is growing more important", subtitle: "And the challenges to it are getting more acute", readTime: "6 min read", img: "/imgi_581_20260718_LDD002_FH.jpg" },
      col3Articles: [
        { tag: "White sand, white coats, murky water", title: "The biggest schools training America's doctors are in the Caribbean", readTime: "3 min read" }
      ],
      col4Articles: [
        { tag: "Best of enemies", title: "Argentina v England is one of the most intense rivalries in sport", readTime: "3 min read" }
      ]
    },
    {
      name: "Middle East & Africa",
      mainArticle: { tag: "A straitjacket of their own making", title: "Donald Trump has no good options for reopening the Strait of Hormuz", subtitle: "Yet the stand-off has costs for cash-strapped Iran, too", readTime: "6 min read", img: "/imgi_576_20260718_EUD000.jpg" },
      col3Articles: [
        { tag: "Whose friend?", title: "America's other battle with Iran", readTime: "5 min read" },
        { tag: "How many is too many?", title: "A hit new show takes on polygamy in modern South Africa", readTime: "2 min read" }
      ],
      col4Articles: [
        { tag: "Uncontained", title: "The Ebola epidemic is getting out of control", readTime: "5 min read" },
        { tag: "A crumbling legacy", title: "How to preserve Africa's architectural gems", readTime: "4 min read" }
      ]
    },
    {
      name: "Europe",
      mainArticle: { tag: "Culture wars", title: "Ukraine's reformist defence minister is ousted", subtitle: "The generals pushed back at his efforts to modernise the army", readTime: "5 min read", img: "/imgi_577_20260718_EUP002.jpg" },
      leftSecondaryArticle: { tag: "Charlemagne", title: "In praise of Scandinavia's risky and dirty playgrounds", readTime: "5 min read" },
      col3Articles: [
        { tag: "Carbon tax me, but not yet", title: "Europe seems set to ease its carbon pricing", readTime: "3 min read" },
        { tag: "The fall of a wall", title: "Opening the border between Spain and Gibraltar", readTime: "3 min read" }
      ],
      col4Articles: [
        { tag: "Zero-migration populism", title: "Sweden squashed migration. The populist right wants to go further", readTime: "4 min read" },
        { tag: "A flight curse", title: "Why Berlin's airport is still completely hopeless", readTime: "2 min read" }
      ]
    }
  ];

  const renderFourColSection = (section: any) => (
    <section key={section.name} id={section.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <div className="w-full border-t border-black mb-6"></div>
      <h3 className="text-[18px] font-bold text-black mb-6">{section.name}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
        
        {/* Col 1 & 2 (Image + Text block, plus optional bottom article) */}
        <div className="lg:col-span-2 flex flex-col gap-6 border-b border-[#e6e6e6] pb-6 mb-6 lg:border-none lg:pb-0 lg:mb-0">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <img src={section.mainArticle.img} alt={section.mainArticle.title} className="w-full aspect-[3/2] object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <span className="text-[11px] font-bold text-[#e3120b] mb-2">{section.mainArticle.tag}</span>
              <h4 className="text-[20px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{section.mainArticle.title}</h4>
              <p className="text-[15px] font-serif text-[#333] mb-4 leading-snug">{section.mainArticle.subtitle}</p>
              <span className="text-[12px] text-[#555] mt-auto">{section.mainArticle.readTime}</span>
            </div>
          </div>
          
          {/* Optional Left Secondary Article (Rendered in the first column width) */}
          {section.leftSecondaryArticle && (
            <div className="w-full md:w-1/2 flex flex-col pt-2">
              <span className="text-[11px] font-bold text-[#e3120b] mb-2">{section.leftSecondaryArticle.tag}</span>
              <h4 className="text-[16px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{section.leftSecondaryArticle.title}</h4>
              <span className="text-[12px] text-[#555] mt-auto">{section.leftSecondaryArticle.readTime}</span>
            </div>
          )}
        </div>
        
        {/* Col 3 */}
        <div className="flex flex-col">
          {section.col3Articles.map((item: any, i: number) => (
            <div key={i} className={`flex flex-col ${i < section.col3Articles.length - 1 ? 'border-b border-[#e6e6e6] pb-6 mb-6' : ''}`}>
              <span className="text-[11px] font-bold text-[#e3120b] mb-2">{item.tag}</span>
              <h4 className="text-[16px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{item.title}</h4>
              <span className="text-[12px] text-[#555] mt-auto">{item.readTime}</span>
            </div>
          ))}
        </div>

        {/* Col 4 */}
        <div className="flex flex-col">
          {section.col4Articles.map((item: any, i: number) => (
            <div key={i} className={`flex flex-col ${i < section.col4Articles.length - 1 ? 'border-b border-[#e6e6e6] pb-6 mb-6' : ''}`}>
              <span className="text-[11px] font-bold text-[#e3120b] mb-2">{item.tag}</span>
              <h4 className="text-[16px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{item.title}</h4>
              <span className="text-[12px] text-[#555] mt-auto">{item.readTime}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <div className="w-full bg-[#f4efe6] pt-12 pb-16">
          <div className="max-w-[1380px] mx-auto px-4 xl:px-0 flex flex-col md:flex-row items-center justify-between">
            {/* Left side text */}
            <div className="flex flex-col items-center justify-center text-center w-full md:w-1/2 mb-10 md:mb-0">
              <span className="text-[12px] font-bold text-[#e3120b] uppercase tracking-[0.1em] mb-4">Weekly Edition</span>
              <h1 className="text-[42px] font-serif font-medium text-black leading-tight">July 18th 2026</h1>
              <h2 className="text-[42px] font-serif font-bold text-black leading-tight mb-8">It&apos;s too darn hot</h2>
              
              <div className="flex items-center gap-4">
                <button className="border border-[#bbb] rounded-full px-5 py-[6px] text-[14px] font-bold text-[#333] hover:bg-white transition-colors">
                  Past editions
                </button>
                <div className="flex items-center gap-2">
                  <button className="w-[36px] h-[36px] border border-[#bbb] rounded-full flex items-center justify-center text-[#777] hover:bg-white hover:text-black transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button className="w-[36px] h-[36px] border border-[#bbb] rounded-full flex items-center justify-center text-[#777] hover:bg-white hover:text-black transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right side image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img 
                src="/20260718_DE_AP.jpg" 
                alt="Magazine Cover" 
                className="w-[420px] max-w-full h-auto shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Contents Header */}
        <div className="w-full max-w-[1380px] mx-auto px-4 xl:px-0 mt-10 mb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[32px] font-bold text-[#e3120b] leading-none">Contents</h2>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-black">Jump to</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-[#ccc] text-[14px] font-medium px-4 py-2 pr-10 rounded-sm outline-none cursor-pointer w-[200px]">
                  <option>Choose section...</option>
                  <option>The world this week</option>
                  <option>Leaders</option>
                  <option>Letters</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full border-t border-black mb-8"></div>
        </div>

        {/* Sections Wrapper */}
        <div className="max-w-[1380px] mx-auto px-4 xl:px-0 flex flex-col gap-12 pb-24">
          
          {/* The world this week */}
          <section id="the-world-this-week">
            <h3 className="text-[18px] font-bold text-black mb-4">The world this week</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
              {worldThisWeek.map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-[#e6e6e6] pb-4">
                  <span className="text-[11px] font-bold text-[#e3120b] mb-2">{item.tag}</span>
                  <h4 className="text-[16px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{item.title}</h4>
                  <span className="text-[12px] text-[#555] mt-auto">{item.readTime}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Leaders */}
          <section id="leaders">
            <div className="w-full border-t border-[#e6e6e6] mb-8"></div>
            <h3 className="text-[18px] font-bold text-black mb-4">Leaders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {leaders.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  {item.img && (
                    <img src={item.img} alt={item.title} className="w-full aspect-[3/2] object-cover mb-3" />
                  )}
                  <span className="text-[11px] font-bold text-[#e3120b] mb-2">{item.tag}</span>
                  <h4 className="text-[20px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{item.title}</h4>
                  <p className="text-[15px] font-serif text-[#333] mb-3 leading-snug">{item.subtitle}</p>
                  <span className="text-[12px] text-[#555] mt-auto">{item.readTime}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Letters */}
          <section id="letters">
            <div className="w-full border-t border-[#e6e6e6] mb-8"></div>
            <h3 className="text-[18px] font-bold text-black mb-4">Letters</h3>
            <div className="flex flex-col gap-8">
              {letters.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 items-start border-b border-[#e6e6e6] pb-8">
                  <div className="w-full md:w-[280px] bg-[#f2f2f2] flex items-center justify-center p-4">
                    <img src={item.img} alt={item.title} className="max-h-[140px] w-auto object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-[11px] font-bold text-[#e3120b] mb-2">{item.tag}</span>
                    <h4 className="text-[20px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{item.title}</h4>
                    <p className="text-[15px] font-serif text-[#333] mb-4 leading-snug">{item.subtitle}</p>
                    <span className="text-[12px] text-[#555] mt-auto">{item.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* By Invitation */}
          <section id="by-invitation">
            <div className="w-full border-t border-[#e6e6e6] mb-8"></div>
            <h3 className="text-[18px] font-bold text-black mb-4">By Invitation</h3>
            <div className="flex flex-col gap-8">
              {byInvitation.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 items-start border-b border-[#e6e6e6] pb-8">
                  <div className="w-full md:w-[280px] bg-[#f2f2f2] flex items-center justify-center p-4">
                    <img src={item.img} alt={item.title} className="max-h-[140px] w-auto object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-[11px] font-bold text-[#e3120b] mb-2">{item.tag}</span>
                    <h4 className="text-[20px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{item.title}</h4>
                    <p className="text-[15px] font-serif text-[#333] mb-4 leading-snug">{item.subtitle}</p>
                    <span className="text-[12px] text-[#555] mt-auto">{item.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Briefing */}
          <section id="briefing">
            <div className="w-full border-t border-[#e6e6e6] mb-8"></div>
            <h3 className="text-[18px] font-bold text-black mb-4">Briefing</h3>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
              {briefing.map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-[#e6e6e6] pb-8">
                  <img src={item.img} alt={item.title} className="w-full aspect-[3/2] object-cover mb-4" />
                  <span className="text-[11px] font-bold text-[#e3120b] mb-2">{item.tag}</span>
                  <h4 className="text-[20px] font-serif font-medium text-black hover:text-[#00508f] hover:underline cursor-pointer transition-colors leading-tight mb-2">{item.title}</h4>
                  <p className="text-[15px] font-serif text-[#333] mb-4 leading-snug">{item.subtitle}</p>
                  <span className="text-[12px] text-[#555] mt-auto">{item.readTime}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Render All 4-Column Sections (Asia, China, US, Americas, Middle East, Europe) */}
          {fourColSections.map(section => renderFourColSection(section))}

        </div>
      </main>

      <Footer />
    </div>
  );
}

