import wallet from '../useWallet';
import contract from '../contract';

// 类型声明
export const hooks = {} as {
  wallet: ReturnType<typeof wallet>;
  contract: ReturnType<typeof contract>;
};

/** Hook
 * 初始化
 */
export const useGlobalHooks = () => {
  hooks.wallet = wallet();
  hooks.contract = contract();
};
