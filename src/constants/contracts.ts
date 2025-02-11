import { DEFAULT_CHAIN, SUPPORT_CHAINS } from './chain';

export const contracts = {
  demo: {
    [DEFAULT_CHAIN.PROD.id]: '0x',
    [DEFAULT_CHAIN.DEV.id]: '0x',
  },
} as const satisfies Record<string, Record<(typeof SUPPORT_CHAINS)[number], `0x${string}`>>;
