export const parseLocaleToken = {
  base: (str: string | number, decimals: string = '00') => {
    if (str === '0' || str === 0) return '0';
    return new BigNumber(str).isGreaterThanOrEqualTo(1)
      ? numeral(str).format(`0,0.${decimals}`)
      : new BigNumber(str).isLessThan(0.0001) && new BigNumber(str).gt(0)
      ? '<0.0001'
      : new BigNumber(str || '0').toFixed(4, 1);
  },

  andSubscript: (str: string | number) => {
    if (str === '0' || str === 0) return '0';
    return new BigNumber(str).isGreaterThanOrEqualTo(1) ? numeral(str).format(`0,0.00 a`) : format.bignum(str);
  },

  byK: (str: string | number, needDollar = true, decimals: string = '00') => {
    if (str === '0' || str === 0) return '$0';
    return new BigNumber(str).isGreaterThanOrEqualTo(1)
      ? numeral(str).format(`${needDollar ? '$' : ''}0,0.${decimals} a`)
      : new BigNumber(str).isLessThan(0.0001) && new BigNumber(str).isGreaterThan(0)
      ? '<$0.0001'
      : `${needDollar ? '$' : ''}${new BigNumber(str || '0').toFixed(4, 1)}`;
  },

  price: (str: string | number, decimals: string = '00') => {
    if (str === '0' || str === 0) return '$0';

    return new BigNumber(str).isGreaterThanOrEqualTo(1)
      ? numeral(str).format(`$0,0.${decimals}`)
      : new BigNumber(str).isLessThan(0.0001) && new BigNumber(str).isGreaterThan(0)
      ? '<$0.0001'
      : `$${new BigNumber(str || '0').toFixed(4, 1)}`;
  },
};
