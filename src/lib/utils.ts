export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  if (process.env.GITHUB_PAGES === 'true') {
    return 'https://stone-table.github.io/booksnuggle-web';
  }
  
  return process.env.NEXTAUTH_URL || 'http://localhost:3000';
};

export const getBasePath = () => {
  return process.env.GITHUB_PAGES === 'true' ? '/booksnuggle-web' : '';
}; 