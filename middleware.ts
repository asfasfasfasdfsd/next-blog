import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
export async function middleware(req: NextRequest, res: NextResponse) {
  console.log('this is Middleware');
  const bearer = req.headers.get('authorization');
  if (!bearer)
    return new NextResponse(
      JSON.stringify({ errorMessage: 'bearer Token not found' }),
      { status: 401 }
    );
  const sign = new TextEncoder().encode(process.env.JWT_SIGN);
  const token = bearer?.split(' ')[1] as string;
  if (!token)
    return new NextResponse(
      JSON.stringify({ errorMessage: 'Token not found' }),
      {
        status: 401,
      }
    );
  try {
    await jose.jwtVerify(token, sign);
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: e }), { status: 401 });
  }

  console.log('all good');
}

export const config = {
  matcher: ['/api/auth/response'],
};
