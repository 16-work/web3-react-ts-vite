import { useCusRequest } from './useRequest';
import { useCusLockFn } from './useLockFn';

// 覆盖原有方法
export const useRequest = useCusRequest;
export const useLockFn = useCusLockFn;

export * from 'ahooks';
