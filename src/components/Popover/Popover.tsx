import { Popover as APopover, PopoverProps } from 'antd';

const styleType = {
  base: {
    bg: 'rgb(var(--cus-popover-1))',
    box: '!rounded-10',
  },
};

/** 注意：
 * 1.如果希望Popover里面的按钮也可以触发气泡，请用普通<button>，不要用<Button>
 * 2.如果children和Popover不在同一组件里，请在children组件外加层div
 * 3.placement非居中时，箭头不会居中trigger(翻了几个主流组件都没实现这个，先将就吧)
 */

/** Props */
interface Props extends PopoverProps {
  type?: keyof typeof styleType;
}

/** Component */
export const Popover = (props: Props) => {
  /** Retrieval */

  /** Params */
  const trigger = props.trigger ?? ['hover'];
  const className = styleType[props.type ?? 'base'];

  /** Actions */

  /** Template */
  return (
    <APopover
      {...props}
      trigger={trigger}
      classNames={{
        body: className.box,
      }}
      color={className.bg}
    >
      {props.children}
    </APopover>
  );
};
