import * as hooks from 'ahooks';
import { Options, Service, Result } from 'ahooks/lib/useRequest/src/types';

/* loading -> isLoading & 调整onError位置 */
export function newUseRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  onError: Options<TData, TParams> | ((e: Error, params: any) => void) = {},
  options: Options<TData, TParams> = {}
): Omit<Result<TData, TParams> & { isLoading: boolean }, 'loading'> {
  if (typeof onError === 'function') {
    options = {
      ...options,
      onError: (e, params) => {
        console.log(e);
        onError(e, params);
      },
    };
  } else {
    options = onError;
  }

  const { loading, ...res } = hooks.useRequest(service, options);
  return { ...res, isLoading: loading };
}
