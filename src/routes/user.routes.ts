import { Router } from 'express';

import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
} from '../schema/user.schema';
import {
  createUserHandle,
  forgotPasswordHandler,
  verifyUserHandler,
} from '../controllers/users.controller';

const router = Router();

router.post('/', validateResource(createUserSchema), createUserHandle);
router.get(
  '/verify/:id/:verificationCode',
  validateResource(verifyUserSchema),
  verifyUserHandler
);
router.post(
  '/forgotpassword',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

export default router;
