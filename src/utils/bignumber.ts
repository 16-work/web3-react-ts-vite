import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: [-20000, 10000000] });

export default BigNumber;
