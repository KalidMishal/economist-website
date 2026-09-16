import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const newsLinks = [
    { label: 'World', href: '/category/world' },
    { label: 'Finance & Economics', href: '/category/finance-and-economics' },
    { label: 'Politics', href: '/category/politics' },
    { label: 'Technology', href: '/category/technology' },
    { label: 'Industries', href: '/category/industries' },
  ];

  const featuredLinks = [
    { label: 'Politics', href: '/category/politics' },
    { label: 'Business', href: '/category/business' },
    { label: 'Technology', href: '/category/technology' },
    { label: 'Stockmarkets', href: '/category/stockmarkets' },
    { label: 'China', href: '/category/china' },
    { label: 'Asia', href: '/category/asia' },
    { label: 'Europe', href: '/category/europe' },
    { label: 'Middle East', href: '/category/middle-east' },
    { label: 'Sports', href: '/category/sports' },
  ];

  const aboutLinks = [
    { label: 'About us', href: '/about-us' },
    { label: 'Contact us', href: '/contact-us' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Editorial Policy', href: '/editorial-policy' },
    { label: 'Advertise with us', href: '/advertise-with-us' },
    { label: 'RSS Feed', href: '/rss' },
  ];

  const followUsLinks = [
    { 
      name: 'Facebook', 
      path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z',
      href: '#'
    },
    { 
      name: 'LinkedIn', 
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z',
      href: '#'
    },
    { 
      name: 'Instagram', 
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
      href: '#'
    }
  ];

  const Header = ({ title }: { title: string }) => (
    <h3 className="text-[14px] font-serif font-bold uppercase mb-[18px] text-white">{title}</h3>
  );

  return (
    <footer className="bg-[#1c1c1c] w-full text-white pt-[60px] pb-[40px]">
      <div className="max-w-[1600px] mx-auto w-[90%] md:w-[90%] lg:w-[92%] xl:w-[88%] 2xl:w-[85%]">
        
        {/* Top Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-14">
          
          {/* NEWS */}
          <div className="flex flex-col">
            <Header title="NEWS" />
            <ul className="flex flex-col gap-3 text-[13.5px] font-sans text-gray-300">
              {newsLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FEATURED */}
          <div className="flex flex-col">
            <Header title="FEATURED" />
            <ul className="flex flex-col gap-3 text-[13.5px] font-sans text-gray-300">
              {featuredLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ABOUT */}
          <div className="flex flex-col">
            <Header title="ABOUT" />
            <ul className="flex flex-col gap-3 text-[13.5px] font-sans text-gray-300">
              {aboutLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white hover:underline transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* EDITIONS */}
          <div className="flex flex-col">
            <Header title="EDITIONS" />
            <ul className="flex flex-col gap-3 text-[13.5px] font-sans">
              <li>
                <Link href="/category/united-states" className="text-gray-300 hover:text-white hover:underline transition-colors">United States</Link>
              </li>
              <li className="text-gray-500 cursor-default">China</li>
              <li className="text-gray-500 cursor-default">Europe</li>
              <li className="text-gray-500 cursor-default">Asia</li>
              <li className="text-gray-500 cursor-default">Middle East</li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div className="flex flex-col">
            <Header title="FOLLOW US" />
            <ul className="flex flex-col gap-4 text-[13.5px] font-sans text-gray-300">
              {followUsLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="flex items-center gap-3 hover:text-white group transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-gray-300 group-hover:text-white">
                      <path d={link.path} />
                    </svg>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
              {/* Rumble */}
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-white group transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#85c742] group-hover:text-[#a1e658]">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  <span>Rumble</span>
                </a>
              </li>
              {/* Newsletter */}
              <li>
                <a href="#" className="flex items-center gap-3 hover:text-white group transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-gray-300 group-hover:text-white">
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                  </svg>
                  <span>Newsletter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-[#333] mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image 
              src="/Logo 2 Newyork capital.svg" 
              alt="Newyork Capital" 
              width={260} 
              height={70} 
              className="mb-4" 
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <p className="text-[#a0a0a0] text-[12px] font-sans text-center">
            © Copyright 2026 Newyork Capital Media LLC. All Rights Reserved. All standard legal notices apply.
          </p>
        </div>

      </div>
    </footer>
  );
}
