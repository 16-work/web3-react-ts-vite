import { DEFAULT_CHAIN_ID } from '@/constants/chains';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { readContract } from '@wagmi/core';
import { WAGMI_CONFIG } from '@/constants/wagmi';
import { Address } from 'viem';
import { ContractFunctionRevertedError, TransactionExecutionError } from 'viem';
import { t } from 'i18next';

interface BaseParams {
  contractConfig: {
    address: Addresses;
    abi: any[];
  };
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
      params: BaseParams & {
        value?: bigint; // payable时有value，nonpayable时无value
        message?: {
          title: string;
          desc: string;
        };
        callback?: () => void;
      }
    ) => {
      try {
        const { contractConfig, functionName, args, value, message, callback } = params;

        const res = await publicClient?.simulateContract({
          address: getContractAddress(contractConfig.address, account.chainId),
          abi: contractConfig.abi,
          account: account.address as `0x${string}`,
          functionName,
          args,
          value,
        });

        let hash;
        if (res?.request) hash = await walletClient?.writeContract(res.request);

        if (hash) {
          const title = message?.title ?? t('tip.pending');
          const desc = message?.desc ?? t('tip.successfully');

          submitTransaction({
            hash,
            title,
            chainId: account.chain?.id || DEFAULT_CHAIN_ID,
            description: desc,
            timestamp: Date.now() / 1000,
          });

          callback && callback();
        }

        return hash;
      } catch (e) {
        console.log(e);

        handleContractError(e, (error: string) => {
          msg.error(error);
        });
      }
    },
    [publicClient, account.address, walletClient, submitTransaction, account.chainId]
  );

  // 读合约
  const read = useCallback(
    async (params: BaseParams) => {
      try {
        const { contractConfig, functionName, args } = params;

        const res = await readContract(WAGMI_CONFIG, {
          address: getContractAddress(contractConfig.address, account.chainId),
          abi: contractConfig.abi,
          functionName,
          args,
        });

        return res;
      } catch (e) {
        console.log(e);

        handleContractError(e, (error) => {
          msg.error(error);
        });

        return undefined;
      }
    },
    [publicClient, account.address, walletClient, submitTransaction, account.chainId]
  );

  /** Return */
  return { write, read };
};

/** Functions */
const getContractAddress = (address: Addresses, chainId?: number): `0x${string}` => {
  // @ts-ignore
  return chainId && address[chainId] ? address[chainId] : address[DEFAULT_CHAIN_ID];
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
