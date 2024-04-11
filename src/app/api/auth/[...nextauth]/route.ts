import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import { decode, encode } from "next-auth/jwt";
import bcrypt from "bcrypt";

export const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userCredentials = {
          email: credentials?.email,
          password: credentials?.password,
        };

        console.log(userCredentials);
        if (!userCredentials.email || !userCredentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: userCredentials.email,
          },
        });

        if (!user) {
          return null;
        } else {
          const isPasswordValid = await bcrypt.compare(
            userCredentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return user;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
    async encode({ secret, token }) {
      const encoded = await encode({ secret, token });
      return encoded;
    },
    async decode({ secret, token }) {
      const decoded = await decode({ secret, token });
      return decoded;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as POST, handler as GET };
