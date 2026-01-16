import type { NewsItem } from '../types/news.js';

// RSS Feed URLs for F1 news
const RSS_FEEDS = [
  {
    url: 'https://www.autosport.com/rss/f1/news/',
    source: 'Autosport',
  },
  {
    url: 'https://www.motorsport.com/rss/f1/news/',
    source: 'Motorsport.com',
  },
  {
    url: 'https://www.racefans.net/feed/',
    source: 'RaceFans',
  },
];

// Simple XML parser for RSS feeds
function parseRSSItem(itemXml: string, source: string): NewsItem | null {
  try {
    const getTagContent = (xml: string, tag: string): string => {
      const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
      const match = xml.match(regex);
      return (match?.[1] || match?.[2] || '').trim();
    };

    const title = getTagContent(itemXml, 'title');
    const link = getTagContent(itemXml, 'link');
    const description = getTagContent(itemXml, 'description')
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .substring(0, 200);
    const pubDate = getTagContent(itemXml, 'pubDate');

    // Try to extract image from media:content or enclosure
    let imageUrl: string | undefined;
    const mediaMatch = itemXml.match(/url="([^"]+\.(jpg|jpeg|png|webp)[^"]*)"/i);
    if (mediaMatch) {
      imageUrl = mediaMatch[1];
    }

    if (!title || !link) return null;

    return {
      id: Buffer.from(link).toString('base64').substring(0, 20),
      title,
      description,
      link,
      pubDate,
      source,
      imageUrl,
    };
  } catch {
    return null;
  }
}

function parseRSSFeed(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = parseRSSItem(match[1], source);
    if (item) {
      items.push(item);
    }
  }

  return items;
}

export async function fetchNews(limit: number = 10): Promise<NewsItem[]> {
  const allNews: NewsItem[] = [];

  // Fetch from multiple sources in parallel
  const fetchPromises = RSS_FEEDS.map(async (feed) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(feed.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'ApexChronicle/1.0',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) return [];

      const xml = await response.text();
      return parseRSSFeed(xml, feed.source);
    } catch (error) {
      console.error(`Failed to fetch from ${feed.source}:`, error);
      return [];
    }
  });

  const results = await Promise.all(fetchPromises);
  results.forEach((items) => allNews.push(...items));

  // Sort by date (newest first) and limit
  return allNews
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, limit);
}

// Fallback news items when RSS feeds are unavailable
export function getFallbackNews(): NewsItem[] {
  return [
    {
      id: 'fallback-1',
      title: 'F1 2026 Season Preview: New Regulations Promise Exciting Racing',
      description: 'The 2026 Formula 1 season brings significant regulation changes including new power units and aerodynamic rules.',
      link: 'https://www.formula1.com',
      pubDate: new Date().toISOString(),
      source: 'Formula1.com',
    },
    {
      id: 'fallback-2',
      title: 'Teams Complete Final Pre-Season Test',
      description: 'All teams have wrapped up pre-season testing ahead of the season opener in Bahrain.',
      link: 'https://www.formula1.com',
      pubDate: new Date().toISOString(),
      source: 'Formula1.com',
    },
  ];
}
