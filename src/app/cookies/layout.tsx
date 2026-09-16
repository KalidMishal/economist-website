import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Newyork Capital',
  description: 'Learn how Newyork Capital uses cookies and similar tracking technologies to improve your browsing experience.'
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
