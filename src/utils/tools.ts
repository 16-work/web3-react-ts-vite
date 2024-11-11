import { chains, DEFAULT_CHAIN_CURRENT } from '@/constants/chain';
import { WAGMI_CONFIG } from '@/constants/wagmi';
import { SCREEN, screenMinSize } from '@config/constants/screen';
import BigNumber from 'bignumber.js';
import copy from 'copy-to-clipboard';
import { t } from 'i18next';
import { Options } from 'react-copy-to-clipboard';
import { getBytecode } from 'wagmi/actions';

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

  // 判断地址类型
  getAddressType: async (hash: string) => {
    try {
      const res = await getBytecode(WAGMI_CONFIG, { address: hash as `0x${string}` });
      if (res) return 'contract';
      else return 'account';
    } catch (error) {
      return 'error';
    }
  },

  // 通过id获取chain
  getChainById: (chainId: number) => {
    return Object.values(chains).find((chain) => chain.id === chainId);
  },

  // 获取scan
  getScan: (chainId: number = DEFAULT_CHAIN_CURRENT.id) => {
    const chain = tools.getChainById(chainId);
    return `${chain?.['blockExplorers']?.['default']['url']}`;
  },

  // 跳转到scan
  gotoScan: (hash: string, chainId: number = DEFAULT_CHAIN_CURRENT.id) => {
    const chain = tools.getChainById(chainId);
    if (chain) {
      window.open(`${chain?.['blockExplorers']?.['default']['url']}/tx/${hash}`);
    }
  },
};
