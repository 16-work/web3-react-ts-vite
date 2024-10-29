export interface DTOVerify {
    /** 账号 */
    account: string;
    /** 钱包签名 */
    signature: string;
    /** ...wants you to sign in with your Ethereum account... */
    eip4361Message: string;
}

export interface RDVerify {
    token: string;
    expire: number; // 生效秒数
}
