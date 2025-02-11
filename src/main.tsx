import ReactDOM from 'react-dom/client';
import '@/assets/theme/index';
import '@/assets/css/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './router/index.ts';
import 'virtual:svg-icons-register';
import '@/constants/i18n';
import { initI18n } from '@/constants/i18n';

const App = () => {
  /** template */
  return (
    <Providers>
      <div className="h-full">
        <RouterProvider router={browserRouter} />
        <ToastContainer />
      </div>
    </Providers>
  );
};

// i18n初始化完成后再渲染
initI18n().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
      <App />
    </>
  );
});
