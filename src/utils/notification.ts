import { DEFAULT_THEME } from '@/constants/common';
import { toast as notification, ToastContent, ToastOptions, ToastPosition } from 'react-toastify';

const defaultConfig: ToastOptions = {
  theme: DEFAULT_THEME.search('light') ? 'light' : 'dark',
  autoClose: 2000,
};

// 通用通知函数
const createNotifier = (position: ToastPosition) => {
  const notify = (type: 'success' | 'error' | 'info' | 'warning') => (message: ToastContent, config?: ToastOptions) =>
    notification[type](message, {
      ...defaultConfig,
      position,
      ...config,
    });

  return {
    ...notification,
    success: notify('success'),
    error: notify('error'),
    info: notify('info'),
    warning: notify('warning'),
  };
};

/** 可操作通知(显示于右上角) */
export const toast = createNotifier('top-right');

/** 普通通知(显示于正上方) */
export const msg = createNotifier('top-center');
