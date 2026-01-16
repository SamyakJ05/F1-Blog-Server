import { Router } from 'express';
import * as articleController from '../controllers/articleController.js';

const router = Router();

// GET /api/articles - List all articles with pagination
router.get('/', articleController.getAllArticles);

// GET /api/articles/featured - Get featured articles
router.get('/featured', articleController.getFeaturedArticles);

// GET /api/articles/category/:slug - Get articles by category
router.get('/category/:slug', articleController.getArticlesByCategory);

// GET /api/articles/:slug - Get single article by slug
router.get('/:slug', articleController.getArticleBySlug);

export default router;
