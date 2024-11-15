// This is a simplified auth configuration for static builds
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const staticAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === "admin" && credentials?.password === "admin") {
          return {
            id: "1",
            name: "Guest Admin",
            email: "guest@example.com"
          }
        }
        return null
      }
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
};