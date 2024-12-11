import { Option } from '@/types/common';

const styleType = {
  base: {
    box: 'w-fit p-5 border rounded-full',
    initOffset: 5,
    list: '',
    tab: 'px-65 py-6 rounded-full text-black font-xl',
    activeBg: 'bg-primary-1 rounded-full',
    activeTab: '!text-common-1',
  },
  second: {
    box: '',
    initOffset: 0,
    list: '',
    tab: '',
    activeBg: 'bg-primary-1',
    activeTab: '',
  },
};

/** Props */
interface Props {
  value: any;
  options: Option[];
  onSwitch: (tab: any) => void;

  styleType?: keyof typeof styleType;
  itemClassname?: string;
}

/** Component */
export const Tabs = (props: Props) => {
  /** Params */
  const type = props.styleType ?? 'base';

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
    <div className={`w-fit relative ${styleType[type].box}`}>
      {/* active bg */}
      <div
        className={`absolute position-center-v z-0 duration-300 ${styleType[type].activeBg}`}
        style={{ width: state.colWidth, height: state.colHeight, left: activeIndex * state.colWidth + styleType[type].initOffset }}
      ></div>

      {/* list */}
      <div
        className={`relative z-[1] grid ${styleType[type].list}`}
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
              ${styleType[type].tab}
              ${props.itemClassname}
              ${item.value === props.value && styleType[type].activeTab}    
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
