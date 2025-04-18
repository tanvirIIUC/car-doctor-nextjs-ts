// import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//     secureCookie: process.env.NODE_ENV === 'production',
//   });
// const token = req.cookies.get("next-auth.session-token")?.value;
const token =
req.cookies.get("next-auth.session-token")?.value || 
req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/myBooking', '/myBooking/:path*', '/checkout/:path*'],
};
