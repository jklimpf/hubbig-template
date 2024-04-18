import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { JWT, decode } from "next-auth/jwt";
import prisma from "@/src/lib/prisma";
import { getAuthenticatedUser } from "@/src/lib/getAuthenticatedUser";

export interface ExtendedJWT extends JWT {
  exp: number;
  iat: number;
  jti: string;
}

export async function GET(req: NextRequest) {
  try {
    const { error, user: authenticatedUser } = await getAuthenticatedUser();

    if (error || !authenticatedUser) {
      if (error) {
        return Response.json({ message: error });
      }
      return Response.json({ message: "Unauthorized" });
    }

    const users = await prisma.user.findMany();

    return Response.json({ users });
  } catch (error) {
    return Response.json({ message: "Internal server error" });
  }
}
