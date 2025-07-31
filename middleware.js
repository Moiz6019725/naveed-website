import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 🟩 CASE 1: No token
  if (!token) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Redirect to login for other protected routes
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 🟩 CASE 2: Token exists, validate it
  try {
    await jwtVerify(token, secret);

    // Prevent logged-in users from seeing login page again
    if (pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error('JWT verification failed', err);

    // Token invalid → redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

// ✅ Include ALL /admin routes INCLUDING /admin/login
export const config = {
  matcher: ['/admin/:path*'],
};
