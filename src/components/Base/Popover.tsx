import { Popover as APopover, PopoverProps } from 'antd';

/** 注意：
 * 1.如果希望Popover里面的按钮也可以触发气泡，请用普通<button>，不要用<Button>
 * 2.如果children和Popover不在同一组件里，请在children组件外加层div
 * 3.希望背景与全局样式不一样，请单独引入自定义scss
 * 4.placement非居中时，箭头不会居中trigger(翻了几个主流组件都做不到这个)
 */

/** Props */
interface Props extends PopoverProps {}

/** Component */
export const Popover = (props: Props) => {
  /** Retrieval */

  /** Params */
  const trigger = props.trigger ?? ['hover'];

  /** Actions */

  /** Template */
  return (
    <APopover {...props} trigger={trigger}>
      {props.children}
    </APopover>
  );
};
