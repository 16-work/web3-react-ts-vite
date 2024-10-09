import viteCompression from 'vite-plugin-compression';

export const setCompression = () => {
  return viteCompression({
    threshold: 102400,
  });
};
