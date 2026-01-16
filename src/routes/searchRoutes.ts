import { Router } from 'express';
import * as searchController from '../controllers/searchController.js';

const router = Router();

// GET /api/search?q=query - Search articles
router.get('/', searchController.search);

export default router;
