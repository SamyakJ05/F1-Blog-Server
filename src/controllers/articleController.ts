import type { Request, Response, NextFunction } from 'express';
import * as articleService from '../services/articleService.js';
import { AppError } from '../middleware/errorHandler.js';

export function getAllArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const articles = articleService.getArticles({ page, limit });
    res.json(articles);
  } catch (error) {
    next(error);
  }
}

export function getFeaturedArticles(_req: Request, res: Response, next: NextFunction) {
  try {
    const articles = articleService.getFeaturedArticles();
    res.json(articles);
  } catch (error) {
    next(error);
  }
}

export function getArticlesByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const articles = articleService.getArticlesByCategory(slug as string);
    res.json(articles);
  } catch (error) {
    next(error);
  }
}

export function getArticleBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const article = articleService.getArticleBySlug(slug as string);

    if (!article) {
      throw new AppError('Article not found', 404);
    }

    res.json(article);
  } catch (error) {
    next(error);
  }
}
