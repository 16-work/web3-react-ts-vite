import { AnchorProvider, Provider, getProvider, setProvider } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

const useAnchorProvider = (withWallet = true) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  return useMemo(() => {
    let provider: Provider;
    if (!wallet) return;
    try {
      if (!withWallet) {
        provider = getProvider();
      } else {
        provider = new AnchorProvider(connection, wallet, {});
        setProvider(provider);
      }
    } catch {
      provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }

    return provider;
  }, [connection, wallet, withWallet]);
};

export default useAnchorProvider;
