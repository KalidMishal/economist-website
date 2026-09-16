import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Guidelines and Ethics Policy | Newyork Capital',
  description: 'Read the editorial guidelines and ethics policy that govern the journalism at Newyork Capital.'
};

export default function EditorialPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
