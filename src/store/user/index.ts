import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserStore } from './types';

export default create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        isShowVerifyTip: false,
        setIsShowVerifyTip: (bool) => set(() => ({ isShowVerifyTip: bool })),

        usersToken: {},
        setUsersToken: (address, token) =>
          set((state) => ({
            usersToken: {
              ...state.usersToken,
              [address]: token,
            },
          })),

        balance: '0',
        setBalance: (balance: string) => set(() => ({ balance: balance })),
      }),
      { name: 'user' }
    )
  )
);
