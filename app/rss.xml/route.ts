import { SITE } from '@/lib/site';
import { insights } from '@/data/insights';

export async function GET() {
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE.name} - Insights</title>
    <link>${SITE.baseUrl}/insights</link>
    <description>Smart home automation insights and updates from ${SITE.name}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${insights.map(post => `
      <item>
        <title>${post.title}</title>
        <link>${SITE.baseUrl}/insights/${post.slug}</link>
        <guid>${SITE.baseUrl}/insights/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
      </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}