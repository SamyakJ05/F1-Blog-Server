import type { Request, Response, NextFunction } from 'express';
import { fetchNews, getFallbackNews } from '../services/newsService.js';

export async function getNews(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    let news = await fetchNews(limit);

    // Use fallback if no news fetched
    if (news.length === 0) {
      news = getFallbackNews();
    }

    res.json(news);
  } catch (error) {
    next(error);
  }
}
