import { useCallback } from 'react';
import { useReactive } from 'ahooks';
import { TaskStatus } from '@/store/global/types';

/* useLockFn: 新增返回isLoading和onError处理 */
export const useCusLockFn = <P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>, onError?: (error: any) => void) => {
  /** Retrieval */
  const { tasks, setTask } = store.global();

  /** Params */
  const state = useReactive({
    task: { index: -1, id: '', status: -1 as TaskStatus },
    isLoading: false,
  });

  /** Actions */
  const run = useCallback(
    async (...args: P) => {
      if (state.isLoading) return;
      state.isLoading = true;

      state.task.index = tasks.length;
      state.task.status = 0;

      try {
        const ret = await fn(...args);
        return ret;
      } catch (e) {
        state.task.status = -1;

        if (onError) {
          console.log(e);
          onError(e);
        } else {
          throw e;
        }
      } finally {
        state.isLoading = false;
      }
    },
    [fn, onError]
  );

  // 同步store.tasks
  useEffect(() => {
    if (state.task.index !== -1) setTask({ ...state.task });
  }, [state.task.index, state.task.id, state.task.status]);

  // 同步task transaction success
  useEffect(() => {
    if (tasks[state.task.index]?.id.startsWith('0x') && tasks[state.task.index]?.status === 1) state.task.status = 1;
  }, [tasks[state.task.index]?.status]);

  /** Return */
  return {
    run,
    isLoading: state.isLoading,
    task: state.task,
  };
};
