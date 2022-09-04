import { Router } from 'express';

import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../schema/user.schema';
import {
  createUserHandle,
  forgotPasswordHandler,
  resetPasswordHandler,
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
router.post(
  '/resetpassword/:id/:passwordResetCode',
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

export default router;
