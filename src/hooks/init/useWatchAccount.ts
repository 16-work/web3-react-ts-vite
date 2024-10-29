import { useAccount } from 'wagmi';

/** Hook */
export const useWatchAccount = () => {
  /** Retrieval */
  const account = useAccount();
  const { usersToken } = store.user();

  /** Actions */
  // 同步userTokens
  useEffect(() => {
    localCache.set('tokens', usersToken);
  }, [usersToken]);

  // 同步address
  useEffect(() => {
    localCache.set('address', account.address?.toLowerCase());
  }, [account.address]);
};
