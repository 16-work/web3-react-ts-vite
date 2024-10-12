import * as wagmiChains from 'wagmi/chains';

export const chains = wagmiChains;

// 支持的链
export const SUPPORT_CHAINS = env.VITE_ENV === 'production' ? [chains.base] : [chains.baseSepolia];

// 默认链Id
export const DEFAULT_CHAIN_ID = env.VITE_ENV === 'production' ? chains.base.id : chains.baseSepolia.id;

// 链图标
export const CHAINS_ICON: Record<number, string> = {
  [chains.base.id]: 'chain-base',
  [chains.baseSepolia.id]: 'chain-base',
};
