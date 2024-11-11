import { MIN_GAS } from '@/constants/common';
import { useAccount as useOriginAccount, useBalance } from 'wagmi';

export const useAccount = () => {
  /** Retrieval */
  const account = useOriginAccount();
  const { data: walletBalance } = useBalance({ address: account.address });

  /** Params */
  const balance = useMemo(() => {
    return walletBalance?.value.toString() || '0';
  }, [walletBalance?.value]);

  const availableBalance = useMemo(() => {
    const value = BigNumber(balance).minus(MIN_GAS);
    return value.lt(0) ? '0' : value.toString();
  }, [walletBalance?.value, balance]);

  /** Return */
  return {
    ...account,
    balance,
    availableBalance,
  };
};
