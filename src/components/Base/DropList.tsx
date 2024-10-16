import { Option } from '@/types/common';
import { Popover, PopoverProps } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { ReactNode } from 'react';

/** Props */
interface Props extends PopoverProps {
  children: JSX.Element;
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
          <div className="max-h-300 overflow-auto grid grid-cols-1">
            {props.options.map((option, index) => (
              <div
                onClick={() => {
                  props.onSelect(option.value);
                  setOpen(false);
                }}
                key={index}
                className={`hover-primary px-20 font-base 
                    ${props.value === option.value || props.value === option ? 'bg-primary-1 !text-common-1' : ''}
                    ${index === 0 ? '' : 'border-t-2 border-gray-800'}
                  `}
              >
                {/* hr */}
                {index !== 0 && <div className="gradient-hr-1 w-full h-2"></div>}

                {/* option */}
                <span className={`block w-full group py-10 `}>{(props.cusOption && props.cusOption(option, index)) ?? option.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative h-150">
            <NoData />
          </div>
        )
      }
    >
      <div
        ref={parentRef}
        id={props.triggerId}
        onClick={() => setOpen(true)}
        className={`w-fit flex-align-x justify-between rounded-8 cursor-pointer hover:text-common-1 duration-300 ${props.triggerClassName}`}
      >
        {/* current value */}
        {props.children}

        {/* icon: arrow */}
        {!hideDropArrow && <Svg name="arrow-down" className={`${dropArrowClassName}`} />}
      </div>
    </Popover>
  );
};
