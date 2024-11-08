import { create } from 'zustand';
import { GlobalStore } from './types';
import { devtools, persist } from 'zustand/middleware';
import { DEFAULT_THEME } from '@/constants/common';

export default create<GlobalStore>()(
  devtools(
    persist(
      (set) => ({
        theme: DEFAULT_THEME,
        setTheme: (theme) =>
          set((state) => {
            document.body.classList.remove(state.theme);
            document.body.classList.add(theme);
            return { theme };
          }),

        isPC: true,
        setIsPC: (bool) => set(() => ({ isPC: bool })),

        screenType: tools.getScreenType(),
        setScreenType: (type) => set(() => ({ screenType: type })),

        isHitBottom: false,
        setIsHitBottom: (bool) => set(() => ({ isHitBottom: bool })),

        tasks: [],
        setTask: (params) =>
          set((state) => {
            if (!state.tasks[params.index]) {
              state.tasks[params.index] = { id: '', status: -1 };
            }
            if (params.id) state.tasks[params.index].id = params.id;
            if (typeof params.status === 'number') state.tasks[params.index].status = params.status;

            return { tasks: state.tasks };
          }),

        isOpenDrawer: false,
        setIsOpenDrawer: (bool) => set(() => ({ isOpenDrawer: bool })),

        usdtUnitPrice: '0',
        setUsdtUnitPrice: (value) => set(() => ({ usdtUnitPrice: value })),

        tokenIconList: {},
        setTokenIconList: (update) => set((state) => ({ tokenIconList: { ...state.tokenIconList, ...update } })),
      }),
      { name: 'global' }
    )
  )
);
