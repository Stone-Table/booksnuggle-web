import NextAuth from "next-auth";
import { getAuthConfig } from "@/app/auth/config";

export const dynamic = 'force-static';

const handler = NextAuth(getAuthConfig());

export { handler as GET, handler as POST };

export function generateStaticParams() {
  return [
    { nextauth: ['session'] },
    { nextauth: ['signin'] },
    { nextauth: ['signout'] },
  ];
}
