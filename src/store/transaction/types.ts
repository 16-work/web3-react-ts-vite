export interface Transaction {
  hash: string;
  status?: 'pending' | 'success' | 'error';
  title: string;
  description?: string;
  toastID?: string;
  extra?: any;
  timestamp: number;
}

export interface TransactionStore {
  transactions: Transaction[];
  submitTransaction: (transaction: Transaction) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
}
