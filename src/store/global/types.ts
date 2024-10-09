import { SCREEN } from '@/constants/common';

export interface GlobalStore {
  theme: string;
  setTheme: (theme: string) => void;

  isPC: boolean;
  setIsPC: (bool: boolean) => void;

  screenType: SCREEN;
  setScreenType: (type: SCREEN) => void;

  isOpenDrawer: boolean;
  setIsOpenDrawer: (bool: boolean) => void;

  usdtUnitPrice: string;
  setUsdtUnitPrice: (value: string) => void;

  tokenIconList: Record<string, string>;
  setTokenIconList: (list: Record<string, string>) => void;
}
