import { SCREEN } from '@config/constants/screen';

export interface GlobalStore {
  theme: string;
  setTheme: (theme: string) => void;

  isPC: boolean;
  setIsPC: (bool: boolean) => void;

  screenType: SCREEN;
  setScreenType: (type: SCREEN) => void;

  tasks: Task[];
  setTask: (params: { index: number; id?: string; status?: TaskStatus }) => void;

  isOpenDrawer: boolean;
  setIsOpenDrawer: (bool: boolean) => void;

  usdtUnitPrice: string;
  setUsdtUnitPrice: (value: string) => void;

  tokenIconList: Record<string, string>;
  setTokenIconList: (list: Record<string, string>) => void;
}

export interface Task {
  id: string;
  status: TaskStatus;
}

export type TaskStatus = -1 | 0 | 1;
