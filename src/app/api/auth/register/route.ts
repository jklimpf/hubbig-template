import prisma from "@/src/lib/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email, password, name } = body;

  if (!email || !password || !name) {
    return Response.json({ message: "Invalid email or password" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: "Internal server error" });
  }
}
