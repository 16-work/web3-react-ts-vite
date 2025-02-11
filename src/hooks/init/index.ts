import { useGlobalHooks } from './useGlobalHooks';
import { useInitGlobalData } from './useInitGlobalData';
import { useRouterFun } from './useRouterFun';
import { useWatchAccount } from './useWatchAccount';
import { useWatchScreen } from './useWatchScreen';
import { useWatchTransaction } from './useWatchTransaction';

/** Hook */
export const useInit = () => {
  useWatchScreen();
  useRouterFun();
  useGlobalHooks();
  useInitGlobalData();
  useWatchAccount();
  useWatchTransaction();
};
