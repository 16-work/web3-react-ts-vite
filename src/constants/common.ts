// 默认主题
export const DEFAULT_THEME = 'theme-light-blue';

/* 语言类型 */
export const languageType = ['en', 'zh-TW', 'zh-CN'];
// 默认跟随浏览器语言
export const LANGUAGE = languageType.includes(localCache.get('language', navigator.language))
  ? localCache.get('language', navigator.language) === 'zh-CN'
    ? 'zh-TW'
    : localCache.get('language', navigator.language)
  : 'en';
// 默认英文
// export const LANGUAGE = localCache.get('language', 'en');

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
