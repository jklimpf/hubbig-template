import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { JWT, decode } from "next-auth/jwt";
import prisma from "@/src/lib/prisma";

interface ExtendedJWT extends JWT {
  exp: number;
  iat: number;
  jti: string;
}

export async function getAuthenticatedUser() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken) {
    return { error: "Unauthorized" };
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return { error: "Internal server error" };
  }

  const decodedToken = (await decode({
    secret: jwtSecret,
    token: sessionToken,
  })) as ExtendedJWT | null;

  if (!decodedToken || !decodedToken?.user) {
    return { error: "Unauthorized" };
  }

  const isExpired = Date.now() >= decodedToken?.exp * 1000;

  if (isExpired) {
    return { error: "Token expired" };
  }

  const user = decodedToken.user;

  if (!user || !user.email) {
    return { error: "Unauthorized" };
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!dbUser) {
    return { error: "User not found" };
  }

  return { user: dbUser };
}
