import { Request, Response } from 'express';

import {
  CreateUserInterface,
  VerifyUserInterface,
} from '../schema/user.schema';
import { createUser, findUserById } from '../services/user.services';
import sendEmail from '../utils/mailer';

export async function createUserHandle(
  req: Request<{}, {}, CreateUserInterface>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    await sendEmail({
      from: 'test@test.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `Verification Code ${user.verificationCode}. ID - ${user.id}`,
    });

    return res.status(201).send('User created successfully');
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send('Account already registered');
    }

    return res.status(500).send(error);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInterface>,
  res: Response
) {
  const { id, verificationCode } = req.params;

  // find the user with his id
  const user = await findUserById(id);

  if (!user) {
    return res.status(404).send('Could not verify user.');
  }

  // check if he is already verified
  if (user.verified) {
    return res.status(403).send('User is already verified.');
  }

  // check to see if the verification code matches
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();

    return res.status(200).send('User successfully verified.');
  }

  return res.status(400).send('User cannot be verified');
}
