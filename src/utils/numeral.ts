import numeral from 'numeral';

numeral.register('locale', 'es', {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'K',
    million: 'M',
    billion: 'B',
    trillion: 'T',
  },
  ordinal: function (num: number) {
    const b = num % 10;
    return b === 1 || b === 3 ? 'er' : b === 2 ? 'do' : b === 7 || b === 0 ? 'mo' : b === 8 ? 'vo' : b === 9 ? 'no' : 'to';
  },
  currency: {
    symbol: '$',
  },
});
numeral.locale('es');

export default numeral;
