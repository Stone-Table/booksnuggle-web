import NextAuth from "next-auth";
import { authOptions } from "@/app/auth";
import { staticAuthOptions } from "@/lib/auth-static";

const handler = NextAuth(process.env.GITHUB_PAGES === 'true' ? staticAuthOptions : authOptions);

export { handler as GET, handler as POST };
