import { events } from '@/utils/events';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Transaction, TransactionStore } from '@/store/transaction/types';
import { connection } from '@/components/Providers/ProviderWallet';

export default create<TransactionStore>()(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],

        submitTransaction: async ({ hash, title, description, timestamp }: Transaction) => {
          get().addTransaction({ hash, description, title, timestamp });

          // 初始化交易为 pending 状态
          const toastId = toast.loading(title);

          try {
            const checkTransactionStatus = async (): Promise<any> => {
              return await connection.getTransaction(hash, {
                commitment: 'confirmed',
                maxSupportedTransactionVersion: 0,
              });
            };

            let receipt = null;
            while (!receipt) {
              receipt = await checkTransactionStatus();
              if (!receipt) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
            }

            toast.update(toastId, {
              render: (
                <>
                  <div className="text-success font-lg">{description}</div>
                  <div className="link-1 mt-8 font-base underline cursor-pointer" onClick={() => tools.gotoScan(hash)}>
                    View on Scan
                  </div>
                </>
              ),
              type: 'success',
              isLoading: false,
              closeButton: true,
              autoClose: 3000,
            });

            get().updateTransaction({ hash, title, timestamp, status: 'success' });
            events.emit(EVENTS.TRANSACTION_SUCCESS, { hash, status: 'success' });

            const checkTransactionStatus2 = async (): Promise<any> => {
              return await connection.getTransaction(hash, {
                commitment: 'finalized',
                maxSupportedTransactionVersion: 0,
              });
            };
            let receipt2 = null;
            while (!receipt2) {
              receipt2 = await checkTransactionStatus2();
              if (!receipt2) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
            }
            events.emit(EVENTS.TRANSACTION_SUCCESS, { hash, status: 'finalized' });
          } catch (error) {
            toast.update(toastId, {
              render: title,
              type: 'error',
              isLoading: false,
              closeButton: true,
              autoClose: 3000,
            });
            get().updateTransaction({ hash, title, timestamp, status: 'error' });
            throw error;
          }
        },

        addTransaction: (transaction: Transaction) =>
          set((state) => {
            state.transactions.push({
              hash: transaction.hash,
              status: 'pending',
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
