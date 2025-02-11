import i18n from 'i18next';
import { LANGUAGE, supportLanguages } from './config.ts';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 定义一个空对象来存储导入的模块
const resources: { [key: string]: any } = {};
Object.keys(supportLanguages).map((key) => {
  resources[key] = { translation: {} };
});

// 动态导入 ./language 目录下的所有 .ts 文件
const modules = import.meta.glob('./language/*.ts');
export const initI18n = async () => {
  for (const modulePath in modules) {
    const fileNameWithoutExtension = modulePath.split('/').pop()!.replace('.ts', '');
    const module: any = await modules[modulePath]();
    resources[fileNameWithoutExtension] = {
      translation: { ...module.default },
    };
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources, // 模块加载完成后使用资源
    lng: LANGUAGE,
    interpolation: {
      prefix: '{',
      suffix: '}',
      escapeValue: false,
    },
  });

export default i18n;
