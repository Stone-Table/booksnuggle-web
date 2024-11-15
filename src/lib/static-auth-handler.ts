import type { Session } from 'next-auth';

export const staticSession: Session = {
  user: {
    name: 'Demo User',
    email: 'demo@example.com',
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
};

export const handleStaticAuth = () => {
  return {
    signIn: async () => ({ url: '/mybooks' }),
    signOut: async () => ({ url: '/' }),
    getSession: async () => staticSession,
  };
}; 