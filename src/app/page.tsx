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
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-0 mb-10 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          
          {/* Left + Center Wrapper */}
          <div className="w-full lg:w-[70%] flex flex-col pr-5">
            
            {/* Top Row: Original Left and Center */}
            <div className="flex flex-col lg:flex-row mb-6">
              {/* Left Column */}
              <div className="w-full lg:w-[48%] flex flex-col items-start text-left pt-2 pr-4">
                <span className="text-[#E3120B] text-[13px] xl:text-[14px] font-bold uppercase tracking-widest mb-3">Law &amp; Justice</span>
                <Link href="/article/donald-trump-doj">
                  <h2 className="text-[38px] lg:text-[38px] xl:text-[45px] 2xl:text-[54px] font-serif font-bold text-[#0f0f0f] mb-4 leading-[1.1] tracking-tight cursor-pointer hover:text-[#003a6a] hover:underline hover:decoration-1 hover:underline-offset-[3px] hover:decoration-[#003a6a] transition-all">
                    Donald Trump’s<br />gutting of the<br />Department of Justice
                  </h2>
                </Link>
                <p className="text-[17px] xl:text-[19px] font-serif text-[#3b3b3b] mb-4 leading-snug pr-4">
                  What the degraded institution means<br />for America—and the risks it poses to<br />the rule of law.
                </p>
                <span className="text-[#767676] text-[13px] xl:text-[14px] mb-8 font-semibold">5 min read<span className="text-gray-300 font-normal mx-3">|</span>By John Cassidy</span>
              </div>

              {/* Center Column */}
              <div className="w-full lg:w-[52%] px-3">
                <Link href="/article/donald-trump-doj">
                  <img 
                    src="/imgi_581_20260718_LDD002_FH.jpg" 
                    alt="Department of Justice Cover" 
                    className="w-full aspect-[1.45] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </Link>
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="w-full h-[1px] bg-[#e6e6e6] mb-6 pr-4"></div>

            {/* 4 Articles Section */}
            <div className="flex flex-col md:flex-row mb-10 divide-y md:divide-y-0 md:divide-x divide-[#e6e6e6]">
              
              {/* Article 1 */}
              <div className="flex flex-col w-full md:w-1/4 pr-5">
                <Link href="/article/india-gen-z">
                  <img src="/imgi_259_20260718_ASD000.jpg" alt="Asia" className="w-full h-[140px] object-cover mb-2 cursor-pointer hover:opacity-90" />
                </Link>
                <span className="text-[#E3120B] text-[11px] font-bold mb-1 uppercase tracking-wider">Asia</span>
                <Link href="/article/india-gen-z">
                  <h4 className="text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    Narendra Modi caves to India's Gen Z
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">4 min read</span>
              </div>

              {/* Article 2 */}
              <div className="flex flex-col w-full md:w-1/4 px-5">
                <Link href="/article/europe-defence">
                  <img src="/imgi_111_20260718_BRP502.jpg" alt="Business" className="w-full h-[140px] object-cover mb-2 cursor-pointer hover:opacity-90" />
                </Link>
                <span className="text-[#E3120B] text-[11px] font-bold mb-1 uppercase tracking-wider">Business</span>
                <Link href="/article/europe-defence">
                  <h4 className="text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    Investors cool on Europe's old-style defence firms
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">4 min read</span>
              </div>

              {/* Article 3 */}
              <div className="flex flex-col w-full md:w-1/4 px-5">
                <Link href="/article/china-ai">
                  <img src="/imgi_139_20221029_OPD002.webp" alt="Finance & economics" className="w-full h-[140px] object-cover mb-2 cursor-pointer hover:opacity-90" />
                </Link>
                <span className="text-[#E3120B] text-[11px] font-bold mb-1 uppercase tracking-wider">Finance &amp; economics</span>
                <Link href="/article/china-ai">
                  <h4 className="text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    Can China dominate AI exports, too?
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">5 min read</span>
              </div>

              {/* Article 4 */}
              <div className="flex flex-col w-full md:w-1/4 pl-5">
                <Link href="/article/cotswolds">
                  <img src="/imgi_42_culture-desktop.webp" alt="Culture" className="w-full h-[140px] object-cover mb-2 cursor-pointer hover:opacity-90" />
                </Link>
                <span className="text-[#E3120B] text-[11px] font-bold mb-1 uppercase tracking-wider">Culture</span>
                <Link href="/article/cotswolds">
                  <h4 className="text-[15px] font-bold text-[#0f0f0f] leading-tight mb-2 hover:text-[#003a6a] cursor-pointer">
                    How the Cotswolds became a popular lifestyle brand
                  </h4>
                </Link>
                <span className="text-[#767676] text-[12px] font-semibold mt-auto">6 min read</span>
              </div>
            </div>

            {/* MORE NEWS Section */}
            <div className="w-full mb-10 px-3 flex flex-col items-center">
               <h2 className="text-[13px] font-bold font-sans text-[#E3120B] uppercase tracking-widest mb-3 text-left w-full">More News</h2>
               
               <Link href="/article/more-news" className="group flex flex-col items-center w-full">
                 <img src="/imgi_13_20260718_BLP502-1-1024x576.jpg" className="w-full h-auto object-cover mb-5" alt="Man sitting on couch" />
                 
                 <h3 className="text-[20px] md:text-[24px] lg:text-[20px] 2xl:text-[27px] font-serif text-[#0f0f0f] mb-3 leading-tight tracking-tight text-center w-full group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                   10 Ways Small Businesses Can Use AI To Grow—And Even Hire More Workers
                 </h3>
               </Link>
               
               <span className="text-[#3b3b3b] text-[12.5px] font-sans text-center">
                 By <Link href="/author/john-schroyer" className="font-bold underline cursor-pointer text-[#0f0f0f] hover:text-[#003a6a]">John Schroyer</Link>, Staff Writer
               </span>
            </div>

            {/* Andy Burnham & 2 Stacked Articles Block */}
            <div className="w-full flex flex-col md:flex-row mt-4 px-3 mb-6">
              {/* Left Side: Andy Burnham */}
              <div className="w-full md:w-[53%] flex flex-col pr-6 md:border-r border-[#e6e6e6] mb-8 md:mb-0">
                <Link href="/article/andy-burnham" className="group flex flex-col cursor-pointer">
                  <img src="/imgi_572_20260718_BRD001.jpg" alt="Andy Burnham" className="w-full aspect-[2.1] object-cover mb-4" />
                  <span className="text-[#E3120B] text-[13px] font-bold uppercase tracking-widest mb-2">Britain</span>
                  <h3 className="text-[32px] lg:text-[38px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                    Can Andy Burnham keep his own<br />MPs under control?
                  </h3>
                  <p className="text-[16px] font-serif text-[#3b3b3b] mb-4">
                    Britain's prime-minister-to-be faces a big task to maintain his authority
                  </p>
                  <span className="text-[#767676] text-[12px] font-semibold">5 min read</span>
                </Link>
              </div>

              {/* Right Side: 2 Stacked Articles */}
              <div className="w-full md:w-[47%] flex flex-col md:pl-6">
                
                {/* China AI Romances */}
                <Link href="/article/china-ai" className="group flex flex-row items-start justify-between border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4 cursor-pointer">
                  <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                    <span className="text-[#E3120B] text-[13px] font-bold uppercase tracking-wider mb-2">China</span>
                    <h4 className="text-[19px] 2xl:text-[25px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                      China wants to end AI romances
                    </h4>
                    <p className="text-[14px] 2xl:text-[16.5px] font-serif text-[#3b3b3b] mb-3 leading-snug">
                      They are having too much impact on young people's lives
                    </p>
                    <span className="text-[#767676] text-[12px] font-semibold mt-auto">4 min read</span>
                  </div>
                  <img src="/imgi_573_20260718_CND001.jpg" alt="China AI romances" className="w-[120px] md:w-[130px] 2xl:w-[195px] aspect-[1.4] object-cover flex-shrink-0" />
                </Link>

                {/* Panama Canal */}
                <Link href="/article/panama-canal" className="group flex flex-row items-start justify-between cursor-pointer mt-[-5px]">
                  <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                    <span className="text-[#E3120B] text-[13px] font-bold uppercase tracking-wider mb-2">The Americas</span>
                    <h4 className="text-[19px] 2xl:text-[25px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all">
                      The Panama Canal is growing more important
                    </h4>
                    <p className="text-[14px] 2xl:text-[16.5px] font-serif text-[#3b3b3b] mb-3 leading-snug">
                      And the challenges to it are getting more acute
                    </p>
                    <span className="text-[#767676] text-[12px] font-semibold mt-auto mb-1">6 min read</span>
                  </div>
                  <img src="/imgi_574_20260718_AMP001.jpg" alt="Panama Canal" className="w-[120px] md:w-[130px] 2xl:w-[195px] aspect-[1.4] object-cover flex-shrink-0" />
                </Link>

              </div>
            </div>

            {/* Fourth Row: 4 Column Grid */}
            <div className="w-full h-[1px] bg-[#e6e6e6] mt-2 mb-6"></div>
            <h2 className="text-[14px] font-extrabold font-sans text-[#E3120B] uppercase tracking-widest mb-4 mt-2">INSIDE THE WHITE HOUSE</h2>
            <div className="flex flex-col md:flex-row w-full pb-10 md:-mx-4">
              {/* Col 1 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_575_20260718_WOT913.png" alt="Ukraine" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Graphic detail</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Russia is losing its grip on Crimea
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">2 min read</span>
                </Link>
              </div>
              
              {/* Col 2 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_576_20260718_EUD000.jpg" alt="Scandinavia Playground" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Charlemagne on Europe</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    In praise of Scandinavia's risky and dirty playgrounds
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">5 min read</span>
                </Link>
              </div>

              {/* Col 3 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_577_20260718_EUP002.jpg" alt="Carbon Pricing" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Europe</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Europe seems set to ease its carbon pricing
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">3 min read</span>
                </Link>
              </div>

              {/* Col 4 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_578_20260718_CUP506.jpg" alt="Christopher Nolan" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Culture</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Why Sir Christopher Nolan inspires such devotion&mdash;and contempt
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Latest News & Top Highlights */}
          <div className="hidden lg:flex w-full lg:w-[30%] flex-col pl-6 border-l-0 md:border-l border-[#e6e6e6] mt-8 lg:mt-0">
            {/* LATEST NEWS */}
            <h2 className="text-[21px] font-bold font-serif text-[#0f0f0f] mb-4">Latest News</h2>
            
            <Link href="/article/latest-news-1" className="group flex flex-col mb-6 border-b border-[#e6e6e6] pb-6">
              <img src="/imgi_243_20260718_IRD000.jpg" alt="Latest News 1" className="w-full aspect-[1.7] object-cover mb-3" />
              <h3 className="text-[15px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-2">
                World in Brief: America launches fresh strikes on Iran; Ukrainians protest against ministerial sacking
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[#E3120B] font-bold text-lg leading-none mt-[-2px]">&rarr;</span>
                <span className="text-[12px] font-bold text-[#0f0f0f] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">Read the rest of our daily news analysis</span>
              </div>
            </Link>

            <Link href="/article/latest-news-2" className="group flex flex-row items-start gap-4 mb-5 border-b border-[#e6e6e6] pb-5">
              <img src="/imgi_158_20260718_FNP503.jpg" alt="Latest News 2" className="w-[145px] aspect-[1.4] object-cover flex-shrink-0" />
              <div className="flex flex-col flex-1 mt-[-2px]">
                <span className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1">Markets</span>
                <h4 className="text-[15px] xl:text-[16px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-1">
                  Global stocks fall as<br />investors weigh Fed<br />rate outlook
                </h4>
                <span className="text-[#767676] text-[11px] font-semibold">2 min read</span>
              </div>
            </Link>

            <Link href="/article/latest-news-3" className="group flex flex-row items-start gap-4 mb-5 border-b border-[#e6e6e6] pb-5">
              <img src="/imgi_16_image.webp" alt="Latest News 3" className="w-[145px] aspect-[1.4] object-cover flex-shrink-0" />
              <div className="flex flex-col flex-1 mt-[-2px]">
                <span className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1">Business</span>
                <h4 className="text-[15px] xl:text-[16px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-1">
                  OpenAI raises another<br />$20B in fresh funding
                </h4>
                <span className="text-[#767676] text-[11px] font-semibold">3 min read</span>
              </div>
            </Link>

            <Link href="/article/latest-news-4" className="group flex flex-row items-start gap-4 mb-6">
              <img src="/imgi_16_image.webp" alt="Latest News 4" className="w-[145px] aspect-[1.4] object-cover flex-shrink-0" />
              <div className="flex flex-col flex-1 mt-[-2px]">
                <span className="text-[#E3120B] text-[12px] font-bold uppercase tracking-wider mb-1">Business</span>
                <h4 className="text-[15px] xl:text-[16px] font-bold text-[#0f0f0f] leading-snug group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all mb-1">
                  OpenAI raises another<br />$20B in fresh funding
                </h4>
                <span className="text-[#767676] text-[11px] font-semibold">3 min read</span>
              </div>
            </Link>

            <Link href="/latest" className="flex items-center gap-2 mb-8 group">
              <span className="text-[#E3120B] text-[13px] font-bold group-hover:text-[#003a6a] transition-colors">View all latest news</span>
              <span className="text-[#E3120B] font-bold text-lg leading-none mt-[-2px] group-hover:text-[#003a6a] transition-colors">&rarr;</span>
            </Link>

            {/* ADVERTISEMENT 1 */}
            <div className="w-full lg:w-[110%] lg:h-[550px] 2xl:h-[770px] bg-[#f9f9f9] border border-[#e6e6e6] flex items-start justify-center pt-4 mb-6 ml-0 lg:ml-[-2%] pr-0 lg:pr-5 relative">
              <span className="text-[10px] text-[#767676] font-medium tracking-wider">ADVERTISEMENT</span>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[26px] text-[#767676] font-medium tracking-wider">336 x 770</span>
              </div>
            </div>

            {/* TOP HIGHLIGHTS */}
            <h2 className="text-[15.5px] font-extrabold font-sans text-[#E3120B] uppercase tracking-widest mb-4">Top Highlights</h2>
            
            <Link href="/article/andy-burnham" className="group flex flex-col mb-6 border-b border-[#e6e6e6] pb-6">
              <img src="/imgi_572_20260718_BRD001.jpg" alt="Andy Burnham" className="w-full aspect-[1.6] object-cover mb-3" />
              <span className="text-[#E3120B] text-[10px] font-bold mb-1">Britain</span>
              <h3 className="text-[22px] font-serif text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-colors mb-2">
                Can Andy Burnham keep his own MPs under control?
              </h3>
              <p className="text-[13px] font-serif text-[#3b3b3b] leading-snug">
                Britain's prime-minister-to-be faces a big task to maintain his authority
              </p>
            </Link>

            <Link href="/article/telegram-geopolitics" className="group flex flex-row items-center gap-4 mb-5 border-b border-[#e6e6e6] pb-5">
              <div className="flex flex-col flex-1">
                <span className="text-[#E3120B] text-[12.5px] font-bold mb-1">The Telegram on geopolitics</span>
                <h4 className="text-[20px] font-serif font-medium text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all mb-2">
                  When China's open-source AI is a trap
                </h4>
                <span className="text-[#767676] text-[11px] font-semibold">5 min read</span>
              </div>
              <img src="/imgi_37_geopolitics-desktop.webp" alt="AI trap" className="w-[110px] aspect-[1.4] object-cover flex-shrink-0" />
            </Link>

            <Link href="/article/chaguan-china" className="group flex flex-row items-center gap-4 mb-5 border-b border-[#e6e6e6] pb-5">
              <div className="flex flex-col flex-1">
                <span className="text-[#E3120B] text-[12.5px] font-bold mb-1">Chaguan on China</span>
                <h4 className="text-[20px] font-serif font-medium text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all mb-2">
                  A squeezed China is trying to wring more from its state assets
                </h4>
                <span className="text-[#767676] text-[11px] font-semibold">5 min read</span>
              </div>
              <img src="/imgi_159_20260718_CNP504.jpg" alt="China assets" className="w-[110px] aspect-[1.4] object-cover flex-shrink-0" />
            </Link>

            <Link href="/article/ashoka-india" className="group flex flex-row items-center gap-4 mb-8">
              <div className="flex flex-col flex-1">
                <span className="text-[#E3120B] text-[12.5px] font-bold mb-1">Ashoka on India</span>
                <h4 className="text-[20px] font-serif font-medium text-[#0f0f0f] leading-tight group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] transition-all mb-2">
                  An incomplete list of falling objects in India
                </h4>
                <span className="text-[#767676] text-[11px] font-semibold">4 min read</span>
              </div>
              <img src="/imgi_259_20260718_ASD000.jpg" alt="India objects" className="w-[110px] aspect-[1.4] object-cover flex-shrink-0" />
            </Link>

          </div>

        </div>

        {/* Horizontal Advertisement (Centered) */}
        <div className="w-full flex justify-center mt-10 mb-16 px-4">
          <div className="w-full max-w-[970px] h-[250px] bg-[#f9f9f9] border border-[#e6e6e6] relative flex">
            {/* Vertical Advertisement Text */}
            <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center w-[20px]">
              <span className="text-[10px] text-[#767676] font-medium tracking-widest -rotate-90 whitespace-nowrap">
                ADVERTISEMENT
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[26px] text-[#767676] font-medium tracking-wider">970 x 250</span>
            </div>
          </div>
        </div>

        {/* Latest Videos Section (Full Width) */}
        <div className="max-w-[1600px] mx-auto w-full w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%] mb-10">
          <LatestVideos />
        </div>

        {/* Black line separator */}
        <div className="max-w-[1600px] mx-auto w-full border-t-[2px] border-black mb-6"></div>

        {/* BOTTOM SECTION (Recent Highlights etc) */}
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-0 mb-10 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <div className="w-full lg:w-[70%] 2xl:w-[75%] flex flex-col pr-5">

            {/* Fourth Row: 4 Column Grid */}
            <h2 className="text-[14px] font-extrabold font-sans text-[#E3120B] uppercase tracking-widest mb-2 mt-2">POLITICAL HIGHLIGHTS</h2>
            <div className="flex flex-col md:flex-row w-full pb-10 md:-mx-4">
              {/* Col 1 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_575_20260718_WOT913.png" alt="Ukraine" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Graphic detail</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Russia is losing its grip on Crimea
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">2 min read</span>
                </Link>
              </div>
              
              {/* Col 2 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_576_20260718_EUD000.jpg" alt="Scandinavia Playground" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Charlemagne on Europe</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    In praise of Scandinavia's risky and dirty playgrounds
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">5 min read</span>
                </Link>
              </div>

              {/* Col 3 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_577_20260718_EUP002.jpg" alt="Carbon Pricing" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Europe</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Europe seems set to ease its carbon pricing
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">3 min read</span>
                </Link>
              </div>

              {/* Col 4 */}
              <div className="w-full md:w-[25%] md:px-4 flex flex-col border-l-0 md:border-l border-[#e6e6e6]">
                <Link href="/article/fallback-article" className="group cursor-pointer flex flex-col h-full flex-1">
                  <img src="/imgi_578_20260718_CUP506.jpg" alt="Christopher Nolan" className="w-full aspect-[3/2] object-cover mb-3" />
                  <div className="min-h-[40px] flex items-start">
                    <span className="text-[#E3120B] text-[13px] font-sans">Culture</span>
                  </div>
                  <h4 className="text-[16px] xl:text-[16.5px] 2xl:text-[19px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-all">
                    Why Sir Christopher Nolan inspires such devotion&mdash;and contempt
                  </h4>
                  <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">4 min read</span>
                </Link>
              </div>
            </div>

            {/* Ash color separator line */}
            <div className="w-full h-[1px] bg-[#e6e6e6] mt-4 mb-6"></div>
            {/* Fifth Row: Recent Highlights */}

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
              <Link href="/article/fallback-article" className="w-full md:w-[50%] pl-6 flex flex-row border-l-0 md:border-l border-[#e6e6e6] group cursor-pointer">
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
              <Link href="/article/fallback-article" className="w-full md:w-[50%] pl-6 flex flex-row border-l-0 md:border-l border-[#e6e6e6] group cursor-pointer">
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


          </div>
          
          {/* Right Column: Stories most read & Ad */}
          <div className="hidden lg:flex w-full lg:w-[30%] 2xl:w-[25%] flex-col pl-4 border-l-0 md:border-l border-[#e6e6e6] mt-8 lg:mt-0">
            <div className="w-full flex flex-col items-start pl-10 pr-4">
              <h3 className="text-[18px] font-bold font-sans text-black mb-6 lg:mb-4 2xl:mb-6">Stories most read by subscribers</h3>
            
            <ol className="flex flex-col w-full mb-10 lg:mb-5 2xl:mb-10">
              <li className="flex flex-row items-start border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4">
                <span className="text-[#E3120B] font-black text-[52px] leading-[0.8] w-[48px] flex-shrink-0 mt-1">1</span>
                <Link href="/article/most-read-1" className="text-[15.5px] 2xl:text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] hover:underline transition-all mt-1">
                  A very silly adaptation of "The Odyssey"
                </Link>
              </li>
              <li className="flex flex-row items-start border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4">
                <span className="text-[#E3120B] font-black text-[52px] leading-[0.8] w-[48px] flex-shrink-0 mt-1">2</span>
                <Link href="/article/most-read-2" className="text-[15.5px] 2xl:text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] hover:underline transition-all mt-1">
                  The world's most, and least, liveable cities in 2026
                </Link>
              </li>
              <li className="flex flex-row items-start border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4">
                <span className="text-[#E3120B] font-black text-[52px] leading-[0.8] w-[48px] flex-shrink-0 mt-1">3</span>
                <Link href="/article/most-read-3" className="text-[15.5px] 2xl:text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] hover:underline transition-all mt-1">
                  Donald Trump has no good options for reopening the Strait of Hormuz
                </Link>
              </li>
              <li className="flex flex-row items-start border-b border-[#e6e6e6] pb-4 mb-4 lg:pb-2 lg:mb-3 2xl:pb-4 2xl:mb-4">
                <span className="text-[#E3120B] font-black text-[52px] leading-[0.8] w-[48px] flex-shrink-0 mt-1">4</span>
                <Link href="/article/most-read-4" className="text-[15.5px] 2xl:text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] hover:underline transition-all mt-1">
                  Eli Lilly is reinventing the pharma business
                </Link>
              </li>
              <li className="flex flex-row items-start border-b border-[#e6e6e6] pb-4 mb-0 lg:pb-2 lg:mb-0 2xl:pb-4 2xl:mb-0">
                <span className="text-[#E3120B] font-black text-[52px] leading-[0.8] w-[48px] flex-shrink-0 mt-1">5</span>
                <Link href="/article/most-read-5" className="text-[15.5px] 2xl:text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] hover:underline transition-all mt-1">
                  Storm clouds gather over America's financial supremacy
                </Link>
              </li>
            </ol>
            </div>
            
            {/* Advertisement Banner */}
            <div className="w-full aspect-[1.15] bg-[#f9f9f9] border border-[#e6e6e6] flex flex-col items-center justify-center relative">
              <span className="text-[10px] text-[#767676] font-medium tracking-widest absolute top-2 text-center w-full">
                ADVERTISEMENT
              </span>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[26px] text-[#767676] font-medium tracking-wider">300 x 260</span>
              </div>
            </div>
          </div>
        </div>

        {/* The bottom thin line separating the hero from the next section */}
        <div className="max-w-[1600px] mx-auto w-full border-t-[2px] border-black mb-8"></div>
        
        {/* "This week" Section */}
        <div className="max-w-[1600px] mx-auto w-full mb-16 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">Trending Stories</h2>
          
          <div className="flex flex-col lg:flex-row w-full gap-8">
            
            {/* Left large article */}
            <Link href="/article/fallback-article" className="w-full lg:w-1/2 flex flex-col group cursor-pointer">
              <div className="w-full relative aspect-[1.6] mb-4 overflow-hidden bg-[#f9f9f9]">
                <img src="/imgi_329_20260718_WWP001.jpg" alt="Political stories" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">The world this week</span>
              <h3 className="text-[32px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
              <Link href="/article/fallback-article" className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">The world this week</span>
                  <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
              <Link href="/article/fallback-article" className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">Letters</span>
                  <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                  <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">The world this week</span>
                  <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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

        {/* Black line separator */}
        <div className="max-w-[1600px] mx-auto w-full border-t-[2px] border-black mb-8"></div>

        {/* Section: World news & Business / Advertisement */}
        <div className="max-w-[1600px] mx-auto w-full mb-16 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%] flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (75%) */}
          <div className="w-full lg:w-[72%] flex flex-col pr-0 lg:pr-8">
            
            {/* World news Section */}
            <div className="w-full mb-12">
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">World news</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Item 1 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Britain</span>
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
              <div className="w-full h-[2px] bg-black mb-4"></div>
              <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">Finance and economics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Item 1 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Business</span>
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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

          </div>

          {/* Right Column (25%) Advertisement */}
          <div className="hidden lg:flex w-full lg:w-[28%] flex-col pt-0 pl-8 border-l-0 md:border-l border-[#e6e6e6]">
            <div className="w-full h-[770px] bg-[#f9f9f9] border border-[#e6e6e6] flex items-start justify-center pt-4 mt-2 relative">
              <span className="text-[10px] text-[#767676] font-medium tracking-wider">ADVERTISEMENT</span>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[26px] text-[#767676] font-medium tracking-wider">336 x 770</span>
              </div>
            </div>
          </div>
          
        </div>

                {/* Full-width line below finance and economics */}
        <div className="max-w-[1600px] mx-auto w-full border-t-[2px] border-black mb-4 mt-12"></div>

        <div className="max-w-[1600px] mx-auto w-full mb-16 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <div className="w-full flex flex-col">
{/* Data That Tells Stories Section */}
            <div className="w-full mt-2">
              
              <h2 className="text-[21px] font-bold font-sans text-black mb-6 tracking-tight">Data That Tells Stories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                
                {/* Item 1 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      The world's most, and least, liveable cities in 2026
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">2 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_437_20260711_WOT992.png" alt="Liveable cities" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                  </div>
                </Link>

                {/* Item 3 (Dup) */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-6 border-b border-[#e6e6e6] group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      The world's most, and least, liveable cities in 2026
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto">2 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_437_20260711_WOT992.png" alt="Liveable cities" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                  </div>
                </Link>

                {/* Item 3 */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full pb-0 group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
                      Where will Europe's heatwave be most deadly?
                    </h4>
                    <span className="text-[#3b3b3b] text-[12.5px] font-sans mt-auto pt-4">2 min read</span>
                  </div>
                  <div className="w-[40%] overflow-hidden bg-[#f9f9f9]">
                    <img src="/imgi_453_20260627_WOT973.png" alt="Europe heatwave" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply" />
                  </div>
                </Link>

                {/* Item 6 (Dup) */}
                <Link href="/article/fallback-article" className="flex flex-row items-start w-full group cursor-pointer">
                  <div className="w-[60%] pr-4 flex flex-col">
                    <span className="text-[#E3120B] text-[12px] font-sans mb-1 mt-[-2px] tracking-tight">Graphic detail</span>
                    <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
        </div>
{/* Business Weekend Section */}
        <div className="max-w-[1600px] mx-auto w-full mt-12 mb-16 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <div className="w-full flex flex-col lg:flex-row gap-8">
            
            {/* Main Content Column (75%) */}
            <div className="w-full lg:w-[75%] flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-2">
                <h2 className="text-[20px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Business Weekend
                </h2>
              </div>
              
              {/* Top Row */}
              <div className="w-full flex flex-col md:flex-row mt-2 px-0">
                {/* Left Side: What to watch this week */}
                <div className="w-full md:w-[48%] flex flex-col pr-6 mb-8 md:mb-0 relative">
                  <div className="hidden md:block absolute right-0 top-0 bottom-6 w-[1px] bg-[#e6e6e6]"></div>
                  <Link href="/article/what-to-watch" className="group flex flex-col cursor-pointer pb-5">
                    <img src="/img_girl_lighter_clear.png" alt="What to watch this week" className="w-full aspect-[1.7] object-cover mb-4" />
                    <span className="text-[#E3120B] text-[12.5px] font-medium mb-1 mt-1">Culture</span>
                    <h3 className="text-[32px] font-serif text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">
                      What to watch this week
                    </h3>
                    <p className="text-[16px] font-serif text-[#3b3b3b] mb-4 leading-snug">
                      Our list this week uncovers truths about pretenders and Pompeii
                    </p>
                    <span className="text-[#767676] text-[12px] font-semibold">2 min read</span>
                  </Link>
                </div>

                {/* Right Side: 2 Stacked Articles */}
                <div className="w-full md:w-[52%] flex flex-col md:pl-6">
                  {/* Hikers */}
                  <Link href="/article/hikers" className="group flex flex-row items-start justify-between border-b border-[#e6e6e6] pb-5 mb-5 cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <span className="text-[#E3120B] text-[12.5px] font-medium mb-1">Culture</span>
                      <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">
                        Why Gen Z hikers keep getting lost up mountains
                      </h4>
                      <p className="text-[15.5px] font-serif text-[#3b3b3b] mb-3 leading-snug">
                        Following social media, they set off with more inspiration than preparation
                      </p>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto">2 min read</span>
                    </div>
                    <img src="/imgi_576_20260718_EUD000.jpg" alt="Hikers" className="w-[140px] md:w-[180px] 2xl:w-[280px] aspect-[1.7] object-cover flex-shrink-0" />
                  </Link>

                  {/* Colson Whitehead */}
                  <Link href="/article/colson-whitehead" className="group flex flex-row items-start justify-between pb-5 cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <span className="text-[#E3120B] text-[12.5px] font-medium mb-1">Culture</span>
                      <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-3 group-hover:text-[#003a6a] group-hover:underline transition-all">
                        Colson Whitehead concludes his three-part love letter to New York
                      </h4>
                      <p className="text-[15.5px] font-serif text-[#3b3b3b] mb-3 leading-snug">
                        And reminds readers that crime fiction is the best urban genre
                      </p>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto">3 min read</span>
                    </div>
                    <img src="/imgi_460_20260718_DE_AP.jpg" alt="Colson Whitehead" className="w-[140px] md:w-[180px] 2xl:w-[280px] aspect-[1.7] object-cover flex-shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="w-full flex flex-col md:flex-row border-t border-[#e6e6e6] pt-5">
                {/* Left Side: Romans */}
                <div className="w-full md:w-[48%] flex flex-col pr-6 md:border-r border-[#e6e6e6] mb-8 md:mb-0">
                  <Link href="/article/romans" className="group flex flex-row items-start justify-between cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <span className="text-[#E3120B] text-[12.5px] font-medium mb-1">Culture</span>
                      <h4 className="text-[17px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors">
                        What did the Romans ever do for<br />Christianity?
                      </h4>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto mb-1 pt-2">3 min read</span>
                    </div>
                    <img src="/imgi_578_20260718_CUP506.jpg" alt="Romans" className="w-[220px] aspect-[1.8] object-cover flex-shrink-0" />
                  </Link>
                </div>

                {/* Right Side: Graeme James */}
                <div className="w-full md:w-[52%] flex flex-col md:pl-6">
                  <Link href="/article/graeme-james" className="group flex flex-row items-start justify-between cursor-pointer">
                    <div className="flex flex-col pr-5 flex-1 mt-[-2px]">
                      <span className="text-[#E3120B] text-[12.5px] font-medium mb-1">Culture</span>
                      <h4 className="text-[17px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline transition-colors">
                        The Economist's cover designer, Graeme<br />James, has died, aged 65
                      </h4>
                      <span className="text-[#767676] text-[12px] font-semibold mt-auto mb-1 pt-2">2 min read</span>
                    </div>
                    <img src="/imgi_577_20260718_EUP002.jpg" alt="Graeme James" className="w-[220px] aspect-[1.8] object-cover flex-shrink-0" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Column (25%) Advertisement */}
            <div className="hidden lg:flex w-full lg:w-[25%] flex-col pt-0 pl-8 pb-8">
              <div className="w-full bg-[#f9f9f9] border border-[#e6e6e6] h-full flex items-start justify-center pt-4 relative">
                <span className="text-[10px] text-[#767676] font-medium tracking-wider">ADVERTISEMENT</span>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[26px] text-[#767676] font-medium tracking-wider">300 x 600</span>
                </div>
              </div>
            </div>

          </div>
        </div>
{/* Horizontal Empty Advertisement */}
        <div className="w-full max-w-[1600px] mx-auto mb-16 mt-24 flex justify-center w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <div className="w-full max-w-[1150px] bg-[#f9f9f9] border border-[#e6e6e6] h-[380px] flex items-center relative">
            <div className="absolute -left-[30px] w-[100px] text-center -rotate-90">
              <span className="text-[10px] text-[#767676] font-medium tracking-widest">ADVERTISEMENT</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[26px] text-[#767676] font-medium tracking-wider">1150 x 380</span>
            </div>
          </div>
        </div>
                {/* 4 Column Business Section */}

        {/* "This week" Section */}
        <div className="max-w-[1600px] mx-auto w-full mt-32 mb-16 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <h2 className="text-[19px] font-bold font-sans text-black mb-6 tracking-tight">Justice & Human Rights</h2>
          
          <div className="flex flex-col lg:flex-row w-full gap-8">
            
            {/* Left large article */}
            <Link href="/article/fallback-article" className="w-full lg:w-1/2 flex flex-col group cursor-pointer">
              <div className="w-full relative aspect-[1.6] mb-4 overflow-hidden bg-[#f9f9f9]">
                <img src="/imgi_329_20260718_WWP001.jpg" alt="Political stories" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">The world this week</span>
              <h3 className="text-[32px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
              <Link href="/article/fallback-article" className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">The world this week</span>
                  <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
              <Link href="/article/fallback-article" className="w-full flex flex-row items-start mb-6 pb-0 group cursor-pointer">
                <div className="w-[65%] pr-6 flex flex-col">
                  <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">Letters</span>
                  <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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
                  <span className="text-[#E3120B] text-[12px] font-sans font-bold mb-1 mt-[-2px]">The world this week</span>
                  <h4 className="text-[22px] font-serif font-medium text-[#0f0f0f] leading-tight mb-2 group-hover:text-[#003a6a] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[3px] group-hover:decoration-[#003a6a] transition-colors">
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

        <div className="max-w-[1600px] mx-auto w-full mb-16 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <div className="w-full flex flex-col md:flex-row gap-8">
            
            {/* Col 1 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Sports
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_501_20260718_WBP503.jpg" alt="Business" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How SK Hynix became the king of advanced memory chips</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How to sell a kettle</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Eli Lilly is reinventing the pharma business</h4>
              </Link>
            </div>

            {/* Col 2 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Cryptocurrency
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_510_20260718_FND000.jpg" alt="Finance" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How to shrink the Fed&rsquo;s $7trn balance-sheet</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Can Kevin Warsh's Fed force 5 reimagine monetary policymaking?</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">China's trade gap is narrowing. And other surprises</h4>
              </Link>
            </div>

            {/* Col 3 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Technology
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_573_20260718_CND001.jpg" alt="US" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Cartoon: Continuing uncertainty over the Strait of Hormuz</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">America's other battle with Iran</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Lindsey Graham tried to save the wrong countries from Donald Trump</h4>
              </Link>
            </div>

            {/* Col 4 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Healthcare
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_355_20260718_WWD000.png" alt="AI" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">China wants to end AI romances</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Sovereign AI, independent of America and China, is a pipe dream</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">How to make AI safe&mdash;and lessen dependence on America and China</h4>
              </Link>
            </div>

          </div>
        </div>

        {/* Second 4 Column Section */}
        <div className="max-w-[1600px] mx-auto w-full mb-16 w-[90%] md:w-[90%] lg:w-[85%] xl:w-[85%] 2xl:w-[85%]">
          <div className="w-full flex flex-col md:flex-row gap-8">
            
            {/* Col 1 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Entertainment
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_109_1843_20260708_1843_MELNI_Teas.jpg" alt="1843" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">A top Russian oligarch breaks the silence</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">The ethical people-smuggler</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">The strange disappearance of Japan's animators</h4>
              </Link>
            </div>

            {/* Col 2 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Energy
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_110_20260718_BID001.jpg" alt="By Invitation" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Would Europeans fight, if it came to that?</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Elon Musk is building a form of capitalism that Adam Smith would hate</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Why a broken Russia is bad for the world</h4>
              </Link>
            </div>

            {/* Col 3 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Opinions
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_111_20260718_BRP502.jpg" alt="Newsletters" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Blighty newsletter: Britain&rsquo;s most popular names</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Analysing Africa newsletter: Another looming atrocity in Sudan</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">Plot Twist newsletter: What will the new generation of zillionaires collect?</h4>
              </Link>
            </div>

            {/* Col 4 */}
            <div className="w-full md:w-1/4 flex flex-col">
              <div className="w-full border-t-[2px] border-black pt-2 pb-3 mb-4">
                <h2 className="text-[18px] font-bold font-sans text-black flex items-center hover:text-[#003a6a] hover:underline transition-colors cursor-pointer group">
                  Congress
                </h2>
              </div>
              
              <Link href="/article/fallback-article" className="w-full group cursor-pointer mb-5">
                <div className="w-full overflow-hidden mb-3 relative aspect-[3/2]">
                  <img src="/imgi_112_20260718_PDP509.jpg" alt="Podcasts" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
                </div>
                <h4 className="text-[20px] font-serif font-semibold text-[#0f0f0f] leading-[1.25] mb-2 tracking-tight group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">The man reinventing a trillion-dollar drugmaker</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">In it to bin it: Nigel Farage v Count Binface</h4>
              </Link>

              <Link href="/article/fallback-article" className="w-full border-t border-[#e6e6e6] py-3 group cursor-pointer">
                <h4 className="text-[17px] font-serif font-medium text-[#3b3b3b] leading-[1.3] group-hover:text-[#003a6a] group-hover:underline transition-colors pr-2">What faces reveal about humanity</h4>
              </Link>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}