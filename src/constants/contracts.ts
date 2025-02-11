export const contracts = {
  demo: {
    dev: '0x',
    prod: '0x',
  },
} as const satisfies Record<string, Record<Exclude<typeof env.VITE_ENV, 'mock' | 'test'>, `0x${string}`>>;
