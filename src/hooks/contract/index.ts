import useAnchorProvider from './useAnchorProvider';
import { Task } from '@/store/global/types.ts';
import { simulatePrepareTransaction } from '@/utils/transaction';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { TransactionInstruction } from '@solana/web3.js';

export default function useContract() {
  const anchorPriovider = useAnchorProvider();
  const wallet = useAnchorWallet();
  const { submitTransaction } = store.transaction();
  const { t } = useTranslation();
  const writeContract = useCallback(
    async (
      task: Task,
      params: { instructions: TransactionInstruction[] } & {
        message?: {
          title: string;
          desc: string;
        };
        callback?: () => void;
      }
    ) => {
      if (!wallet || !anchorPriovider) return;

      const { message, callback, instructions } = params;

      try {
        task.status = 0;

        const { versionedTransaction } = await simulatePrepareTransaction(instructions, wallet.publicKey);
        const signedTransaction = await wallet.signTransaction(versionedTransaction);
        const signature = await anchorPriovider!.connection.sendTransaction(signedTransaction, {
          skipPreflight: false,
          preflightCommitment: 'processed',
        });
        if (signature) {
          const title = message?.title ?? t('tip.pending');
          const desc = message?.desc ?? t('tip.successfully');

          submitTransaction({
            hash: signature,
            title,
            description: desc,
            timestamp: Date.now() / 1000,
          });

          task.id = signature;

          callback && callback();
        }

        return signature;
      } catch (e: any) {
        console.log(e);
        msg.error(e.toString());

        task.status = -1;
      }
    },
    [anchorPriovider, submitTransaction, t, wallet]
  );

  return {
    writeContract,
  };
}
