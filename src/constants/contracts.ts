import { DEFAULT_CHAIN } from './chain';

export const contracts = {
  demo: {
    [DEFAULT_CHAIN.PROD.id]: '0x',
    [DEFAULT_CHAIN.DEV.id]: '0x21DB07cc2794E49fd64f1c39253D21b7E30901B1',
  },
} as const satisfies Record<string, Record<number, `0x${string}`>>;
