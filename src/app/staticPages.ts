export const staticPages = [
  '/',
  '/login',
  '/mybooks',
  '/doubleplay',
  '/playbook',
  '/404',
  '/api/auth/session',
  '/api/auth/signin',
  '/api/auth/signout',
];

export const dynamicParams = false; 

export function generateStaticParams() {
  return staticPages.map(page => ({
    slug: page.replace('/', '')
  }));
} 