import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Newyork Capital',
  description: 'Review the Newyork Capital Terms & Conditions governing website access, content usage, intellectual property rights, user responsibilities, and legal policies.'
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
