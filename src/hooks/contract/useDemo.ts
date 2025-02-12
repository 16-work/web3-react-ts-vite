import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useAnchorProvider } from './useAnchorProvider';
import { useProgram } from './useProgram';
import { TransactionInstruction } from '@solana/web3.js';
import { useContract } from '.';
import { Task } from '@/store/global/types';

export const useDemo = () => {
  /** Retrieval */
  const { program } = useProgram();
  const wallet = useAnchorWallet();
  const { writeContract } = useContract();
  const anchorPriovider = useAnchorProvider();

  /** Params */

  /** Actions */
  const writeFunc = useCallback(
    async (task: Task, args: any, accountParams: any) => {
      if (!anchorPriovider || !wallet || !program) return;

      const instructions: TransactionInstruction[] = [];
      instructions.push(
        await program.methods
          .functionName(...args)
          .accounts({
            ...accountParams,
            signer: wallet.publicKey,
            program: program.programId,
          })
          .instruction()
      );

      return await writeContract(task, { instructions });
    },
    [anchorPriovider, program, wallet, writeContract]
  );

  /** Return */
  return { writeFunc };
};
