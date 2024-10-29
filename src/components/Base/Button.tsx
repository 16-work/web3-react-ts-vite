import { Button as NButton, ButtonProps } from '@nextui-org/button';
import { To } from 'react-router-dom';
import { useAccount } from 'wagmi';

enum BtnStatus {
  CORRECT = 1,
  UNCONNECT = -1,
  WRONGNETWORK = -2,
}

/** Props */
interface Props extends ButtonProps {
  to?: To;
  auth?: boolean;
}

/** Component
 * 注意: 这个button自带position: relative
 */
export const Button = (props: Props) => {
  /** Retrieval */
  const account = useAccount();
  const { t } = useTranslation();

  /** Params */
  const { auth, ...params } = props;

  const btnStatus = useMemo(() => {
    if (auth) {
      if (!account.address) return BtnStatus.UNCONNECT;
      else if (!account.chain) return BtnStatus.WRONGNETWORK;
    }
    return BtnStatus.CORRECT;
  }, [account.address, account.chain, auth]);

  const btnContent = useMemo(() => {
    switch (btnStatus) {
      case BtnStatus.UNCONNECT:
        return t('account.connectWallet');
      case BtnStatus.WRONGNETWORK:
        return t('account.switchNetwork');
      default:
        return props.children;
    }
  }, [btnStatus, props.children, t]);

  const btnClickFun = useMemo(() => {
    switch (btnStatus) {
      case BtnStatus.UNCONNECT:
        return hooks.wallet.connect;
      case BtnStatus.WRONGNETWORK:
        return hooks.wallet.switchChain;
      default:
        return !props.disabled && !props.isLoading ? props.onClick : () => {};
    }
  }, [btnStatus, props.onClick]);

  /** Template */
  return (
    <>
      {/* 普通按钮 */}
      {!props.to && (
        <NButton
          {...params}
          disabled={btnStatus === BtnStatus.CORRECT && props.disabled}
          className={`
            flex-align-x h-fit px-0 outline-none 
            ${props.className} 
            ${btnStatus === BtnStatus.CORRECT && (props.disabled || props.isLoading) ? 'opacity-30 cursor-not-allowed' : ''} 
          `}
          isLoading={false}
          onClick={btnClickFun}
        >
          {btnContent}

          {/* loading */}
          {props.isLoading && <Svg name="spin" className="w-20 ml-10 animate-spin origin-center" />}

          {/* mask */}
          <span className="absolute w-full h-full bg-transparent hover:bg-white/10 duration-300"></span>
        </NButton>
      )}

      {/* 链接按钮 */}
      {props.to && (
        <Link
          to={props.to}
          className={`
            relative flex-align-x justify-center w-fit h-fit px-0 outline-none overflow-hidden
            ${props.className} 
            ${props.disabled || props.isLoading ? 'opacity-30 cursor-not-allowed' : ''} 
          `}
        >
          {props.children}

          {/* loading */}
          {props.isLoading && <Svg name="spin" className="w-20 ml-10 animate-spin origin-center" />}

          {/* mask */}
          <span className="absolute w-full h-full top-0 left-0 bg-transparent hover:bg-white/10 duration-300"></span>
        </Link>
      )}
    </>
  );
};
