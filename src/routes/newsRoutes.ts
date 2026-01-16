import { Router } from 'express';
import * as newsController from '../controllers/newsController.js';

const router = Router();

// GET /api/news - Get latest F1 news from RSS feeds
router.get('/', newsController.getNews);

export default router;
