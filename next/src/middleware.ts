import { MiddlewareConfig, NextMiddleware, NextResponse } from 'next/server';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { ROUTES } from './shared/lib/constants';
import { IUser } from './shared/api/users/types';
import profileService from './shared/api/profile/profileService';

export const middleware: NextMiddleware = async (request) => {
  /**
   * NOTE
   *
   * This check allows you to avoid repeated work by the middleware.
   * if (request.headers.has('referer')) return;
   * But it had to be disabled, since server requests on pages in Next.js
   * are not able to change headers, which may contain new pairs of tokens.
   * For this reason, you have to make a request below every time you visit a new page.
   */

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  let updatedCookies: ResponseCookie[] | null | undefined = null;
  let profile: IUser | null = null;
  let response = NextResponse.next();
  const isAuthRoute =
    request.nextUrl.pathname === ROUTES.ui.signIn ||
    request.nextUrl.pathname === ROUTES.ui.signUp ||
    request.nextUrl.pathname === ROUTES.ui.forget;

  if (accessToken || refreshToken) {
    const { data, newCookies } = await profileService.getProfile();
    updatedCookies = newCookies;
    profile = data;
  }

  if (profile) {
    if (isAuthRoute) {
      const searchParams = new URLSearchParams(request.nextUrl.search);

      response = NextResponse.redirect(
        new URL(
          decodeURIComponent(searchParams.get('return') || ROUTES.ui.home),
          request.url
        ),
        { status: 302 }
      );
    }
  } else {
    if (!isAuthRoute && !request.headers.has('referer')) {
      response = NextResponse.redirect(
        new URL(
          `${ROUTES.ui.signIn}?return=${encodeURIComponent(
            request.nextUrl.pathname
          )}`,
          request.url
        ),
        302
      );
    }
  }

  if (updatedCookies) {
    for (const cookie of updatedCookies) {
      response.cookies.set(cookie);
    }
  }

  if (profile) {
    response.headers.set('store-profile', JSON.stringify(profile));
  }

  return response;
};

export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
