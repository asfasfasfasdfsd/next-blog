import { PrismaClient } from '@prisma/client';
import { equal } from 'assert';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const errors: string[] = [];
    const { first_name, last_name, city, phone, email, password } = req.body;

    const validationSchema = [
      {
        valid: validator.isLength(first_name, {
          min: 1,
          max: 10,
        }),
        errorMessage: 'First Name is invalid too short or too long',
      },
      {
        valid: validator.isLength(last_name, {
          min: 1,
          max: 10,
        }),
        errorMessage: 'Last Name is invalid too short or too long',
      },
      {
        valid: validator.isEmail(email),
        errorMessage: 'email is invalid',
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: 'phone number is invalid',
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: 'city is invalid',
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: 'weak password.',
      },
    ];

    validationSchema.forEach((ele) => {
      if (!ele.valid) errors.push(ele.errorMessage);
    });
    if (errors.length !== 0) {
      return res.status(400).json({ errorMessage: errors[0] });
    }
    const userEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userEmail)
      res.status(400).json({ errorMessage: 'user already existes' });
    ///end of validation
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        city,
        password: hashedPassword,
        email,
        phone,
      },
    });

    const alg = 'HS256';
    const sign = new TextEncoder().encode(process.env.JWT_SIGN);
    const token = await new jose.SignJWT({
      email: 'brahimbazi@gmail.com',
      id: 23,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('24h')
      .sign(sign);
    res.status(200).json({ token });
  }
}
