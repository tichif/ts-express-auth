import { Request, Response } from 'express';
import { nanoid } from 'nanoid';

import {
  CreateUserInterface,
  ForgotPasswordInterface,
  VerifyUserInterface,
} from '../schema/user.schema';
import {
  createUser,
  findUserByEmail,
  findUserById,
} from '../services/user.services';
import log from '../utils/logger';
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

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInterface>,
  res: Response
) {
  const { email } = req.body;

  const message = 'Check your email for a password reset token.';

  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`User with email ${email} does not exist.`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('User is not verified.');
  }

  const passwordResetCode = nanoid();

  user.passwordReset = passwordResetCode;

  await user.save();

  await sendEmail({
    from: 'test.test.com',
    to: user.email,
    subject: 'Password reset token',
    text: `Password reset Code: ${passwordResetCode}. ID - ${user.id}`,
  });

  log.debug(`Password reset email sent to ${user.email}`);
  return res.send(message);
}
