import express, { Request, Response, NextFunction } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = express.Router();

router.get('/health', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);

export default router;
