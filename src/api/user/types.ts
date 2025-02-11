export interface DTOVerify {
  /** 账号 */
  address: string;
  /** 钱包签名 */
  sign: string;
  /** ...wants you to sign in with your Ethereum account... */
  message: string;
}

export interface RDVerify {
  token: string;
  expire: number; // 生效秒数
}
