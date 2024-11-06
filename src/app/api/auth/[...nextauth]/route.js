import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials.username === "admin" && credentials.password === "admin") {
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
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, account }) {
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to /mybooks after sign in
      return '/mybooks';
    },
  },
  debug: true,  // Keep debug mode on for detailed logging
};

// export const { GET, POST } = NextAuth(authOptions);
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };