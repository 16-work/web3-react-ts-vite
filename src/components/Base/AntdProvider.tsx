import { ReactNode } from 'react';
import en from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import zhTW from 'antd/locale/zh_TW';
import { ConfigProvider } from 'antd';

interface Props {
  children: ReactNode;
}

/** Component */
export const AntdProvider = (props: Props) => {
  /** Retrieval */
  const { i18n } = useTranslation();

  /** Params */
  const locale = useMemo(() => {
    switch (i18n.language) {
      case 'zh-CN':
        return zhCN;
      case 'zh-TW':
        return zhTW;
      default:
        return en;
    }
  }, [i18n.language]);

  /** Actions */

  /** Template */
  return <ConfigProvider locale={locale}>{props.children}</ConfigProvider>;
};
