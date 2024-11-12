import { Option } from '@/types/common';
import { ReactNode } from 'react';

/** Props */
interface Props {
  value: any;
  options: Option[];
  onSwitch: (tab: any) => void;
  panels: Record<any, ReactNode>;

  tabClassname?: string;
}

/** Component */
export const TabPanels = (props: Props) => {
  /** Params */
  const state = ahooks.reactive({
    colWidth: 0,
    colHeight: 0,
  });
  const colItemRef = useRef<HTMLDivElement>(null);

  const activeIndex = useMemo(() => {
    const index = props.options.findIndex((item) => item.value === props.value);
    return index;
  }, [props.value]);

  /** Actions */
  useEffect(() => {
    // 等组件完全挂载后再获取宽高
    setTimeout(() => {
      state.colWidth = colItemRef.current?.offsetWidth ?? 0;
      state.colHeight = colItemRef.current?.offsetHeight ?? 0;
    }, 100);
  }, [colItemRef.current?.offsetWidth, colItemRef.current?.offsetHeight]);

  /** Template */
  return (
    <div>
      {/* tabs */}
      <div className="w-fit relative p-6 rounded-8">
        {/* active bg */}
        <div
          className="absolute position-center-v z-0 bg-primary-1 rounded-8 duration-300"
          style={{ width: state.colWidth, height: state.colHeight, left: activeIndex * state.colWidth + 5 }}
        ></div>

        {/* list */}
        <div
          className={`relative z-[1] grid`}
          style={{
            gridTemplateColumns: `repeat(${props.options.length}, minmax(0, 1fr))`,
          }}
        >
          {props.options.map((item, index) => (
            // item
            <div
              key={index}
              ref={index === 0 ? colItemRef : null}
              className={`flex-align-x justify-center px-26 py-4 rounded-8 xs:text-20 md:text-18 duration-300 cursor-pointer whitespace-nowrap
              ${props.tabClassname}
              ${item.value === props.value ? 'text-common-1' : 'text-tip-1'}    
            `}
              onClick={() => props.onSwitch(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* panels */}
      {Object.entries(props.panels).filter((item) => item[0] === String(props.value))[0][1]}
    </div>
  );
};
