import ReactDOM from 'react-dom/client';
import '@/assets/theme/index.css';
import '@/assets/css/base.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './router/index.ts';
import 'virtual:svg-icons-register';
import '@/constants/i18n';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import en from 'antd/locale/en_US';

const App = () => {
  /** retrieval */
  const { i18n } = useTranslation();

  /** template */
  return (
    <WalletProvider>
      <ConfigProvider locale={i18n.language === 'en' ? en : zhCN}>
        <div className="h-full">
          <RouterProvider router={browserRouter} />
          <ToastContainer />
        </div>
      </ConfigProvider>
    </WalletProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>
);
