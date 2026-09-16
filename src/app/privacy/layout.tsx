import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Newyork Capital',
  description: 'Learn how Newyork Capital collects, uses, and protects your personal information. Read our complete privacy policy.'
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
