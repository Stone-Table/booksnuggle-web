export const staticPages = [
  '/',
  '/login',
  '/mybooks',
  '/404',
];

export const generateStaticParams = () => {
  return staticPages.map(page => ({
    slug: page.replace('/', ''),
  }));
}; 