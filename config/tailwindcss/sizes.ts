import { SCREEN, screenMinSize } from '../../config/constants/screen';

// 通用尺寸
const getSizes = () => {
  const rootSize = 16; // 根元素大小
  const maxPixel = 2000; // 注册尺寸的范围(1~max)

  let sizes = {} as Record<string, string>;
  for (let i = 1; i < maxPixel; i++) {
    sizes[i] = `${i / rootSize}rem`;
  }
  return sizes;
};
export const commonSizes = getSizes();

// 屏幕尺寸
export const screenSizes = Object.entries(SCREEN).reduce(
  (acc, [key, value]) => {
    if (typeof value === 'number') {
      acc[key.toLowerCase()] = `${screenMinSize[value] + 1}px`;
    }
    return acc;
  },
  {} as Record<string, string>
);
