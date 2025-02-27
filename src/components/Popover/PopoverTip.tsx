import { ReactNode } from 'react';
import { PopoverProps } from 'antd';

const styleType = {
  base: {
    tipBox: `inline-block break-words 
             xs:max-w-400 md:max-w-300 px-10 py-5 text-common-1 thin 
            `,
    tipIcon: `inline-block cursor-pointer 
              xs:w-26 md:w-18
              text-tip-1 hover-primary 
              `,
  },
};

/** Props */
interface Props extends Omit<PopoverProps, 'content'> {
  tip: ReactNode;
  tipClassName?: string;
  type?: keyof typeof styleType;

  // 无children时默认为?图标，以下为该情况下专用属性
  triggerClassName?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

/** Component */
export const PopoverTip = (props: Props) => {
  /** Params */
  const className = styleType[props.type ?? 'base'];

  /** Template */
  return props.tip ? (
    <Popover {...props} content={<div className={`${className.tipBox} ${props.tipClassName}`}>{props.tip}</div>}>
      {/* 不套一层span的话，children为SvgIcon时会有警告 */}
      {props.children ? (
        <span>{props.children}</span>
      ) : (
        <span className={`${className.tipIcon}`}>
          <Svg
            name="tip"
            className={`w-full`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onClick && props.onClick(e);
            }}
          />
        </span>
      )}
    </Popover>
  ) : (
    props.children
  );
};
