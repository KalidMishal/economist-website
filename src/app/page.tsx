import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LatestVideos from "@/components/LatestVideos";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="w-full flex-grow">
        
        {/* Top Hero Section */}
        <div className="max-w-[1380px] mx-auto flex flex-col lg:flex-row mt-10 mb-10">
          
          {/* Left + Center Wrapper */}
          <div className="w-full lg:w-[75%] flex flex-col pr-5">
            
            {/* Top Row: Original Left and Center */}
            <div className="flex flex-col lg:flex-row mb-12">
              {/* Left Column */}
              <div className="w-full lg:w-[43%] flex flex-col items-center text-center px-4 pt-10">
                <span className="text-[#E3120B] text-[11px] font-bold uppercase tracking-widest mb-3">Politics | Law &amp; Justice</span>
                <Link href="/article/donald-trump-doj">
                  <h2 className="text-[42px] font-serif text-[#0f0f0f] mb-3 leading-[1.05] tracking-tight cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                    Donald Trump's gutting of the Department of Justice
                  </h2>
                </Link>
                <p className="text-[22px] font-serif text-[#3b3b3b] mb-4 leading-snug">
                  What the degraded institution means for America
                </p>
                <span className="text-[#767676] text-[12px] mb-8 font-semibold">5 min read</span>
                
                <div className="flex items-start text-left gap-2 max-w-[280px]">
                  <span className="text-[#E3120B] font-bold text-xl leading-none mt-[-3px]">&rarr;</span>
                  <p className="text-[13px] font-bold text-[#0f0f0f] leading-snug">
                    Political prosecutions are part of a more radical reinvention of the DOJ
                  </p>
                </div>
              </div>

              {/* Center Column */}
              <div className="w-full lg:w-[57%] px-3">
                <Link href="/article/donald-trump-doj">
                  <img 
                    src="/imgi_581_20260718_LDD002_FH.jpg" 
                    alt="Department of Justice Cover" 
                    className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </Link>
              </div>
            </div>

            <div className="w-full h-[1px] bg-black mb-6"></div>

            {/* Bottom Row: The Insider Section */}
            <div className="w-full flex flex-col px-3">
               <div className="flex items-center gap-1 mb-2">
                 <span className="text-[15px] font-bold text-[#0f0f0f] tracking-tight">Insider</span>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </div>
               
               <div className="w-full bg-[#0a0a0a] text-white">
                 {/* Main Banner Area */}
                 <div className="flex flex-col md:flex-row">
                   <div className="w-full md:w-[45%]">
                     <Link href="/article/fallback-article"><img src="/imgi_13_20260718_BLP502-1-1024x576.jpg" className="w-full h-full object-cover" alt="Marine Le Pen" /></Link>
                   </div>
                   <div className="w-full md:w-[55%] p-8 flex flex-col items-center text-center justify-center">
                      <span className="text-[#d8a873] text-[10px] font-bold uppercase tracking-widest mb-4">World | Europe</span>
                      <Link href="/article/president-le-pen-france" className="group">
                        <h3 className="text-[34px] font-serif mb-4 leading-[1.1] tracking-tight max-w-[90%] mx-auto cursor-pointer group-hover:text-white group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-white transition-all">
                          What would a President Le Pen mean for France&mdash;and the world?
                        </h3>
                      </Link>
                      <p className="text-[16px] font-serif text-gray-200 mb-6 max-w-[85%] mx-auto leading-snug">
                        The populist leader is now the favourite to win next year's election
                      </p>
                      <p className="text-[12px] font-sans font-medium text-gray-300 mb-5">
                        Recorded on Jul 16th 2026
                      </p>
                      <button className="flex items-center gap-3 text-[14px] font-bold group">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                        46 min
                      </button>
                   </div>
                 </div>

                 {/* Sponsorship Footer Area */}
                 <div className="w-full bg-[#0a0a0a] border-t border-[#333333] flex items-center justify-center py-6">
                    <div className="flex flex-col items-end justify-center w-[45%] pr-6">
                       <Link href="/article/fallback-article"><img src="/imgi_14_sponsorship-insider-anthropic-mar-2.png" alt="Supported by Anthropic" className="h-[34px] w-auto object-contain" /></Link>
                    </div>
                    <div className="w-[1px] h-[64px] bg-[#333333]"></div>
                    <div className="flex flex-col justify-center w-[55%] pl-6">
                       <p className="text-[13.5px] text-[#e6e6e6] font-sans font-medium leading-[1.3] tracking-tight">
                         Insider is a product of <span className="italic font-serif font-bold text-[14.5px]">The</span><br/>
                         <span className="italic font-serif font-bold text-[14.5px]">Economist</span> and thus editorially<br/>
                         independent.
                       </p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Third Row: Britain / China / Americas */}
            <div className="w-full h-[1px] bg-black mt-10 mb-5"></div>
            
            <div className="flex flex-col lg:flex-row w-full px-3 mb-10">
              {/* Left Column (Andy Burnham) */}
              <div className="w-full lg:w-[52%] pr-6 flex flex-col">
                <Link href="/article/andy-burnham-mps">
                  <img src="/imgi_572_20260718_BRD001.jpg" alt="Andy Burnham" className="w-full h-auto object-cover mb-3 cursor-pointer hover:opacity-90 transition-opacity" />
                </Link>
                <span className="text-[#E3120B] text-[13px] font-sans mb-1.5 mt-1">World | Britain</span>
                <Link href="/article/andy-burnham-mps" className="group">
<h3 className="text-[32px] font-serif text-[#0f0f0f] leading-[1.1] mb-2 cursor-pointer group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Can Andy Burnham keep his own MPs under control?
                  </h3>
</Link>
                <p className="text-[16px] font-serif text-[#0f0f0f] mb-3 leading-snug">
                  Britain's prime-minister-to-be faces a big task to maintain his authority
                </p>
                <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-1">5 min read</span>
              </div>

              {/* Right Column (Stacked articles) */}
              <div className="w-full lg:w-[48%] pl-6 flex flex-col border-l border-[#e6e6e6]">
                
                {/* Article 1: China */}
                <div className="flex flex-row w-full pb-6">
                  <div className="w-[58%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[13px] font-sans mb-1.5 mt-[-2px]">World | China</span>
                    <Link href="/article/china-ai-romances" className="group">
<h4 className="text-[23px] font-serif text-[#0f0f0f] leading-tight mb-2 cursor-pointer group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                        China wants to end AI romances
                      </h4>
</Link>
                    <p className="text-[15px] font-serif text-[#0f0f0f] mb-3 leading-snug">
                      They are having too much impact on young people's lives
                    </p>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                  </div>
                  <div className="w-[42%]">
                    <Link href="/article/china-ai-romances">
                      <img src="/imgi_573_20260718_CND001.jpg" alt="China AI romances" className="w-full aspect-[1.4] object-cover cursor-pointer hover:opacity-90 transition-opacity" />
                    </Link>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#e6e6e6] mb-6"></div>

                {/* Article 2: Americas */}
                <div className="flex flex-row w-full pb-2">
                  <div className="w-[58%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[13px] font-sans mb-1.5 mt-[-2px]">World</span>
                    <Link href="/article/panama-canal" className="group">
<h4 className="text-[23px] font-serif text-[#0f0f0f] leading-tight mb-2 cursor-pointer group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                        The Panama Canal is growing more important
                      </h4>
</Link>
                    <p className="text-[15px] font-serif text-[#0f0f0f] mb-3 leading-snug">
                      And the challenges to it are getting more acute
                    </p>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">6 min read</span>
                  </div>
                  <div className="w-[42%]">
                    <Link href="/article/panama-canal">
                      <img src="/imgi_574_20260718_AMP001.jpg" alt="Panama Canal" className="w-full aspect-[1.4] object-cover cursor-pointer hover:opacity-90 transition-opacity" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Fourth Row: 4 Column Grid */}
            <div className="w-full h-[1px] bg-[#e6e6e6] mt-2 mb-6"></div>
            
            <div className="flex flex-col md:flex-row w-full pb-10">
              {/* Col 1 */}
              <Link href="/article/fallback-article" className="w-full md:w-[25%] pr-4 flex flex-col group cursor-pointer">
                <img src="/imgi_575_20260718_WOT913.png" alt="Ukraine" className="w-full aspect-[3/2] object-cover mb-3" />
                <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-1">Graphic detail</span>
                <h4 className="text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                  Russia is losing its grip on Crimea
                </h4>
                <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">2 min read</span>
              </Link>
              
              {/* Col 2 */}
              <Link href="/article/fallback-article" className="w-full md:w-[25%] px-4 flex flex-col border-l border-[#e6e6e6] group cursor-pointer">
                <img src="/imgi_576_20260718_EUD000.jpg" alt="Scandinavia Playground" className="w-full aspect-[3/2] object-cover mb-3" />
                <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-1">Charlemagne on Europe</span>
                <h4 className="text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                  In praise of Scandinavia's risky and dirty playgrounds
                </h4>
                <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">5 min read</span>
              </Link>

              {/* Col 3 */}
              <Link href="/article/fallback-article" className="w-full md:w-[25%] px-4 flex flex-col border-l border-[#e6e6e6] group cursor-pointer">
                <img src="/imgi_577_20260718_EUP002.jpg" alt="Carbon Pricing" className="w-full aspect-[3/2] object-cover mb-3" />
                <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-1">Europe</span>
                <h4 className="text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                  Europe seems set to ease its carbon pricing
                </h4>
                <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">3 min read</span>
              </Link>

              {/* Col 4 */}
              <Link href="/article/fallback-article" className="w-full md:w-[25%] pl-4 flex flex-col border-l border-[#e6e6e6] group cursor-pointer">
                <img src="/imgi_578_20260718_CUP506.jpg" alt="Christopher Nolan" className="w-full aspect-[3/2] object-cover mb-3" />
                <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-1">Culture</span>
                <h4 className="text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                  Why Sir Christopher Nolan inspires such devotion&mdash;and contempt
                </h4>
                <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
              </Link>
            </div>

            {/* Fifth Row: Recent Highlights */}
            <div className="w-full h-[1px] bg-black mt-8 mb-5"></div>
            <h2 className="text-[24px] font-bold font-sans text-black mb-6 tracking-tight">Recent highlights</h2>

            {/* Row 1 */}
            <div className="flex flex-col md:flex-row w-full mb-6 pb-6 border-b border-[#e6e6e6]">
              {/* Col 1 */}
              <Link href="/article/fallback-article" className="w-full md:w-[50%] pr-6 flex flex-row group cursor-pointer">
                <div className="w-[60%] pr-4 flex flex-col">
                  <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-[-2px]">Europe</span>
                  <h4 className="text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Russians are growing anxious and angry
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">5 min read</span>
                </div>
                <div className="w-[40%] flex items-center justify-end">
                  <img src="/imgi_579_20260711_EUP003.jpg" alt="Russian smoke" className="w-full aspect-[1.6] object-cover" />
                </div>
              </Link>
              
              {/* Col 2 */}
              <Link href="/article/fallback-article" className="w-full md:w-[50%] pl-6 flex flex-row border-l border-[#e6e6e6] group cursor-pointer">
                <div className="w-[60%] pr-4 flex flex-col">
                  <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-[-2px]">Briefing</span>
                  <h4 className="text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    How dementia is being defeated
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">14 min read</span>
                </div>
                <div className="w-[40%] flex items-center justify-end">
                  <img src="/imgi_580_20260711_FBD001.jpg" alt="Dementia brains" className="w-full aspect-[1.6] object-cover" />
                </div>
              </Link>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row w-full mb-10 pb-2">
              {/* Col 1 */}
              <Link href="/article/fallback-article" className="w-full md:w-[50%] pr-6 flex flex-row group cursor-pointer">
                <div className="w-[60%] pr-4 flex flex-col">
                  <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-[-2px]">Finance & economics</span>
                  <h4 className="text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Is The Economist always wrong?
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">6 min read</span>
                </div>
                <div className="w-[40%] flex items-center justify-end">
                  <img src="/imgi_581_20251220_XMD035.jpg" alt="Economist always wrong?" className="w-full aspect-[1.6] object-cover" />
                </div>
              </Link>
              
              {/* Col 2 */}
              <Link href="/article/fallback-article" className="w-full md:w-[50%] pl-6 flex flex-row border-l border-[#e6e6e6] group cursor-pointer">
                <div className="w-[60%] pr-4 flex flex-col">
                  <span className="text-[#E3120B] text-[13px] font-sans mb-1 mt-[-2px]">Essay</span>
                  <h4 className="text-[21px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    America's Wrecking-ball revolution
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">27 min read</span>
                </div>
                <div className="w-[40%] flex items-center justify-end">
                  <img src="/imgi_582_20260704_ESD005.jpg" alt="America Wrecking-ball" className="w-full aspect-[1.6] object-cover" />
                </div>
              </Link>
            </div>

            <LatestVideos />

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[25%] flex flex-col border-l border-black pl-5">
            
            <div className="mb-6">
              <img 
                src="/imgi_218_20260718_ibp331.jpg" 
                alt="Explosion in city" 
                className="w-full aspect-[3/2] object-cover mb-3"
              />
              <Link href="/article/fallback-article" className="group"><h3 className="text-[16px] font-bold text-[#0f0f0f] leading-[1.3] mb-3 cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                World in Brief: America launches fresh strikes on Iran; Ukrainians protest against ministerial sacking
              </h3></Link>
              <div className="flex items-start gap-2">
                <span className="text-[#E3120B] font-bold text-lg leading-none mt-[-2px]">&rarr;</span>
                <p className="text-[13px] font-bold text-[#0f0f0f] leading-snug">
                  Read the rest of our daily news analysis
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-black mb-6"></div>

            {/* Sidebar Advertisement */}
            <div className="w-full flex flex-col items-center">
              <span className="text-[10px] text-[#767676] uppercase tracking-widest mb-2 font-semibold">Advertisement</span>
              <div className="w-full border border-[#e6e6e6] p-5 pb-10 relative flex flex-col items-start bg-white shadow-sm">
                <div className="absolute top-2 right-2 text-[#00a3e0]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div className="bg-[#E3120B] text-white text-[11px] font-bold px-1.5 py-0.5 mb-3 uppercase tracking-wider">
                  Economist Enterprise
                </div>
                <Link href="/article/fallback-article" className="group"><h4 className="text-[24px] font-serif font-bold text-[#0f0f0f] leading-tight pr-4">
                  Which countries are leading the way in addressing obesity?
                </h4></Link>
              </div>
            </div>

            {/* Columns Section */}
            <div className="w-full mt-10">
              <div className="w-full h-[1px] bg-black mb-3"></div>
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 flex items-center group cursor-pointer w-fit tracking-tight">
                Columns <span className="ml-0.5 text-[18px] transition-transform group-hover:translate-x-1">&rarr;</span>
              </h2>

              {/* Column Item 1 */}
              <div className="flex flex-row w-full mb-5 pb-5 border-b border-[#e6e6e6]">
                <div className="w-[68%] pr-3 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">The Telegram on geopolitics</span>
                  <Link href="/article/fallback-article" className="group"><h4 className="text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] mb-2 cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                    When China's open-source AI is a trap
                  </h4></Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">5 min read</span>
                </div>
                <div className="w-[32%] pt-1">
                  <Link href="/article/fallback-article"><img src="/imgi_243_20260718_IRD000.jpg" alt="AI trap" className="w-full aspect-[1.8] object-cover" /></Link>
                </div>
              </div>

              {/* Column Item 2 */}
              <div className="flex flex-row w-full mb-5 pb-5 border-b border-[#e6e6e6]">
                <div className="w-[68%] pr-3 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">Chaguan on China</span>
                  <Link href="/article/fallback-article" className="group"><h4 className="text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] mb-2 cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                    A squeezed China is trying to wring more from its state assets
                  </h4></Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">5 min read</span>
                </div>
                <div className="w-[32%] pt-1">
                  <Link href="/article/fallback-article"><img src="/imgi_251_20260618_CND000.jpg" alt="China state assets" className="w-full aspect-[1.8] object-cover" /></Link>
                </div>
              </div>

              {/* Column Item 3 */}
              <div className="flex flex-row w-full mb-5 pb-5 border-b border-[#e6e6e6]">
                <div className="w-[68%] pr-3 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">Ashoka on India</span>
                  <Link href="/article/fallback-article" className="group"><h4 className="text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] mb-2 cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                    An incomplete list of falling objects in India
                  </h4></Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                </div>
                <div className="w-[32%] pt-1">
                  <Link href="/article/fallback-article"><img src="/imgi_259_20260718_ASD000.jpg" alt="India falling objects" className="w-full aspect-[1.8] object-cover" /></Link>
                </div>
              </div>

              {/* Column Item 4 */}
              <div className="flex flex-row w-full mb-2 pb-5">
                <div className="w-[68%] pr-3 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">Bartleby on work</span>
                  <Link href="/article/fallback-article" className="group"><h4 className="text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] mb-2 cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                    The secret to good questions
                  </h4></Link>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                </div>
                <div className="w-[32%] pt-1">
                  <Link href="/article/fallback-article"><img src="/imgi_267_20260711_WBD001.jpg" alt="Good questions" className="w-full aspect-[1.8] object-cover" /></Link>
                </div>
              </div>
            </div>

            {/* Discover More Section */}
            <div className="w-full mt-10">
              <div className="w-full h-[1px] bg-black mb-3"></div>
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">
                Discover more
              </h2>

              {/* Discover Item 1 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 border-b border-[#e6e6e6] cursor-pointer group">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex-shrink-0">
                  <img src="/imgi_281_20240628_drp014.png" alt="The Intelligence" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col ml-5 pr-2">
                  <span className="text-[#0f0f0f] text-[13px] font-bold font-sans mb-0.5 tracking-tight">The Intelligence</span>
                  <h4 className="text-[16.5px] font-serif text-[#0f0f0f] leading-[1.2] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    In it to bin it: Nigel Farage v Count Binface
                  </h4>
                </div>
              </Link>

              {/* Discover Item 2 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 border-b border-[#e6e6e6] cursor-pointer group">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex-shrink-0">
                  <img src="/imgi_295_20260310_drp061.png" alt="Business in Brief" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col ml-5 pr-2">
                  <span className="text-[#0f0f0f] text-[13px] font-bold font-sans mb-0.5 tracking-tight">Business in Brief</span>
                  <h4 className="text-[16.5px] font-serif text-[#0f0f0f] leading-[1.2] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Sign up for daily analysis of the stories driving business, finance and economics
                  </h4>
                </div>
              </Link>

              {/* Discover Item 3 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 border-b border-[#e6e6e6] cursor-pointer group">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex-shrink-0">
                  <img src="/imgi_309_20250121_DRP043.png" alt="Tracking Donald Trump" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col ml-5 pr-2">
                  <span className="text-[#0f0f0f] text-[13px] font-bold font-sans mb-0.5 tracking-tight">Tracking Donald Trump</span>
                  <h4 className="text-[16.5px] font-serif text-[#0f0f0f] leading-[1.2] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    The American president's net approval rating
                  </h4>
                </div>
              </Link>

              {/* Discover Item 4 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-2 pb-5 cursor-pointer group">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex-shrink-0">
                  <img src="/imgi_323_20260608_drp068.png" alt="Games" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col ml-5 pr-2">
                  <span className="text-[#0f0f0f] text-[13px] font-bold font-sans mb-0.5 tracking-tight">Games</span>
                  <h4 className="text-[16.5px] font-serif text-[#0f0f0f] leading-[1.2] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Quizzes and crosswords to give agile minds a workout
                  </h4>
                </div>
              </Link>
            </div>

            {/* Most Read Section */}
            <div className="w-full mt-10">
              <div className="w-full h-[1px] bg-black mb-3"></div>
              <h2 className="text-[17px] font-bold font-sans text-black mb-6 tracking-tight whitespace-nowrap">
                Stories most read by subscribers
              </h2>

              {/* Item 1 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 border-b border-[#e6e6e6] cursor-pointer group">
                <div className="w-[15%] flex-shrink-0 flex justify-center">
                  <span className="text-[46px] font-sans text-[#E3120B] leading-[0.8]" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>1</span>
                </div>
                <h4 className="w-[85%] text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all pl-3">
                  A very silly adaptation of &ldquo;The Odyssey&rdquo;
                </h4>
              </Link>

              {/* Item 2 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 border-b border-[#e6e6e6] cursor-pointer group">
                <div className="w-[15%] flex-shrink-0 flex justify-center">
                  <span className="text-[46px] font-sans text-[#E3120B] leading-[0.8]" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>2</span>
                </div>
                <h4 className="w-[85%] text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all pl-3">
                  The world&rsquo;s most, and least, liveable cities in 2026
                </h4>
              </Link>

              {/* Item 3 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 border-b border-[#e6e6e6] cursor-pointer group">
                <div className="w-[15%] flex-shrink-0 flex justify-center">
                  <span className="text-[46px] font-sans text-[#E3120B] leading-[0.8]" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>3</span>
                </div>
                <h4 className="w-[85%] text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all pl-3">
                  Donald Trump has no good options for reopening the Strait of Hormuz
                </h4>
              </Link>

              {/* Item 4 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 border-b border-[#e6e6e6] cursor-pointer group">
                <div className="w-[15%] flex-shrink-0 flex justify-center">
                  <span className="text-[46px] font-sans text-[#E3120B] leading-[0.8]" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>4</span>
                </div>
                <h4 className="w-[85%] text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all pl-3">
                  Eli Lilly is reinventing the pharma business
                </h4>
              </Link>

              {/* Item 5 */}
              <Link href="/article/fallback-article" className="flex flex-row items-center w-full mb-5 pb-5 cursor-pointer group">
                <div className="w-[15%] flex-shrink-0 flex justify-center">
                  <span className="text-[46px] font-sans text-[#E3120B] leading-[0.8]" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>5</span>
                </div>
                <h4 className="w-[85%] text-[17.5px] font-serif text-[#0f0f0f] leading-[1.25] group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all pl-3">
                  Storm clouds gather over America&rsquo;s financial supremacy
                </h4>
              </Link>
            </div>

          </div>

        </div>

        {/* Wide Full-Width Advertisement */}
        <div className="w-full bg-[#fcfcfc] border-t border-b border-[#e6e6e6] py-8 mt-10 mb-12 flex flex-col items-center justify-center">
          <span className="text-[10.5px] text-[#767676] uppercase tracking-widest font-medium mb-3">Advertisement</span>
          <div className="max-w-[1380px] w-full px-4 flex justify-center">
            <img src="/16691280985671963169.jpeg" alt="Advertisement" className="w-full max-w-[970px] h-auto object-contain cursor-pointer mix-blend-multiply" />
          </div>
        </div>

        {/* The bottom thin line separating the hero from the next section */}
        <div className="max-w-[1380px] mx-auto w-full border-t border-black mb-8"></div>
        
        {/* "This week" Section */}
        <div className="max-w-[1380px] mx-auto w-full mb-16 px-4 xl:px-0">
          <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">This week</h2>
          
          <div className="flex flex-col lg:flex-row w-full gap-8">
            
            {/* Left large article */}
            <Link href="/article/fallback-article" className="w-full lg:w-1/2 flex flex-col group cursor-pointer">
              <div className="w-full relative aspect-[1.6] mb-4 overflow-hidden bg-[#f9f9f9]">
                <img src="/imgi_329_20260718_WWP001.jpg" alt="Political stories" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">The world this week</span>
              <h3 className="text-[28px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                This week's most important political stories
              </h3>
              <p className="text-[15px] font-serif text-[#3b3b3b] mb-4 leading-[1.4]">
                The ceasefire between America and Iran all but collapses; Iraq's new prime minister visits the White House&mdash;and more
              </p>
              <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">5 min read</span>
            </Link>

            {/* Right smaller articles */}
            <div className="w-full lg:w-1/2 flex flex-col pt-1">
              
              {/* Right Article 1 */}
              <Link href="/article/fallback-article" className="w-full flex flex-row items-start mb-6 pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">The world this week</span>
                  <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                    This week's most important business stories
                  </h4>
                  <p className="text-[14.5px] font-serif text-[#3b3b3b] mb-4 leading-[1.3]">
                    Kevin Warsh gives his first report to Congress as chair of the Fed; huge profits for America's big banks&mdash;and more
                  </p>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <img src="/imgi_338_20260718_WWP501.jpg" alt="Business stories" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>

              {/* Right Article 2 */}
              <Link href="/article/fallback-article" className="w-full flex flex-row items-start mb-6 pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">Letters</span>
                  <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                    The best of your correspondence
                  </h4>
                  <p className="text-[14.5px] font-serif text-[#3b3b3b] mb-4 leading-[1.3]">
                    Dealmaking in geopolitics, the backlash against data centres, homelessness, Route 66 and admitting our mistakes
                  </p>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">6 min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <img src="/imgi_348_20260718_LTD502.jpg" alt="Correspondence" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>

              {/* Right Article 3 */}
              <Link href="/article/fallback-article" className="w-full flex flex-row items-start group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px]">The world this week</span>
                  <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                    A lighter look at events
                  </h4>
                  <div className="flex-grow"></div>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">1 min read</span>
                </div>
                <div className="w-[35%] overflow-hidden bg-[#f9f9f9]">
                  <img src="/imgi_109_20260718_WWD000.png" alt="A lighter look" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* Section: World news & Business / Advertisement */}
        <div className="max-w-[1380px] mx-auto w-full mb-16 px-4 xl:px-0 flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (75%) */}
          <div className="w-full lg:w-[75%] flex flex-col pr-0 lg:pr-8">
            
            {/* World news Section */}
            <div className="w-full mb-12">
              <div className="w-full h-[1px] bg-black mb-4"></div>
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">World news</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Item 1 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Britain</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Violence is reshaping British political life
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">3 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_366_20260718_BRP504.jpg" alt="Britain" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

                {/* Item 2 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">United States</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Cities are rethinking what happens after dark
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_374_20260718_USP001.jpg" alt="United States" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

                {/* Item 3 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] md:border-b-0 group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Asia</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Is Aung San Suu Kyi dead?
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">5 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_382_20260718_ASP001.jpg" alt="Asia" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

                {/* Item 4 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Middle East & Africa</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      The Ebola epidemic is getting out of control
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">5 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_390_20260718_MAP003.jpg" alt="Middle East" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

              </div>
            </div>

            {/* Business Section */}
            <div className="w-full mt-2">
              <div className="w-full h-[1px] bg-black mb-4"></div>
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">Business, finance and economics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Item 1 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Business</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Demis Hassabis has a plan to harness AI safely
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_398_20260718_WBP502.jpg" alt="Business" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

                {/* Item 2 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Finance & economics</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      The stubborn scarcity of female breadwinners
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_406_20260718_FNP501.jpg" alt="Finance" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

                {/* Item 3 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] md:border-b-0 group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Finance & economics</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Storm clouds gather over America's financial supremacy
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">6 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_414_20260718_FND001.jpg" alt="Finance" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

                {/* Item 4 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Finance & economics</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Three ways the LNG market could crack before winter
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">4 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_422_20260711_FNP503.jpg" alt="Finance" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </Link>

              </div>
            </div>

            {/* Telling stories with data Section */}
            <div className="w-full mt-8">
              <div className="w-full h-[1px] bg-black mb-4"></div>
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">Telling stories with data</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Item 1 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Where is the home of football?
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">2 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_429_20260711_WOT903.png" alt="Home of football" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                  </div>
                </Link>

                {/* Item 2 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      The world's most, and least, liveable cities in 2026
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">2 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_437_20260711_WOT992.png" alt="Liveable cities" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                  </div>
                </Link>

                {/* Item 3 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] md:border-b-0 group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      How Americans see their country's past, present and future
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">5 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_445_20260627_WOT185.png" alt="Americans see past" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                  </div>
                </Link>

                {/* Item 4 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[19.5px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Where will Europe's heatwave be most deadly?
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">2 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_453_20260627_WOT973.png" alt="Europe heatwave" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                  </div>
                </Link>

              </div>
            </div>

          </div>

          {/* Right Column (25%) Advertisement */}
          <div className="w-full lg:w-[25%] flex flex-col items-center pt-2">
            <span className="text-[10.5px] text-[#767676] uppercase tracking-[0.08em] mb-2 font-medium">Advertisement</span>
            <Link href="/article/fallback-article" className="w-[300px] max-w-full flex justify-center border border-[#e6e6e6] bg-[#f9f9f9] shadow-sm relative cursor-pointer group">
               <img src="/yellow Advertisement.png" alt="Advertisement" className="w-full h-auto object-cover group-hover:opacity-95 transition-opacity" />
            </Link>
          </div>
          
        </div>

        {/* Wide Full-Width Advertisement */}
        <div className="w-full border-t border-b border-[#e6e6e6] py-8 mb-12 flex flex-col items-center justify-center">
          <span className="text-[10.5px] text-[#767676] uppercase tracking-[0.08em] font-medium mb-3">Advertisement</span>
          <div className="max-w-[1380px] w-full px-4 flex justify-center">
            <img src="/17015008310276935533.gif" alt="Advertisement" className="w-full max-w-[970px] h-auto object-contain cursor-pointer border border-[#e6e6e6] shadow-sm" />
          </div>
        </div>

        {/* Weekly Edition Section */}
        <div className="max-w-[1380px] mx-auto w-full mb-16 px-4 xl:px-0">
          <div className="w-full bg-[#f4f2ea] flex flex-col md:flex-row p-10 lg:p-14 gap-12 lg:gap-16">
            
            {/* Left Image */}
            <div className="w-full md:w-[45%] flex justify-end items-center">
              <div className="shadow-[0_15px_35px_rgba(0,0,0,0.25)] w-full max-w-[400px] relative hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                <img src="/imgi_460_20260718_DE_AP.jpg" alt="Weekly Edition Cover" className="w-full h-auto object-contain" />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-[55%] flex flex-col justify-center">
              <span className="text-[11.5px] font-bold tracking-[0.1em] uppercase mb-2 font-sans text-[#0f0f0f]">
                Weekly Edition <span className="font-normal mx-1 text-[#767676]">|</span> July 18th 2026
              </span>
              <h2 className="text-[44px] font-serif leading-none text-black mb-8 hover:underline cursor-pointer">It&rsquo;s too darn hot</h2>
              
              {/* Grid 2x2 */}
              <div className="w-full flex flex-col pr-0 lg:pr-16">
                
                {/* Row 1 */}
                <div className="w-full border-t border-[#dcd9d0] py-5 flex flex-row gap-6">
                  <Link href="/article/fallback-article" className="w-1/2 flex flex-col cursor-pointer group">
                    <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Burnham&rsquo;s bolshy MPs</h4>
                    <p className="text-[14.5px] font-serif text-[#3b3b3b] leading-[1.4] pr-4">Britain's prime-minister-to-be faces a big task to maintain his authority</p>
                  </Link>
                  <Link href="/article/fallback-article" className="w-1/2 flex flex-col cursor-pointer group">
                    <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">No plan for Iran</h4>
                    <p className="text-[14.5px] font-serif text-[#3b3b3b] leading-[1.4] pr-4">America's president looks bereft of good options for solving the stand-off in the Gulf</p>
                  </Link>
                </div>

                {/* Row 2 */}
                <div className="w-full border-t border-[#dcd9d0] py-5 flex flex-row gap-6">
                  <Link href="/article/fallback-article" className="w-1/2 flex flex-col cursor-pointer group">
                    <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How to do AI nationalism</h4>
                    <p className="text-[14.5px] font-serif text-[#3b3b3b] leading-[1.4] pr-4">But a degree of protection from coercion remains possible</p>
                  </Link>
                  <Link href="/article/fallback-article" className="w-1/2 flex flex-col cursor-pointer group">
                    <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Trump&rsquo;s DoJ: Degradation in progress</h4>
                    <p className="text-[14.5px] font-serif text-[#3b3b3b] leading-[1.4] pr-4">Political prosecutions are just part of a more radical reinvention</p>
                  </Link>
                </div>

                <div className="w-full border-t border-[#dcd9d0] pt-5">
                  <button className="flex items-center text-[15px] font-bold font-sans text-[#0f0f0f] hover:text-[#003a6a] hover:underline transition-colors group">
                    <span className="w-[18px] h-[18px] rounded-full bg-black text-white flex items-center justify-center mr-2 group-hover:bg-[#003a6a] transition-colors">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </span>
                    Read latest edition
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Games Section */}
        <div className="max-w-[1380px] mx-auto w-full mb-16 px-4 xl:px-0">
          <div className="w-full flex items-center justify-between border-t-[1.5px] border-black pt-2 pb-3 mb-2">
            <h2 className="text-[20px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
              Games <span className="ml-1 text-[18px]">&rarr;</span>
            </h2>
          </div>

          <div className="w-full flex flex-col">
            {/* Row 1 */}
            <div className="w-full flex flex-col md:flex-row border-b border-[#dcd9d0]">
              
              {/* Item 1 */}
              <Link href="/article/fallback-article" className="w-full md:w-1/3 flex flex-row items-center relative after:content-[''] after:hidden md:after:block after:absolute after:right-0 after:top-0 after:bottom-4 after:w-px after:bg-[#dcd9d0] pr-6 py-4 cursor-pointer group">
                <div className="w-[65%] flex flex-col pr-4">
                  <span className="text-[#E3120B] text-[11px] font-bold uppercase tracking-widest mb-1">Inboxes</span>
                  <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline transition-colors">How fast can you fill the grid?</h4>
                </div>
                <div className="w-[35%] flex items-center justify-center aspect-[4/3]">
                  <img src="/imgi_469_20260407_QZD002.jpg" alt="Inboxes" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              </Link>

              {/* Item 2 */}
              <Link href="/article/fallback-article" className="w-full md:w-1/3 flex flex-row items-center relative after:content-[''] after:hidden md:after:block after:absolute after:right-0 after:top-0 after:bottom-4 after:w-px after:bg-[#dcd9d0] px-0 md:px-6 py-4 cursor-pointer group">
                <div className="w-[65%] flex flex-col pr-4">
                  <span className="text-[#E3120B] text-[11px] font-bold uppercase tracking-widest mb-1">Mini crossword</span>
                  <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline transition-colors">Can you solve our weekday puzzle?</h4>
                </div>
                <div className="w-[35%] flex items-center justify-center aspect-[4/3]">
                  <img src="/imgi_477_20260407_QZD003.jpg" alt="Mini crossword" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              </Link>

              {/* Item 3 */}
              <Link href="/article/fallback-article" className="w-full md:w-1/3 flex flex-row items-center pl-0 md:pl-6 py-4 cursor-pointer group">
                <div className="w-[65%] flex flex-col pr-4">
                  <span className="text-[#E3120B] text-[11px] font-bold uppercase tracking-widest mb-1">News quiz</span>
                  <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline transition-colors">Have you been following the headlines?</h4>
                </div>
                <div className="w-[35%] flex items-center justify-center aspect-[4/3]">
                  <img src="/imgi_485_20260407_QZD004.jpg" alt="News quiz" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              </Link>

            </div>

            {/* Row 2 */}
            <div className="w-full flex flex-col md:flex-row">
              
              {/* Item 4 */}
              <Link href="/article/fallback-article" className="w-full md:w-1/3 flex flex-row items-center pr-6 py-4 cursor-pointer group">
                <div className="w-[65%] flex flex-col pr-4">
                  <span className="text-[#E3120B] text-[11px] font-bold uppercase tracking-widest mb-1">Dateline</span>
                  <h4 className="text-[17px] font-serif text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline transition-colors">Can you guess when these extracts were published?</h4>
                </div>
                <div className="w-[35%] flex items-center justify-center aspect-[4/3]">
                  <img src="/imgi_493_20260407_QZD001.jpg" alt="Dateline" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              </Link>
              
              <div className="hidden md:block w-1/3"></div>
              <div className="hidden md:block w-1/3"></div>

            </div>
          </div>
        </div>

        {/* 4 Column Business Section */}
        <div className="max-w-[1380px] mx-auto w-full mb-16 px-4 xl:px-0">
          <div className="w-full flex flex-col md:flex-row gap-8">
            
            {/* Col 1 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Business <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_501_20260718_WBP503.jpg" alt="Business" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How SK Hynix became the king of advanced memory chips</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How to sell a kettle</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Eli Lilly is reinventing the pharma business</h4>
              </Link>
            </div>

            {/* Col 2 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Finance & economics <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_510_20260718_FND000.jpg" alt="Finance" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How to shrink the Fed&rsquo;s $7trn balance-sheet</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Can Kevin Warsh's Fed force 5 reimagine monetary policymaking?</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">China's trade gap is narrowing. And other surprises</h4>
              </Link>
            </div>

            {/* Col 3 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  United States <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_573_20260718_CND001.jpg" alt="US" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Cartoon: Continuing uncertainty over the Strait of Hormuz</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">America's other battle with Iran</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Lindsey Graham tried to save the wrong countries from Donald Trump</h4>
              </Link>
            </div>

            {/* Col 4 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Artificial intelligence <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_355_20260718_WWD000.png" alt="AI" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">China wants to end AI romances</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Sovereign AI, independent of America and China, is a pipe dream</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How to make AI safe&mdash;and lessen dependence on America and China</h4>
              </Link>
            </div>

          </div>
        </div>

        {/* Second 4 Column Section */}
        <div className="max-w-[1380px] mx-auto w-full mb-16 px-4 xl:px-0">
          <div className="w-full flex flex-col md:flex-row gap-8">
            
            {/* Col 1 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  1843 <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_109_1843_20260708_1843_MELNI_Teas.jpg" alt="1843" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">A top Russian oligarch breaks the silence</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">The ethical people-smuggler</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">The strange disappearance of Japan's animators</h4>
              </Link>
            </div>

            {/* Col 2 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  By Invitation <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_110_20260718_BID001.jpg" alt="By Invitation" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Would Europeans fight, if it came to that?</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Elon Musk is building a form of capitalism that Adam Smith would hate</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Why a broken Russia is bad for the world</h4>
              </Link>
            </div>

            {/* Col 3 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Newsletters <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_111_20260718_BRP502.jpg" alt="Newsletters" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Blighty newsletter: Britain&rsquo;s most popular names</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Analysing Africa newsletter: Another looming atrocity in Sudan</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Plot Twist newsletter: What will the new generation of zillionaires collect?</h4>
              </Link>
            </div>

            {/* Col 4 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[1.5px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Podcasts <span className="ml-1 text-[16px]">&rarr;</span>
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_112_20260718_PDP509.jpg" alt="Podcasts" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[18px] font-serif text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">The man reinventing a trillion-dollar drugmaker</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">In it to bin it: Nigel Farage v Count Binface</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[15px] font-serif text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">What faces reveal about humanity</h4>
              </Link>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

