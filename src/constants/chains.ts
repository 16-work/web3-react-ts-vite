import { Chain, baseSepolia } from 'wagmi/chains';
import * as WagmiChains from 'wagmi/chains';

export enum ChainId {
  ETHEREUM = 1,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  ZKSYNC_TESTNET = 280,
  ZKSYNC = 324,
  OPBNB_TESTNET = 5611,
  OPBNB = 204,
  POLYGON_ZKEVM = 1101,
  POLYGON_ZKEVM_TESTNET = 1442,
  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,
  ARBITRUM_SEPOLIA = 421614,
  SCROLL_SEPOLIA = 534351,
  LINEA = 59144,
  LINEA_TESTNET = 59140,
  BASE = 8453,
  BASE_TESTNET = 84531,
  BASE_SEPOLIA = 84532,
  SEPOLIA = 11155111,
}

export const CHAINS: [Chain, ...Chain[]] = [
  WagmiChains.bsc,
  WagmiChains.bscTestnet,
  WagmiChains.mainnet,
  WagmiChains.goerli,
  WagmiChains.sepolia,
  WagmiChains.polygonZkEvm,
  WagmiChains.polygonZkEvmTestnet,
  WagmiChains.zkSync,
  WagmiChains.arbitrum,
  WagmiChains.arbitrumGoerli,
  WagmiChains.arbitrumSepolia,
  WagmiChains.linea,
  WagmiChains.lineaTestnet,
  WagmiChains.base,
  WagmiChains.baseGoerli,
  WagmiChains.baseSepolia,
  WagmiChains.opBNB,
  WagmiChains.opBNBTestnet,
  WagmiChains.scrollSepolia,
];

export function getCurrentChain(chainId: number) {
  return CHAINS.find((i) => i.id === chainId);
}

// 支持的链
export const SUPPORT_CHAINS = [import.meta.env.PROD ? baseSepolia : baseSepolia];

export const CHAIN_ID = import.meta.env.PROD ? baseSepolia.id : baseSepolia.id;

// 链图标
export const CHAINS_ICON: Record<number, string> = {
  [ChainId.BASE]: 'chain-base',
  [ChainId.BASE_SEPOLIA]: 'chain-base',
};
