import { compression } from 'vite-plugin-compression2';

export const setCompression = () => {
  return compression({
    threshold: 102400,
  });
};
