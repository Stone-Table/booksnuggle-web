'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

const staticSession: Session = {
  user: { 
    name: 'Demo User',
    email: 'demo@example.com',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const isStatic = process.env.GITHUB_PAGES === 'true';
  return (
    <SessionProvider session={isStatic ? staticSession : undefined}>
      {children}
    </SessionProvider>
  );
}