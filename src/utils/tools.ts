import { SCAN } from '@/constants/chain';
import { SCREEN, screenMinSize } from '@config/constants/screen';
import BigNumber from 'bignumber.js';
import copy from 'copy-to-clipboard';
import { t } from 'i18next';
import { Options } from 'react-copy-to-clipboard';

export const tools = {
  copy: (text: string, options?: Options | undefined) => {
    copy(text, options);
    msg.success(t('tip.copySuccessful'), { autoClose: 500 });
  },

  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  logTimeOverhead: (func: Function) => {
    console.time('Time overhead:');
    func();
    console.timeEnd('Time overhead:');
  },

  pxToRem: (px: number) => {
    return `${px / 16}rem`;
  },

  getScreenType: () => {
    const width = window.innerWidth;
    const screenTypes: SCREEN[] = Object.keys(screenMinSize).map(Number);

    // 从最大类型开始循环，找出第一个匹配的类型
    for (const type of screenTypes.reverse()) {
      // @ts-ignore
      if (width >= screenMinSize[type]) return type;
    }

    // 都不匹配则返回最小屏幕类型
    return SCREEN.XS;
  },

  // 获取当前状态
  getActiveStatus: (start: number, end: number) => {
    if (!start || !end) return 'Ended';

    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const nowTime = Date.now();

    if (endTime <= nowTime) return 'Ended';
    else if (startTime > nowTime) return 'Upcoming';
    else return 'Live';
  },

  // 表格排序比较
  compare: (field: string, sort: string) => {
    return (m: any, n: any) => {
      if (sort === 'asc') return m[field] - n[field];
      else return n[field] - m[field];
    };
  },

  // 获取变化率颜色、文本
  getRadioInfo: (radio: string | number | BigNumber) => {
    const value = BigNumber(radio);

    if (value.lt(0))
      return {
        color: 'text-stress-1',
        text: `${BigNumber(radio || 0).toFixed(2, 1)}%`,
      };
    else if (value.gt(0))
      return {
        color: 'text-relax-1',
        text: `+${BigNumber(radio || 0).toFixed(2, 1)}%`,
      };
    else
      return {
        color: 'text-tip-1',
        text: `${BigNumber(radio || 0).toFixed(2, 1)}%`,
      };
  },

  getAutoHeightClassName: (className: string) => {
    const regex = /\b(?:[\w-]+:)*?(h-(\d+|auto|full|screen)|aspect-\S+)\b/;
    if (regex.test(className ?? '')) return className;
    else return className + ' aspect-square';
  },

  // 安全除法
  safeDiv: (a: string | number, b: string | number): BigNumber => {
    if (new BigNumber(b).isEqualTo(0) || b === '0' || !b) {
      return new BigNumber(0);
    }
    return new BigNumber(a).div(b);
  },

  // 获取用户的时区
  getUserTimeZone: () => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timeZone;
    } catch (e) {
      console.error('无法获取用户的时区信息', e);
      return null;
    }
  },

  isAndroidNonChrome: (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
  },

  // 滚动到指定元素顶端
  scrollToTop: (selector: string = 'document', behavior: ScrollBehavior = 'smooth') => {
    // 默认滚动到页面最上方
    if (selector === 'document') {
      const scrollBox = document.querySelector('.scroll-box>div');
      scrollBox?.scrollTo({ top: 0, behavior });
    }
    // 滚动到指定元素的顶端
    else {
      const e = document.querySelector(selector);
      e?.scrollIntoView({ block: 'start', behavior });
    }
  },

  // 跳转到scan
  gotoScan: (hash: string) => {
    window.open(`${SCAN}/tx/${hash}`);
  },
};
