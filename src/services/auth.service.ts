import { DocumentType } from '@typegoose/typegoose';

import { User } from '../models/User';
import { signJwt } from '../utils/jwt';
import SessionModel from '../models/Session';

export function signAccessToken(user: DocumentType<User>) {
  const payload = user.toJSON();

  const accessToken = signJwt(payload, 'accessTokenPrivateKey');

  return accessToken;
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({ userId });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    'refreshTokenPrivateKey'
  );

  return refreshToken;
}

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}
