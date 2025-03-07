import { Option } from '@/types/common';

const styleType = {
  base: {
    box: 'w-fit p-5 border rounded-full',
    initOffset: 5,
    list: '',
    tab: 'px-65 py-6 text-black font-xl',
    activeTab: '!text-common-1',

    hr: '',
    activeBlock: 'bg-primary-1 rounded-full',
  },
  second: {
    box: '',
    initOffset: 0,
    list: '',
    tab: '',
    activeTab: '',

    hr: 'border-l border-black',
    activeBlock: 'bg-primary-1',
  },
};

/** Props */
interface Props {
  value: any;
  options: Option[];
  onSwitch: (tab: any) => void;

  type?: keyof typeof styleType;
  tabClassname?: string;
}

/** Component */
export const Tabs = (props: Props) => {
  /** Params */
  const className = styleType[props.type ?? 'base'];

  const state = useReactive({
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
    <div className={`w-fit relative ${className.box}`}>
      {/* active bg */}
      <div
        className={`absolute position-center-v z-0 duration-300 ${className.activeBlock}`}
        style={{ width: state.colWidth, height: state.colHeight, left: activeIndex * state.colWidth + className.initOffset }}
      ></div>

      {/* list */}
      <div
        className={`relative z-[1] grid ${className.list}`}
        style={{
          gridTemplateColumns: `repeat(${props.options.length}, minmax(0, 1fr))`,
        }}
      >
        {props.options.map((item, index) => (
          // item
          <div
            key={index}
            ref={index === 0 ? colItemRef : null}
            className={`flex-align-x justify-center duration-300 cursor-pointer whitespace-nowrap
              ${className.tab}
              ${props.tabClassname}
              ${index !== 0 && className.hr}
              ${item.value === props.value && className.activeTab}    
            `}
            onClick={() => props.onSwitch(item.value)}
          >
            {item.prefixIcon && item.prefixIcon}
            {item.label}
            {item.suffixIcon && item.suffixIcon}
          </div>
        ))}
      </div>
    </div>
  );
};
