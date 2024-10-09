import { ChainId } from './chains';

export const contracts = {
  demo: {
    [ChainId.BASE]: '0x',
    [ChainId.BASE_SEPOLIA]: '0x21DB07cc2794E49fd64f1c39253D21b7E30901B1',
  },
} as const satisfies Record<string, Record<number, `0x${string}`>>;
