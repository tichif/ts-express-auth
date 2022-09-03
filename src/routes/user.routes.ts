import { Router } from 'express';

import validateResource from '../middleware/validateResource';
import { createUserSchema, verifyUserSchema } from '../schema/user.schema';
import {
  createUserHandle,
  verifyUserHandler,
} from '../controllers/users.controller';

const router = Router();

router.post('/', validateResource(createUserSchema), createUserHandle);
router.get(
  '/verify/:id/:verificationCode',
  validateResource(verifyUserSchema),
  verifyUserHandler
);

export default router;
