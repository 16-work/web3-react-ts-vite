import { DEFAULT_CHAIN, SUPPORT_CHAIN_IDS } from './chain';

export const contracts = {
  demo: {
    [DEFAULT_CHAIN.PROD.id]: '0x',
    [DEFAULT_CHAIN.DEV.id]: '0x',
  },
} as const satisfies Record<string, Record<(typeof SUPPORT_CHAIN_IDS)[number], `0x${string}`>>;
