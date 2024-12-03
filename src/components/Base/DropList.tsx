import { Option } from '@/types/common';
import { Popover, PopoverProps } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { ReactNode } from 'react';

/** Props */
interface Props extends Omit<PopoverProps, 'children'> {
  children: (option: Option) => ReactNode;
  value: any;
  options: Option[];
  onSelect: (value: any) => void;

  placement?: TooltipPlacement;
  cusOption?: (option: any, index: number) => ReactNode;
  triggerClassName?: string;
  triggerId?: string;
  dropArrowClassName?: string;
  hideDropArrow?: boolean;
}

/** Component */
export const DropList = (props: Props) => {
  /** Params */
  const isShowArrow = props.arrow ?? false;
  const trigger = props.trigger ?? ['click'];
  const hideDropArrow = props.hideDropArrow ?? false;
  const [open, setOpen] = useState(false);

  const parentRef: any = useRef(null);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const parentWidth = useMemo(() => {
    return parentRef && parentRef.current?.offsetWidth;
  }, [parentRef, open]);

  const dropArrowClassName = useMemo(() => {
    // 未设置width时使用默认size
    const regex = /\bw-(\d+|auto|full|screen)\b/;
    if (regex.test(props.dropArrowClassName + '')) return props.dropArrowClassName;
    else return props.dropArrowClassName + ' xs:w-28 md:w-24';
  }, [props.dropArrowClassName]);

  /** Template */
  return (
    <Popover
      placement={props.placement}
      trigger={trigger}
      arrow={isShowArrow}
      open={open}
      onOpenChange={handleOpenChange}
      getPopupContainer={() => (props.triggerId ? document.getElementById(props.triggerId)! : document.body)}
      overlayStyle={{ minWidth: parentWidth }}
      content={
        props.options.length ? (
          <div className="max-h-300 grid grid-cols-1 overflow-auto">
            {props.options.map((option, index) => (
              <div
                onClick={() => {
                  props.onSelect(option.value);
                  setOpen(false);
                }}
                key={index}
                className={`px-20 text-common-1 hover-primary font-base 
                    ${props.value === option.value || props.value === option ? 'bg-primary-1 !text-common-1' : ''}
                    ${index === 0 ? '' : 'border-t border-black/50'}
                  `}
              >
                {/* 下面是有左右边距的hr，上面是没有左右边距的hr */}
                {/* {index !== 0 && <div className="hr-1"></div>} */}

                {/* option */}
                <div className={`group flex-align-x block w-full py-10`}>
                  {(props.cusOption && props.cusOption(option, index)) ?? (
                    <>
                      {option.prefixIcon && option.prefixIcon}
                      {option.label}
                      {option.suffixIcon && option.suffixIcon}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-150 relative">
            <NoData />
          </div>
        )
      }
    >
      <div
        ref={parentRef}
        id={props.triggerId}
        onClick={() => setOpen(true)}
        className={`w-fit flex-align-x justify-between rounded-8 hover:text-common-1 cursor-pointer duration-300 ${props.triggerClassName}`}
      >
        {/* current value */}
        {props.children(props.options.find((item) => item.value === props.value)!)}

        {/* icon: arrow */}
        {!hideDropArrow && <Svg name="arrow-down" className={`${dropArrowClassName}`} />}
      </div>
    </Popover>
  );
};
