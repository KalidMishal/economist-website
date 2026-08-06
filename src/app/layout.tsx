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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')),
  title: "Newyork Capital",
  description: "News, Politics, Economics, Business & Finance",
  openGraph: {
    images: ['/Newyork-Capital-Thumbnail.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/Newyork-Capital-Thumbnail.jpg'],
  },
};
import SubscriptionBanner from "@/components/SubscriptionBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#0F0F0F] overflow-x-hidden w-full max-w-[100vw]">
        {children}
        <SubscriptionBanner />
      </body>
    </html>
  );
}
