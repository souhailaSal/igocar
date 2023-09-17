import { NextResponse } from 'next/server'
import { validateJWT } from './helpers/helpers';

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const publicRoute = ["/login", "/register", "/cars", "/"]
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoute.includes(pathname);
  if (isPublicRoute)
    return NextResponse.next()
  else {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.redirect(new URL("/login", request.url));
    else {
      const isValidToken = await validateJWT(token)
      console.log('isValidToken', isValidToken);
      if (isValidToken._id == null) {
        request.cookies.delete("token")
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }
}
export const config = {
  matcher: [
    '/((?!api|_next/*|/images|favicon.ico).*)',
  ],
}