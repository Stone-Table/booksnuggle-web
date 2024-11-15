import { getBasePath } from './utils';

export const createStaticUrl = (path: string) => {
  const basePath = getBasePath();
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}; 