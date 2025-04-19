import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import { seedUsers } from '../seeds/user-seeds.js';

const router = Router();

// ✅ TEMP ROUTE: Seed users directly in Render DB
router.post('/dev/seed-users', async (req, res) => {
  try {
    await seedUsers();
    res.send('✅ Seeded users on Render DB');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    res.status(500).send('❌ Failed to seed users');
  }
});

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;

