import NextAuth from "next-auth";
import { getAuthConfig } from "@/app/auth/config";
import { getBaseUrl } from "@/lib/utils";

const handler = NextAuth(getAuthConfig());

export { handler as GET, handler as POST };

export function generateStaticParams() {
  return [
    { nextauth: ['session'] },
    { nextauth: ['signin'] },
    { nextauth: ['signout'] },
  ];
}
