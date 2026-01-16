import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

// GET /api/categories - List all categories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:slug - Get category by slug
router.get('/:slug', categoryController.getCategoryBySlug);

export default router;
