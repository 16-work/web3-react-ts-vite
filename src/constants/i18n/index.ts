import i18n from 'i18next';
import { LANGUAGE } from './config.ts';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import extension_en from './language/en.ts';
// import extension_cn from './excel/zh-CN.ts';
import extension_tw from './language/zh-TW.ts';

const resources = {
  en: {
    translation: { ...extension_en },
  },
  zh: {
    translation: {
      // ...extension_cn,
      ...extension_tw,
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: LANGUAGE,
    interpolation: {
      prefix: '{',
      suffix: '}',
      escapeValue: false,
    },
  });

export default i18n;
