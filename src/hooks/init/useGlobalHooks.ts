import wallet from '../useWallet';

// 类型声明
export const hooks = {} as {
  wallet: ReturnType<typeof wallet>;
};

/** Hook
 * 初始化
 */
export const useGlobalHooks = () => {
  hooks.wallet = wallet();
};
