/* 支持的语言 */
export const supportLanguages = {
  en: 'English',
  'zh-CN': '简体中文',
  // 'zh-TW': '繁体中文',
};

export const languageConfig = {
  /* 初始语言 */
  initLanguage: 'en',

  /* 默认语言: 必定支持的语言 */
  defaultLanguage: 'en',

  /** 默认语言方案
   * 方案1：默认为指定语言
   * 方案2: 默认跟随浏览器语言（支持语言自动转换）
   */
  plan: 1,

  /* 需要转换的语言 */
  convertLanguageMap: {
    // 'zh-CN': 'zh-TW', // 部分项目会要求将简中转为繁中
  } as Record<string, string>,
};

// 初始化默认语言
export const initDefaultLanguage = () => {
  let language = '';

  switch (languageConfig.plan) {
    case 2:
      // 仅在浏览器环境中访问 navigator
      if (typeof window !== 'undefined') {
        language = localCache.get('language', navigator.language);
      } else {
        language = localCache.get('language', languageConfig.initLanguage);
      }
      break;
    default:
      language = localCache.get('language', languageConfig.initLanguage);
  }

  return filterLanguage(language);
};

// 过滤掉需转换和不支持的语言
export const filterLanguage = (language: string) => {
  return languageConfig.convertLanguageMap[language]
    ? languageConfig.convertLanguageMap[language]
    : Object.keys(supportLanguages).includes(language)
      ? language
      : languageConfig.initLanguage;
};

export const LANGUAGE = initDefaultLanguage();
