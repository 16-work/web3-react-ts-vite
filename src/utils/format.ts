import moment from 'moment';
import { t } from 'i18next';
import BigNumber from 'bignumber.js';

// 数字缩写（别改顺序）
export const NUMBER_ABBRS = ['Y', 'Z', 'E', 'P', 'T', 'B', 'M', 'K'] as const;

export const format = {
  time: (time: Date | number, format: string = 'YYYY/MM/DD HH:mm:ss') => {
    return moment(time).format(format);
  },

  timeDistance: (time: number) => {
    const seconds = (new Date().getTime() - new Date(time).getTime()) / 1000;
    if (seconds <= 30) return t('common.aFewSecondsAgo');
    else if (seconds <= 60) return t('common.halfAMinuteAgo');
    else if (seconds <= 60 * 2) return t('common.aMinuteAgo');
    else if (seconds <= 60 * 60) return t('common.nMinutesAgo', { minutes: Math.floor(seconds / 60) });
    else if (seconds <= 60 * 60 * 2) return t('common.aHourAgo');
    else if (seconds <= 60 * 60 * 24) return t('common.nHoursAgo', { hours: Math.floor(seconds / 60 / 60) });
    else if (seconds <= 60 * 60 * 24 * 2) return t('common.aDayAgo');
    else if (seconds <= 60 * 60 * 24 * 31) return t('common.nDaysAgo', { days: Math.floor(seconds / 60 / 60 / 24) });
    else return moment(time).format('YYYY/MM/DD HH:mm:ss');
  },

  seconds: (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Number(BigNumber(seconds % 60).toFixed(0, 3));

    let result = '';
    if (days > 0) result += `${days}${t('common.d')} `;
    if (hours > 0) result += `${hours}${t('common.h')} `;
    if (minutes > 0) result += `${minutes}${t('common.m')} `;
    if (secs > 0 || (secs === 0 && days === 0 && hours === 0 && minutes === 0)) result += `${secs}${t('common.s')}`;

    return result;
  },

  subscript: (num: number) => {
    const subscriptMap: { [key: string]: string } = {
      '0': '\u2080',
      '1': '\u2081',
      '2': '\u2082',
      '3': '\u2083',
      '4': '\u2084',
      '5': '\u2085',
      '6': '\u2086',
      '7': '\u2087',
      '8': '\u2088',
      '9': '\u2089',
    };

    return num
      .toString()
      .split('')
      .map((digit) => subscriptMap[digit])
      .join('');
  },

  bignum: (
    value: BigNumber | string | bigint | number,
    decimals?: number,
    isAbbr: boolean = false,
    abbrOrigin: number | (typeof NUMBER_ABBRS)[number] = 'K'
  ) => {
    if (!value || value === '0') return '0';
    // 解析输入并转换为 BigNumber
    const strNumber = new BigNumber(parseFloat(BigNumber(value.toString()).toFixed(36))).toString();
    const [integralPart, decimalPart] = strNumber.split('.');

    // 缩写
    if (isAbbr) {
      const abbrs = NUMBER_ABBRS;

      // 是否达到缩写标准
      let isAbbrable = false;
      if (typeof abbrOrigin === 'number' && BigNumber(integralPart).gte(abbrOrigin)) isAbbrable = true;
      else {
        const index = abbrs.findIndex((item) => item === abbrOrigin);
        if (index !== -1 && BigNumber(integralPart).gte(10 ** (3 * (abbrs.length - index)))) isAbbrable = true;
      }

      // 开始缩写
      if (isAbbrable) {
        const dec = decimals ?? 2; // 缩写默认保留两位小数

        for (let i = 0; i < abbrs.length; i++) {
          if (BigNumber(integralPart).gte(10 ** (3 * (abbrs.length - i))))
            return `${BigNumber(integralPart)
              .div(10 ** (3 * (abbrs.length - i)))
              .toFixed(dec)} ${abbrs[i]}`;
        }
      }
    }

    const dec = decimals ?? 4; // 非缩写默认保留4位小数

    // 检查是否为负数
    const isNegative = integralPart.startsWith('-');
    const positiveIntegralPart = isNegative ? integralPart.slice(1) : integralPart;

    // 格式化整数部分(根据位数插入',')
    let digit = 0;
    const intPartArr = [];
    for (let i = positiveIntegralPart.length - 1; i >= 0; i--) {
      intPartArr.push(positiveIntegralPart[i]);
      digit++;
      if (digit % 3 === 0 && i !== 0) {
        intPartArr.push(',');
      }
    }
    let intPart = intPartArr.reverse().join('');
    if (isNegative) {
      intPart = '-' + intPart;
    }

    let decPart = '';
    let count = 0;
    if (decimalPart?.length > 0) {
      for (let i = 0; i < decimalPart?.length; i++) {
        if (decimalPart[i] === '0') {
          count++;
        } else {
          break;
        }
      }
      const sliceStr = decimalPart.slice(count, decimalPart.length);
      if (count > 3 && BigNumber(value.toString()).lt(1)) {
        let currentDecimal = sliceStr.slice(0, dec).length;
        let str = '';
        while (currentDecimal < dec) {
          str += '0';
          currentDecimal += 1;
        }
        decPart = `.0${format.subscript(count)}${sliceStr.slice(0, dec)}`;
        decPart = decPart + str;
      } else if (BigNumber(value.toString()).lt(1)) {
        let currentDecimal = decimalPart.length;

        let str = '';
        while (currentDecimal < dec) {
          str += '0';
          currentDecimal += 1;
        }
        decPart = `.${decimalPart.slice(0, dec)}${str}`;
      } else {
        decPart = `.${decimalPart.slice(0, 2)}`;
      }
    } else if (dec !== 0) {
      decPart = '.00';
    }
    return `${intPart}${decPart}`;
  },

  rate: (current: BigNumber | number | string, max: BigNumber | number | string, returnType: 'string' | 'number' = 'string', decimalPlaces: number = 2) => {
    const ratio = BigNumber(current)
      .div(max)
      .dp(decimalPlaces + 2, 1);

    // 返回百分比数字
    if (returnType === 'number') {
      return BigNumber(ratio).times(100).toNumber() as number;
    }
    // 返回百分比字符串
    else {
      if (BigNumber(current).lte(0)) return '0%';
      // <0.0...01
      if (BigNumber(ratio).lt(BigNumber(1).div(10 ** (decimalPlaces + 2)))) return `<0.${String(10 ** (decimalPlaces - 1)).substring(1)}1%`;
      else return `${ratio.times(100).toString()}%`;
    }
  },

  address: (str: string, first: number, last: number) => {
    if (str && typeof str != 'string') str = str + '';
    if (!str || str.length <= last + first) return str;

    return str.slice(0, first) + '...' + str.slice(str.length - last, str.length);
  },

  token: {
    /** 将原始值转为易读值: eg. 1500000000000000000 wei -> 1.50 ether */
    common: (
      value: BigNumber | string | bigint | number,
      options?: {
        decimals?: number; // 精度(默认18)
        bignumDecimals?: number; // 格式化后的小数位数
        isAbbr?: boolean; // 是否开启缩写
        abbrOrigin?: number | (typeof NUMBER_ABBRS)[number]; // 大于指定值后开始缩写
      }
    ) => {
      // before
      const decimals = options?.decimals ?? 18;

      // main
      const str = BigNumber(value.toString())
        .div(10 ** decimals)
        .toString();
      return format.bignum(str, options?.bignumDecimals, options?.isAbbr, options?.abbrOrigin);
    },

    /** 将币种价格转为美元价格(文档四、2.2.2附有相关公式及示例) */
    usdt: (
      tokenPrice: BigNumber | string | bigint | number,
      options?: {
        decimals?: number; // 精度(默认18)
        bignumDecimals?: number; // 格式化后的小数位数
        isAbbr?: boolean; // 是否开启缩写
        abbrOrigin?: number | (typeof NUMBER_ABBRS)[number]; // 大于指定值后开始缩写
      }
    ) => {
      // before
      const decimals = options?.decimals ?? 18;
      const usdtUnitPrice = localCache.get('usdtUnitPrice', '0'); // 注意：示例currencyUsdtUnitPrice的单位是(usdt/currency)。如果currencyUsdtUnitPrice的单位有变化，可自行修改decimal默认值

      const value = BigNumber(tokenPrice.toString())
        .div(10 ** decimals)
        .times(usdtUnitPrice);

      // main
      if (value.eq(0)) return `$0`;
      else if (options?.abbrOrigin && value.lt(0.0001)) return `<$0.0001`; // 开始缩写才显示此情况
      return `$${format.bignum(value, options?.bignumDecimals, options?.isAbbr, options?.abbrOrigin)}`;
    },
  },
};
