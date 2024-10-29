import { ReactNode } from 'react';
import { Drawer as ADrawer } from 'antd';

/** Props */
interface Props {
  isShow: boolean;
  title?: React.ReactNode; // 输入字符串时会用默认样式
  hideHeader?: boolean; // 隐藏顶部
  children: ReactNode;
  onClose: () => void;

  placement?: 'right' | 'bottom' | 'left';
  hidePadding?: boolean; // 隐藏边距
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
      <div className={`flex flex-col h-full ${props.hidePadding ? '' : 'p-30'}`}>
        {/* header */}
        {!props.hideHeader && (
          <div
            className={`flex items-center justify-between mb-30 text-28
            ${props.hidePadding ? 'mx-30 mt-30' : ''}
          `}
          >
            {/* title */}
            <div className={typeof props.title === 'string' ? 'text-common-1' : ''}>{props.title}</div>

            {/* icon: close */}
            <Svg name="close" className="w-32 text-common-1 hover:text-primary-1 cursor-pointer duration-300" onClick={props.onClose} />
          </div>
        )}

        {/* children */}
        {props.children}
      </div>
    </ADrawer>
  );
};
