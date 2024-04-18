import { NextRequest } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email, password } = body;
  if (!email || !password) {
    return Response.json({ message: "Invalid email or password" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return Response.json({ message: "User not found" });
    }

    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: "Internal server error" });
  }
}
