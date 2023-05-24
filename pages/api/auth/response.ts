import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers['authorization'] as string;

  const token = req.headers['authorization']?.split(' ')[1] as string;
  const sign = new TextEncoder().encode(process.env.JWT_SIGN);
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) res.status(401).json({ error: 'no email in jwt' });
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  res.status(200).json({ user: user });
}
