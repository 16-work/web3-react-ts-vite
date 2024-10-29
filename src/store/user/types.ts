export interface UserStore {
  isShowVerifyTip: boolean;
  setIsShowVerifyTip: (bool: boolean) => void;

  usersToken: Record<string, string>;
  setUsersToken: (address: string, token: string) => void;
}
