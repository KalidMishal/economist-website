import sys

file_path = 'C:/Users/User/.gemini/antigravity/scratch/economist-clone/frontend/src/app/article/[slug]/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

bad_chunk = """    if (data.post) return mapBackendPost(data.post);
  const { slug } = await params;"""

good_chunk = """    if (data.post) return mapBackendPost(data.post);
    return null;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dynamicArticle = await getDynamicArticle(slug);
  const article = dynamicArticle || articleData[slug] || defaultArticle;
  
  const siteName = "Newyork Capital";
  const defaultImage = "/Newyork-Capital-Thumbnail.jpg";
  const imageUrl = article.image || defaultImage;

  return {
    title: `${article.title} | ${siteName}`,
    description: article.subtitle,
    openGraph: {
      title: `${article.title} | ${siteName}`,
      description: article.subtitle || "",
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | ${siteName}`,
      description: article.subtitle || "",
      images: [imageUrl],
    },
  };
}

import ViewTracker from "@/components/ViewTracker";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;"""

if bad_chunk in content:
    new_content = content.replace(bad_chunk, good_chunk)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed article page.")
else:
    print("Bad chunk not found.")
