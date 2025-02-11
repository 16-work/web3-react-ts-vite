import { MIN_GAS } from '@/constants/common';
import { useWallet } from '@solana/wallet-adapter-react';

export const useAccount = () => {
  /** Retrieval */
  const { balance } = store.user();
  const { publicKey, connecting, connected } = useWallet();

  /** Params */
  const availableBalance = useMemo(() => {
    let value = BigNumber(balance).minus(MIN_GAS).toString();
    value = BigNumber(balance).gt(0) ? balance : '0';
    return value;
  }, [balance]);

  /** Actions */

  /** Return */
  return {
    address: publicKey?.toBase58(),
    balance,
    availableBalance,
    isConnecting: connecting,
    isConnected: connected,
  };
};
