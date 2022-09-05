import { Request, Response } from 'express';

import { CreateSessionInterface } from '../schema/auth.schema';
import { findUserByEmail } from '../services/user.services';
import { signAccessToken, signRefreshToken } from '../services/auth.service';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInterface>,
  res: Response
) {
  const message = 'Invalid email or password';

  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  if (!user.verified) {
    return res.send('Please verify your email');
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  // send an access token
  const accessToken = signAccessToken(user);

  // send a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });

  // send the tokens
  return res.send({ accessToken, refreshToken });
}
