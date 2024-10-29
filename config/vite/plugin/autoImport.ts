import AutoImport from 'unplugin-auto-import/vite';

export const setAutoImport = () => {
  return [
    AutoImport({
      imports: [
        // 内置api
        'react',
        'react-router-dom',

        // 自定义api
        {
          '@/api': ['api'],
          '@/store': ['store'],
          '@/utils/env': ['env'],
          '@/api/axios': ['http'],
          '@/router/path': ['path'],
          'use-immer': ['useImmer'],
          '@/utils/tools': ['tools'],
          '@/utils/events': ['events'],
          '@/utils/format': ['format'],
          '@/constants/events': ['EVENTS'],
          '@/hooks/useForm.ts': ['useForm'],
          'react-i18next': ['useTranslation'],
          '@/utils/localCache': ['localCache'],
          '@/utils/ahooks/index.ts': ['ahooks'],
          '@/utils/yup.ts': [['default', 'yup']],
          '@/utils/notification': ['toast', 'msg'],
          '@config/constants/screen.ts': ['SCREEN'],
          '@/hooks/init/useRouterFun.ts': ['router'],
          '@/hooks/init/useGlobalHooks.ts': ['hooks'],
          '@/utils/numeral.ts': [['default', 'numeral']],
          '@/utils/parseLocaleToken': ['parseLocaleToken'],
          '@/constants/chain/index.ts': ['CURRENCY_SYMBOL'],
          '@/utils/bignumber.ts': [['default', 'BigNumber']],
        },
      ],

      // 需要自动引入的自定义组件位置(只自动引入公共组件)
      dirs: ['src/components/**/**.tsx'],

      // 声明文件位置
      dts: 'config/declare/auto-import.d.ts',
    }),
  ];
};
