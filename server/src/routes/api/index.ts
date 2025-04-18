import { Router } from 'express';
import { ticketRouter } from './ticket-routes.js';
import { userRouter } from './user-routes.js';
import { authenticateToken } from '../../middleware/auth.js'; // ✅ Add this import

const router = Router();

// ✅ Protect all /tickets routes with JWT middleware
router.use('/tickets', authenticateToken, ticketRouter);

// ✅ Protect all /users routes with JWT middleware
router.use('/users', authenticateToken, userRouter);

export default router;

