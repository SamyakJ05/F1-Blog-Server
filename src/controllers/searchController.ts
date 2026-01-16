import type { Request, Response, NextFunction } from 'express';
import * as articleService from '../services/articleService.js';

export function search(req: Request, res: Response, next: NextFunction) {
  try {
    const query = (req.query.q as string) || '';

    if (!query.trim()) {
      return res.json([]);
    }

    const articles = articleService.searchArticles(query.trim());
    res.json(articles);
  } catch (error) {
    next(error);
  }
}
