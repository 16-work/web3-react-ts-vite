/** Hook */
export const useInitGlobalData = () => {
  /** Retrieval */
  const { theme } = store.global();
  const { setUsdtUnitPrice, setTokenIconList } = store.global();

  /** Actions */
  // 初始化主题
  useEffect(() => {
    document.body.classList.add(theme);
  }, []);

  // 初始化token icons
  ahooks.asyncEffect(async () => {
    const res = await api.common.getTokenList({ page: 1, pageSize: 9999 });

    const list: Record<string, string> = {};
    for (let i = 0; i < res.list.length; i++) {
      list[res.list[i].contract.toLowerCase()] = res.list[i].icon;
    }

    setTokenIconList(list);
  }, []);

  // 轮询美元单价
  ahooks.request(
    async () => {
      /* main */
      const res = await api.common.getUSDTUnitPrice();

      /* success */
      setUsdtUnitPrice(String(res));
      localCache.set('usdtUnitPrice', String(res));
    },
    {
      pollingInterval: 1000 * 60 * 1, // 1min 刷新美元单价
    }
  );
};
