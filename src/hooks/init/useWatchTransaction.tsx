import { events } from '@/utils/events';

export const useWatchTransaction = () => {
  const { tasks, setTask } = store.global();

  const transactionSuccess = (params: { hash: string }) => {
    const index = tasks.findIndex((task) => task.id === params.hash);
    if (index) setTask({ index, status: 1 });
  };

  useEffect(() => {
    events.on(EVENTS.TRANSACTION_SUCCESS, transactionSuccess);
    return () => {
      events.off(EVENTS.TRANSACTION_SUCCESS, transactionSuccess);
    };
  }, []);
};
