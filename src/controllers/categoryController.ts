import type { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/categoryService.js';
import { AppError } from '../middleware/errorHandler.js';

export function getAllCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

export function getCategoryBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = req.params;
    const category = categoryService.getCategoryBySlug(slug as string);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
}
