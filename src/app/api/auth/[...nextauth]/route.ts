import NextAuth from "next-auth";
import { getAuthConfig } from "@/app/auth/config";
import { getBaseUrl } from "@/lib/utils";

export const dynamic = 'force-static';

const handler = NextAuth({
  ...getAuthConfig(),
  ...(process.env.GITHUB_PAGES === 'true' ? {
    baseUrl: getBaseUrl(),
  } : {})
});

export { handler as GET, handler as POST };

export function generateStaticParams() {
  return [
    { nextauth: ['session'] },
    { nextauth: ['signin'] },
    { nextauth: ['signout'] },
  ];
}
