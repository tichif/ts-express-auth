import { Request, Response } from 'express';

import { CreateUserInterface } from '../schema/user.schema';
import { createUser } from '../services/user.services';

export async function createUserHandle(
  req: Request<{}, {}, CreateUserInterface>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res.status(201).send('User created successfully');
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send('Account already registered');
    }

    return res.status(500).send(error);
  }
}