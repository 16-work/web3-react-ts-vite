import { DEFAULT_CHAIN_CURRENT } from '@/constants/chain';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { readContract } from '@wagmi/core';
import { WAGMI_CONFIG } from '@/constants/wagmi';
import { Address } from 'viem';
import { ContractFunctionRevertedError, TransactionExecutionError } from 'viem';
import { t } from 'i18next';
import { Task } from '@/store/global/types';
import { multicall as wagmiMulticall } from '@wagmi/core';

interface BaseParams {
  address: Address | Addresses;
  abi: any;
  functionName: string;
  args: any[];
}

type Addresses = {
  [key: number]: Address;
};

/** Hook */
export default () => {
  /** Retrieval */
  const account = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { submitTransaction } = store.transaction();

  /** Actions */
  // 写合约
  const write = useCallback(
    async (
      task: Task,
      params: BaseParams & {
        value?: bigint; // payable时有value，nonpayable时无value
        message?: {
          title: string;
          desc: string;
        };
        callback?: () => void;
      }
    ) => {
      const { message, callback, ...otherParams } = params;

      try {
        task.status = 0;

        const res = await publicClient?.simulateContract({
          ...otherParams,
          address: typeof params.address === 'string' ? params.address : getContractAddress(params.address, account.chainId),
          account: account.address as `0x${string}`,
        });

        let hash;
        if (res?.request) hash = await walletClient?.writeContract(res.request);

        if (hash) {
          const title = message?.title ?? t('tip.pending');
          const desc = message?.desc ?? t('tip.successfully');

          submitTransaction({
            hash,
            title,
            chainId: account.chain?.id || DEFAULT_CHAIN_CURRENT.id,
            description: desc,
            timestamp: Date.now() / 1000,
          });

          task.id = hash;

          callback && callback();
        }

        return hash;
      } catch (e) {
        console.log(e);

        handleContractError(e, (error: string) => {
          if (error === 'Chain not configured.') {
            msg.warning(t('tip.switchNetwork'));
            hooks.wallet.switchChain();
          } else {
            if (env.VITE_ENV !== 'prod') console.log(otherParams);
            msg.error(error);
          }
        });

        task.status = -1;
      }
    },
    [publicClient, account.address, walletClient, submitTransaction, account.chainId]
  );

  // 读合约
  const read = useCallback(
    async (params: BaseParams) => {
      try {
        const res = await readContract(WAGMI_CONFIG, {
          ...params,
          address: typeof params.address === 'string' ? params.address : getContractAddress(params.address, account.chainId),
        });

        return res as any;
      } catch (e) {
        console.log(e);
        if (env.VITE_ENV !== 'prod') console.log(params);

        return undefined;
      }
    },
    [publicClient, account.address, walletClient, submitTransaction, account.chainId]
  );

  // 批量请求
  const multicall = useCallback(
    async (params: BaseParams[]) => {
      const contracts = params.map((param) => {
        return {
          ...param,
          address: typeof param.address === 'string' ? param.address : getContractAddress(param.address, account.chainId),
        };
      });

      try {
        const res: any[] = await wagmiMulticall(WAGMI_CONFIG, {
          contracts,
        });

        return res.map((i) => i.result);
      } catch (e) {
        console.log(e);

        return [];
      }
    },
    [publicClient, account.address, walletClient, submitTransaction, account.chainId]
  );

  /** Return */
  return { write, read, multicall };
};

/** Functions */
const getContractAddress = (address: Addresses, chainId?: number): `0x${string}` => {
  return chainId && address[chainId] ? address[chainId] : address[DEFAULT_CHAIN_CURRENT.id];
};

const handleContractError = (e: any, callback?: (error: any) => void) => {
  if (e?.message.indexOf('You have not completed authentication') > -1) {
    callback && callback('You have not completed authentication');
    return;
  }
  if (e?.walk) {
    const revertError = e?.walk((err: any) => err instanceof ContractFunctionRevertedError);
    const TRevertError = e?.walk((err: any) => err instanceof TransactionExecutionError);
    if (revertError instanceof ContractFunctionRevertedError) {
      callback && callback(revertError.reason);
      return;
      // do something with `errorName`
    }
    if (TRevertError instanceof TransactionExecutionError) {
      callback && callback(TRevertError.shortMessage);
      return;
      // do something with `errorName`
    }
    callback && callback(e?.shortMessage);
    return;
  } else {
    callback && callback(e?.message || e);
    return;
  }
};
