import { Popover } from 'antd';
import { ReactNode } from 'react';

/** Props */
interface Props {
  tip: ReactNode;
  triggerClassName?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

/** Component */
export const PopoverTip = (props: Props) => {
  /** Params */
  const triggerClassName = useMemo(() => {
    // 未设置width时使用默认size
    const regex = /\bw-(\d+|auto|full|screen)\b/;
    if (regex.test(props.triggerClassName + '')) return props.triggerClassName;
    else return props.triggerClassName + ' xs:w-26 md:w-18';
  }, [props.triggerClassName]);

  /** Template */
  return (
    <Popover content={<div className="inline-block xs:max-w-300 md:max-w-600 max-h-300 px-10 py-5 text-common-1 font-base break-words">{props.tip}</div>}>
      <span className={`inline-block text-tip-1 hover-primary cursor-pointer ${triggerClassName}`}>
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
    </Popover>
  );
};
