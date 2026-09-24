import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL
      ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith('http') ? process.env.NEXT_PUBLIC_SITE_URL : `https://${process.env.NEXT_PUBLIC_SITE_URL}`)
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000'
  ),
  title: "Newyork Capital",
  description: "News, Politics, Economics, Business & Finance",
  openGraph: {
    title: "Newyork Capital",
    description: "News, Politics, Economics, Business & Finance",
    url: '/',
    siteName: 'Newyork Capital',
    images: [
      {
        url: '/Newyork-Capital-Thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Newyork Capital',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Newyork Capital",
    description: "News, Politics, Economics, Business & Finance",
    images: ['/Newyork-Capital-Thumbnail.jpg'],
  },
};
import SubscriptionBanner from "@/components/SubscriptionBanner";
import GoogleAuthProviderWrapper from "@/components/GoogleAuthProviderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#0F0F0F] overflow-x-hidden w-full max-w-[100vw]" suppressHydrationWarning>
        <GoogleAuthProviderWrapper>
          {children}
          <SubscriptionBanner />
        </GoogleAuthProviderWrapper>
      </body>
    </html>
  );
}
