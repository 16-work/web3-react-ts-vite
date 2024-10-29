import { waitForTransactionReceipt } from '@wagmi/core';
import { WAGMI_CONFIG } from '@/constants/wagmi';
import { toast } from 'react-toastify';
import { events } from '@/utils/events';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Transaction, TransactionStore } from '@/store/transaction/types';

export default create<TransactionStore>()(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],

        submitTransaction: async ({ hash, chainId, title, description, timestamp }: Transaction) => {
          try {
            get().addTransaction({ hash, chainId, description, title, timestamp });

            const receipt = await toast.promise(waitForTransactionReceipt(WAGMI_CONFIG, { hash: hash as `0x${string}`, chainId }), {
              pending: title,
              success: {
                render() {
                  return (
                    <>
                      <div className="text-success font-lg">{description}</div>
                      <div className="link-1 mt-8 font-base underline cursor-pointer" onClick={() => tools.gotoScan(hash, chainId)}>
                        View on Scan
                      </div>
                    </>
                  );
                },
              },
              error: title,
            });

            if (receipt.status === 'success') {
              // 交易成功，更新状态
              get().updateTransaction({ chainId, hash, title, timestamp, status: 'success' });
              events.emit(EVENTS.TRANSACTION_SUCCESS, { hash, status: 'success' });
            }
          } catch (error) {
            // 交易失败，更新状态
            get().updateTransaction({ chainId, hash, title, timestamp, status: 'error' });
            throw error;
          }
        },

        addTransaction: (transaction: Transaction) =>
          set((state) => {
            state.transactions.push({
              hash: transaction.hash,
              status: 'pending',
              chainId: transaction.chainId,
              description: transaction.description,
              title: transaction.title,
              timestamp: transaction.timestamp,
            });
            return {
              transactions: state.transactions,
            };
          }),

        updateTransaction: async (transaction: Transaction) => {
          const index = get().transactions.findIndex((t) => t.hash === transaction.hash);
          if (index !== -1) {
            set((state) => {
              state.transactions[index].status = transaction.status;
              return {
                transactions: state.transactions,
              };
            });
          }
        },
      }),
      { name: 'transaction' }
    )
  )
);
