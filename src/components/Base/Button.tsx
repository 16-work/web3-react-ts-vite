import { Button as NButton, ButtonProps } from '@nextui-org/button';
import { To } from 'react-router-dom';

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
    }
    return BtnStatus.CORRECT;
  }, [account.address, auth]);

  const btnContent = useMemo(() => {
    switch (btnStatus) {
      case BtnStatus.UNCONNECT:
        return t('account.connectWallet');
      default:
        return props.children;
    }
  }, [btnStatus, props.children, t]);

  const btnClickFun = useMemo(() => {
    switch (btnStatus) {
      case BtnStatus.UNCONNECT:
        return hooks.wallet.connect;
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
            h-fit flex-align-x px-0 outline-none 
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
          <span className="w-full h-full absolute bg-transparent hover:bg-white/10 duration-300"></span>
        </NButton>
      )}

      {/* 链接按钮 */}
      {props.to && (
        <Link
          to={props.to}
          className={`
            w-fit h-fit relative flex-align-x justify-center px-0 outline-none overflow-hidden
            ${props.className} 
            ${props.disabled || props.isLoading ? 'opacity-30 cursor-not-allowed' : ''} 
          `}
        >
          {props.children}

          {/* loading */}
          {props.isLoading && <Svg name="spin" className="w-20 ml-10 animate-spin origin-center" />}

          {/* mask */}
          <span className="w-full h-full absolute top-0 left-0 bg-transparent hover:bg-white/10 duration-300"></span>
        </Link>
      )}
    </>
  );
};
