export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  if (process.env.NETLIFY === 'true') {
    return 'https://booksnuggle.netlify.app';
  }
  
  return process.env.NEXTAUTH_URL || 'http://localhost:3001';
};

export const getBasePath = () => {
  return process.env.GITHUB_PAGES === 'true' ? '/booksnuggle-web' : '';
}; 