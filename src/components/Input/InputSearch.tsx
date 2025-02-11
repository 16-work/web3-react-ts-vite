/** Props */
interface Props {
  value: string;
  onChange?: (newValue: string) => void;
  onSearch?: (newValue: string) => void;
  placeholder?: string;
  className?: string;
}

/** Component */
export const InputSearch = (props: Props) => {
  /** Params */
  const state = useReactive({
    isFocus: false,
    value: props.value,
  });

  /** Actions */
  // 同步值
  useEffect(() => {
    state.value = props.value;
  }, [props.value]);

  // 聚焦时按回车键时搜索
  useUpdateEffect(() => {
    const onEnterPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') props.onSearch && props.onSearch(state.value);
    };

    if (state.isFocus) window.addEventListener('keydown', onEnterPress);
    else window.removeEventListener('keydown', onEnterPress);

    return () => window.removeEventListener('keydown', onEnterPress);
  }, [state.isFocus]);

  /** Template */
  return (
    <div className={`relative ${props.className}`}>
      {/* input */}
      <input
        className="input-1 w-full h-full pl-10 pr-40"
        placeholder={props.placeholder}
        value={state.value}
        onChange={(e) => {
          state.value = e.target.value;
          props.onChange && props.onChange(e.target.value);
        }}
        onFocus={() => (state.isFocus = true)}
        onBlur={() => (state.isFocus = false)}
      />

      {/* icon: search */}
      <Svg
        name="search"
        className="w-20 absolute top-1/2 -translate-y-1/2 right-10 text-tip hover:text-primary cursor-pointer duration-300"
        onClick={() => props.onSearch && props.onSearch(state.value)}
      />
    </div>
  );
};
