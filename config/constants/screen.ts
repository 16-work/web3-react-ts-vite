export enum SCREEN {
  XS = 0,
  MD = 1,
  LG = 2,
  XL = 3,
}

export const screenMinSize = {
  [SCREEN.XS]: 0,
  [SCREEN.MD]: 751,
  [SCREEN.LG]: 1000,
  [SCREEN.XL]: 1340,
};
