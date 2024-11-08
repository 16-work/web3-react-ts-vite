import moment from 'moment';
import { t } from 'i18next';
import BigNumber from 'bignumber.js';

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

  bignum: (number: number | string, decimals: number = 4) => {
    if (!number || number === '0') return '0';
    // 解析输入并转换为 BigNumber
    const strNumber = new BigNumber(parseFloat(new BigNumber(number).toFixed(36))).toString();
    const [integralPart, decimalPart] = strNumber.split('.');

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
      if (count > 3 && Number(number) < 1) {
        let currentDecimal = sliceStr.slice(0, decimals || 4).length;
        let str = '';
        while (currentDecimal < decimals) {
          str += '0';
          currentDecimal += 1;
        }
        decPart = `.0${format.subscript(count)}${sliceStr.slice(0, decimals || 4)}`;
        decPart = decPart + str;
      } else if (Number(number) < 1) {
        let currentDecimal = decimalPart.length;

        let str = '';
        while (currentDecimal < decimals) {
          str += '0';
          currentDecimal += 1;
        }
        decPart = `.${decimalPart.slice(0, decimals)}${str}`;
      } else {
        decPart = `.${decimalPart.slice(0, 2)}`;
      }
    } else if (decimals !== 0) {
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
    common: (value: string | bigint, decimal: number = 18, bignumDecimal: number = 4) => {
      const str = new BigNumber(value ? value.toString() : 0).div(10 ** decimal).toString();
      return format.bignum(str, bignumDecimal);
    },

    /** 将原始值转为美元价格 */
    usdt: (usdtUnitPrice: string, value: bigint | string, decimal: number = 18) => {
      const usdtValue = BigNumber(String(value))
        .times(usdtUnitPrice)
        .div(10 ** 12)
        .integerValue()
        .toString();
      const final = new BigNumber(usdtValue ? usdtValue.toString() : 0).div(10 ** decimal).toString();
      return format.bignum(final, 4);
    },
  },
};
