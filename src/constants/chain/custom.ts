const customMainnet = {
  id: 1,
  name: 'Custom Mainnet',
  nativeCurrency: {
    name: '',
    symbol: '',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [''] },
  },
  blockExplorers: {
    default: {
      name: '',
      url: '',
      apiUrl: '',
    },
  },
  contracts: {
    multicall3: { address: '' },
  },
};

export const customChains = { customNet: customMainnet };
