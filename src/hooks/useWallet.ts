import { useConnectModal, useChainModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { useDisconnect, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

/** Hook */
export default () => {
  /** Retrieval */
  const account = useAccount();
  const { t } = useTranslation();
  const { openChainModal } = useChainModal();
  const { signMessageAsync } = useSignMessage();
  const { openAccountModal } = useAccountModal();
  const { openConnectModal } = useConnectModal();
  const { disconnect: logout } = useDisconnect();
  const { usersToken, setUsersToken } = store.user();

  /** Actions */
  const connect = () => {
    if (openConnectModal) openConnectModal();
  };

  const viewAccountInfo = () => {
    if (openAccountModal) openAccountModal();
  };

  const disconnect = () => {
    logout();
    msg.success(t('tip.disconnectionSuccessful'), { autoClose: 500 });
  };

  const switchChain = () => {
    if (openChainModal) openChainModal();
  };

  const getSign = async () => {
    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address: account.address,
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.origin,
      version: '1',
      chainId: account.chain?.id,
    });

    const message = siweMessage.prepareMessage();
    const signature = await signMessageAsync({ message });
    return {
      signature,
      message,
    };
  };

  const verify = async () => {
    const addr = (account && account?.address?.toLowerCase()) || '';

    // 未登录
    if (!account.address) {
      msg.warning(t('tip.login'));
      return false;
    }
    // 无token重新签名
    else if (!usersToken[addr]) {
      const sign = await getSign();
      const res = await api.user.verify({
        account: addr,
        signature: sign.signature,
        eip4361Message: sign.message,
      });

      setUsersToken(addr, res.token);
    }
    return true;
  };

  /** Return */
  return {
    connect,
    viewAccountInfo,
    disconnect,
    switchChain,
    verify,
  };
};
