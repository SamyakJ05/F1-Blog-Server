import { Router } from 'express';
import articleRoutes from './articleRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import searchRoutes from './searchRoutes.js';
import newsRoutes from './newsRoutes.js';

const router = Router();

router.use('/articles', articleRoutes);
router.use('/categories', categoryRoutes);
router.use('/search', searchRoutes);
router.use('/news', newsRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
