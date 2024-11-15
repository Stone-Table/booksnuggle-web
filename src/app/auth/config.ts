import type { NextAuthOptions } from 'next-auth';
import { authOptions } from './options';
import { staticAuthConfig } from './static-auth';

export const getAuthConfig = (): NextAuthOptions => {
  return process.env.GITHUB_PAGES === 'true' ? staticAuthConfig : authOptions;
}; 