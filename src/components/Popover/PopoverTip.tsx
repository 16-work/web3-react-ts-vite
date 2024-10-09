import { Popover } from 'antd';
import { ReactNode } from 'react';

/** Props */
interface Props {
  tip: ReactNode;
  triggerClassName?: string;
  iconClassName?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

/** Component */
export const PopoverTip = (props: Props) => {
  /** Params */
  const iconClassName = useMemo(() => {
    // 未设置width时使用默认size
    const regex = /\bw-(\d+|auto|full|screen)\b/;
    if (regex.test(props.iconClassName + '')) return props.iconClassName;
    else return props.iconClassName + ' xs:w-26 md:w-18';
  }, [props.iconClassName]);

  /** Template */
  return (
    <Popover
      content={
        <div className="inline-block xs:max-w-300 md:max-w-600 max-h-300 px-10 pt-10 text-common-1 font-base break-words overflow-auto">{props.tip}</div>
      }
    >
      <span className="hover-primary inline-block cursor-pointer">
        <Svg
          name="tip"
          className={`${iconClassName}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onClick && props.onClick(e);
          }}
        />
      </span>
    </Popover>
  );
};
