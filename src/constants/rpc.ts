export enum RPC_URL {
  DEV = 'https://api.devnet.solana.com',
  //DEV = "https://mainnet.helius-rpc.com/?api-key=88bb8658-2741-4639-89bb-b40eae81123d/",
  MAIN_NET = 'https://mainnet.helius-rpc.com/?api-key=88bb8658-2741-4639-89bb-b40eae81123d',
}

//TODO MAINNET
export const SOLANA_CLUSTER = env.VITE_ENV === 'prod' ? RPC_URL.MAIN_NET : RPC_URL.DEV;
