import { useCallback } from 'react';
import { useReactive } from 'ahooks';

/* useLockFn: 新增返回isLoading和onError处理 */
export const newUseLockFn = <P extends any[] = any[], V = any>(fn: (...args: P) => Promise<V>, onError?: (error: any) => void) => {
  const state = useReactive({
    isLoading: false,
  });

  return {
    run: useCallback(
      async (...args: P) => {
        if (state.isLoading) return;
        state.isLoading = true;
        try {
          const ret = await fn(...args);
          return ret;
        } catch (e) {
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
    ),
    isLoading: state.isLoading,
  };
};
