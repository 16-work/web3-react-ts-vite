import axios from 'axios';
import { t } from 'i18next';

export const http = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 10000,
});

let isShowVerifyTip = false;

/* 请求拦截 */
http.interceptors.request.use(
  (config) => {
    const address = localCache.get('address');
    const tokens = localCache.get('tokens', {});
    config.headers.Accept = 'application/json';
    config.headers.Authorization = `Bearer ${tokens[address?.toLowerCase() || '']}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* 响应拦截 */
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && res.status !== 200 && res.code !== 200) {
      throw new Error(res.message);
    }
    return res.data;
  },
  (error) => {
    const { response } = error;
    if (!response || !response.status || !response.data) {
      const toastId = 'networkError';
      const isActive = msg.isActive?.(toastId);
      isActive
        ? msg.update?.('networkError', {
            type: 'error',
            render: t('tip.networkError'),
          })
        : msg.error?.(t('tip.networkError'), { toastId });
      return Promise.reject(new Error(t('tip.networkError')));
    }
    const { status, message } = response.data;

    let errMsg = error.message;
    switch (status) {
      // 请求失败
      case 400:
        errMsg = message;
        break;
      // 认证失败
      case 401:
        const address = localCache.get('address');
        const tokens = localCache.get('tokens', {});
        tokens[address] = '';
        localCache.set('tokens', tokens);

        errMsg = message;
        if (!isShowVerifyTip) {
          isShowVerifyTip = true;
          toast.error?.(<VerifyTip />, {
            autoClose: false,
            onClose: () => {
              isShowVerifyTip = false;
            },
          });
        }

        break;
      // 请求地址错误
      case 404:
        errMsg = t('tip.requestUrl404');
        break;
      // 过多请求
      case 429:
        errMsg = t('tip.tooManyRequests');
        break;
      // 其它错误
      default:
        errMsg = message ?? t('tip.serverError');
        break;
    }

    if (status !== 401) msg.error?.(errMsg);
    return Promise.reject(new Error(errMsg));
  }
);
