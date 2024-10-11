// 默认主题
export const DEFAULT_THEME = getComputedStyle(document.documentElement).getPropertyValue('--default-theme').trim();

// 页脚链接
export const FOOTER_LINKS: Record<string, Record<string, string>> = {
  X: {
    en: '',
    'zh-TW': '',
  },
  DISCORD: {
    en: '',
    'zh-TW': '',
  },
  TELEGRAM: {
    en: '',
    'zh-TW': '',
  },
  GITHUB: {
    en: '',
    'zh-TW': '',
  },
  GITBOOK: {
    en: '',
    'zh-TW': '',
  },
};
