import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let authorName = "Author";
  let imageUrl = "/Newyork-Capital-Thumbnail.jpg";
  let bio = "News, Politics, Economics, Business & Finance";

  try {
    const res = await fetch(`http://localhost:5000/api/users/${id}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.user) {
        authorName = data.user.name || authorName;
        imageUrl = data.user.profile_picture || imageUrl;
        bio = data.user.bio || bio;
      }
    }
  } catch (error) {
    // Ignore and use defaults
  }

  const siteName = "Newyork Capital";
  const title = `${authorName} | ${siteName}`;

  return {
    title,
    description: bio,
    openGraph: {
      title,
      description: bio,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: bio,
      images: [imageUrl],
    },
  };
}

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
