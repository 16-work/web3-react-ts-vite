import { connection } from '@/components/Providers/ProviderWallet';
import { useAccount } from '@/hooks/useAccount.ts';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';

export default () => {
  /** retrieval */
  const { setVisible } = useWalletModal();
  const { address } = useAccount();
  const wallet = useWallet();
  const { publicKey, disconnect: logout } = useWallet();
  const { usersToken, setUsersToken } = store.user();
  const { t } = useTranslation();
  /** params */

  /** actions */
  const connect = () => {
    setVisible(true);
  };

  const disconnect = async () => {
    await logout();
    msg.success(t('tip.disconnectionSuccessful'), { autoClose: 500 });
  };

  const getSign = async (message: string) => {
    if (!wallet || !wallet.signMessage) {
      throw new Error('No Solana wallet connected');
    }

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await wallet.signMessage(encodedMessage);
    if (!signature) {
      throw new Error('Failed to sign message');
    }

    return signature;
  };

  const verify = async () => {
    const addr = (address && address.toLowerCase()) || '';
    const message = `${address}`;
    // 未登录
    if (!address) {
      msg.warning(t('tip.login'));
      return false;
    }
    // 无token重新签名
    else if (!usersToken[addr]) {
      const sign = await getSign(message);
      const res = await api.user.verify({
        address: address,
        message: message,
        sign: btoa(String.fromCharCode.apply(null, sign as unknown as number[])),
      });

      setUsersToken(addr, res.token);
    }
    return true;
  };

  const getSolBalance = async (address?: string) => {
    address = address ?? publicKey?.toBase58() ?? '';

    try {
      const key = new PublicKey(address);
      const balance = String(await connection.getBalance(key));
      return balance;
    } catch (error) {
      console.log(error);
      return '0';
    }
  };

  const getSPLBalance = async (contract: string) => {
    const key = new PublicKey(contract);
    try {
      const info = await connection.getTokenAccountBalance(key);
      return info?.value;
    } catch (e) {
      return { amount: '0' };
    }
  };

  return { connect, disconnect, getSign, getSolBalance, getSPLBalance, verify };
};
