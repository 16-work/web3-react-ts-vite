/* 支持的语言 */
export const languageType = ['zh-CN', 'zh-TW', 'en'];

/* 可选的语言 */
export const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh-TW' },
];

/* 需要转换的语言 */
export const convertLanguageMap: Record<string, string> = {
  'zh-CN': 'zh-TW', // 部分项目会要求将简中转为繁中
};

/* 默认语言方案 */
const plan: number = 2;

/* 系统语言不在支持列表内时，默认显示的语言 */
const finishLanguage = 'en';

// 获取默认语言方案
const getDefaultLanguage = (): string => {
  switch (plan) {
    /* 方案1：默认指定语言 */
    case 1:
      return localCache.get('language', finishLanguage);
    /* 方案2: 默认跟随浏览器语言（支持语言自动转换） */
    case 2:
      const systemLanguage = localCache.get('language', navigator.language); // 系统语言
      return languageType.includes(systemLanguage)
        ? convertLanguageMap[systemLanguage]
          ? convertLanguageMap[systemLanguage]
          : localCache.get('language', navigator.language)
        : finishLanguage;
    default:
      return finishLanguage;
  }
};
export const LANGUAGE = getDefaultLanguage();
