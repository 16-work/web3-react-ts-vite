import { IDL } from '@/constants/idl';
import { PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';

export async function simulatePrepareTransaction(instructions: TransactionInstruction[], payer: PublicKey) {
  const blockhash = await connection.getLatestBlockhash({ commitment: 'finalized' }).then((res) => res.blockhash);

  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  const versionedTransaction = new VersionedTransaction(messageV0);
  await simulateTx(versionedTransaction);
  return { versionedTransaction };
}

export async function simulateTx(versionedTransaction: VersionedTransaction) {
  const simulate = await connection.simulateTransaction(versionedTransaction);
  if (simulate.value.err) {
    if (typeof simulate.value.err === 'string') {
      throw new Error(simulate.value.err);
    } else {
      const errCode = (simulate.value.err as any)?.InstructionError?.[1]?.Custom;
      const errorInfo = IDL.errors.find((e: { code: number }) => e.code === errCode);
      if (errorInfo?.msg) {
        throw new Error(errorInfo?.msg);
      } else if (errCode === 1) {
        throw new Error('Insufficient Balance');
      }
      const errCode2 = (simulate.value.err as any)?.InsufficientFundsForRent;
      if (errCode2) {
        throw new Error('insufficient funds for rent');
      }

      throw new Error('Unknown RPC error');
    }
  }
}
