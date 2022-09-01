import { Router } from 'express';

import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandle } from '../controllers/users.controller';

const router = Router();

router.post('/', validateResource(createUserSchema), createUserHandle);

export default router;
