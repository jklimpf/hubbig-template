import { nextAuthOptions } from "@/src/lib/auth/nextAuthOptions";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as POST, handler as GET };
