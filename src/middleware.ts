import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n";
import { decode } from "next-auth/jwt";

const publicPages = ["/login", "/register"];

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale,
  localePrefix: "never",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },

  {
    callbacks: {
      authorized: async ({ req }) => {
        const sessionToken = req.cookies.get("next-auth.session-token")?.value;

        const jwtSecret = process.env.JWT_SECRET;

        const decodedToken =
          jwtSecret && sessionToken
            ? await decode({ secret: jwtSecret, token: sessionToken })
            : null;

        console.log(decodedToken);

        return !!decodedToken?.user;
      },
    },
    pages: {
      signIn: "/login",
      signOut: "/",
      error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
