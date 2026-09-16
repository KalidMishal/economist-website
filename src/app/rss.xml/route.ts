import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("http://localhost:5000/api/homepage/sections", { cache: "no-store" });
    if (!res.ok) {
      return new NextResponse('Failed to fetch data', { status: 500 });
    }
    
    const sections = await res.json();
    
    // Flatten all articles from sections into a single array
    let allArticles: any[] = [];
    
    Object.values(sections).forEach((section: any) => {
      if (Array.isArray(section)) {
        allArticles = [...allArticles, ...section];
      }
    });
    
    // Remove duplicates by id
    const uniqueArticles = allArticles.reduce((acc, current) => {
      const x = acc.find((item: any) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    
    // Sort by created_at descending
    uniqueArticles.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.created_at || Date.now()).getTime();
      const dateB = new Date(b.createdAt || b.created_at || Date.now()).getTime();
      return dateB - dateA;
    });
    
    // Take top 50 articles for the RSS feed
    const topArticles = uniqueArticles.slice(0, 50);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://newyork-capital.com';

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
      <channel>
        <title>Newyork Capital</title>
        <link>${baseUrl}</link>
        <description>The latest news, opinions, and analysis from Newyork Capital.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
        ${topArticles.map((article: any) => {
          const articleUrl = \`\${baseUrl}/article/\${article.slug || article.id}\`;
          const pubDate = new Date(article.createdAt || article.created_at || Date.now()).toUTCString();
          return \`
          <item>
            <title><![CDATA[\${article.title}]]></title>
            <link>\${articleUrl}</link>
            <guid isPermaLink="true">\${articleUrl}</guid>
            <pubDate>\${pubDate}</pubDate>
            <description><![CDATA[\${article.cardSummary || article.title}]]></description>
            \${article.imageUrl ? \`<media:content url="\${article.imageUrl.startsWith('http') ? article.imageUrl : baseUrl + article.imageUrl}" medium="image" />\` : ''}
            \${article.mainCategory ? \`<category><![CDATA[\${article.mainCategory}]]></category>\` : ''}
          </item>\`;
        }).join('')}
      </channel>
    </rss>`;

    return new NextResponse(rssFeed.trim(), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
