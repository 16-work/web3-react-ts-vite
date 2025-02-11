import { Popover as APopover, PopoverProps } from 'antd';

/** Props */
interface Props extends Omit<PopoverProps, 'content'> {
  tip: string;
  tipClassName?: string;
}

/** Component */
export const PopoverText = (props: Props) => {
  /** Template */
  return props.tip ? (
    <APopover
      {...props}
      content={<span className={`inline-block xs:max-w-300 md:max-w-600 px-10 py-5 text-common-1 thin break-words ${props.tipClassName}`}>{props.tip}</span>}
    >
      {/* 不套一层span的话，children为SvgIcon时会有警告 */}
      <span>{props.children}</span>
    </APopover>
  ) : (
    props.children
  );
};
