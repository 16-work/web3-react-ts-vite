import { useWallet } from '@solana/wallet-adapter-react';

/** Hook */
export const useInitGlobalData = () => {
  /** Retrieval */
  const { theme } = store.global();
  const { publicKey } = useWallet();
  const { setBalance } = store.user();
  const { setUsdtUnitPrice, setTokenIconList } = store.global();

  /** Actions */
  // 初始化主题
  useEffect(() => {
    document.body.classList.add(theme);
  }, []);

  // 初始化token icons
  useAsyncEffect(async () => {
    const res = await api.token.fetchList({ page: 1, pageSize: 9999 });

    const list: Record<string, string> = {};
    for (let i = 0; i < res.list.length; i++) {
      list[res.list[i].contract.toLowerCase()] = res.list[i].icon;
    }

    setTokenIconList(list);
  }, []);

  // 轮询美元单价
  useRequest(
    async () => {
      /* main */
      const res = await api.common.fetchUSDTUnitPrice();

      /* success */
      setUsdtUnitPrice(String(res));
      localCache.set('usdtUnitPrice', String(res));
    },
    {
      pollingInterval: 1000 * 60 * 1, // 1min 刷新美元单价
    }
  );

  // address变动刷新sol可用余额
  useAsyncEffect(async () => {
    if (publicKey) {
      const balance = await hooks.wallet.getSolBalance();
      setBalance(balance);
    } else {
      setBalance('0');
    }
  }, [publicKey]);
};
