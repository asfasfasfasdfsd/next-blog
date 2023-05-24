import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMsg: 'invalid email',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMsg: 'invalid password',
      },
    ];

    validationSchema.forEach((ele) => {
      if (!ele.valid) errors.push(ele.errorMsg);
    });
    if (errors.length) return res.status(400).json({ errorMsg: errors[0] });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return res
        .status(401)
        .json({ errorMsg: 'email or password are wrong 1' });
    const isMatch = await bcrypt.compare(password, user?.password);
    console.log('isMatch' + isMatch);
    if (!isMatch)
      return res
        .status(401)
        .json({ errorMsg: 'email or password are wrong 2' });

    const alg = 'HS256';
    const sign = new TextEncoder().encode(process.env.JWT_SIGN);
    const token = await new jose.SignJWT({
      email: email,
      name: user?.first_name,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(sign);
    return res.status(200).json({ token, user: user });
  }
}
