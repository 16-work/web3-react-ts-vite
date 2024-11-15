import { ReactNode } from 'react';
import { Drawer as ADrawer } from 'antd';

/** Props */
interface Props {
  isShow: boolean;
  title?: React.ReactNode; // 输入字符串时会用默认样式
  children: ReactNode;
  onClose: () => void;

  placement?: 'right' | 'bottom' | 'left';
  hideHeader?: boolean; // 隐藏顶部
  hidePadding?: boolean; // 隐藏边距
  hideCloseIcon?: boolean; // 隐藏关闭按钮
}

/** Component */
export const Drawer = (props: Props) => {
  /** Params */
  const { screenType } = store.global();
  const placement = props.placement || 'bottom';

  /** Template */
  return (
    <ADrawer
      open={screenType < SCREEN.MD && props.isShow}
      onClose={props.onClose}
      placement={placement}
      width={placement === 'bottom' ? 'auto' : '80%'}
      height={placement === 'bottom' ? 'auto' : '100%'}
      push={false}
      className={`!bg-white 
        ${placement === 'bottom' ? 'rounded-t-20' : ''}
      `}
    >
      <div className={`h-full flex flex-col ${props.hidePadding ? '' : 'p-30'}`}>
        {/* header */}
        {!props.hideHeader && (
          <div
            className={`flex items-center justify-between gap-x-20 mb-30 text-28
            ${props.hidePadding ? 'mt-30 mx-30' : ''}
          `}
          >
            {/* title */}
            <div className={`flex-1 ${typeof props.title === 'string' ? 'text-common-1' : ''}`}>{props.title}</div>

            {/* icon: close */}
            {!props.hideCloseIcon && (
              <Svg name="close" className="w-32 text-common-1 hover:text-primary-1 cursor-pointer duration-300" onClick={props.onClose} />
            )}
          </div>
        )}

        {/* children */}
        {props.children}
      </div>
    </ADrawer>
  );
};
