/** Props */
interface Props {
  value: string;
  onChange: (newValue: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

/** Component */
export const InputSearch = (props: Props) => {
  /** Params */
  const state = ahooks.reactive({
    isFocus: false,
  });

  /** Actions */
  // 聚焦时按回车键时搜索
  ahooks.updateEffect(() => {
    const onEnterPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') props.onSearch();
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
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => (state.isFocus = true)}
        onBlur={() => (state.isFocus = false)}
      />

      {/* icon: search */}
      <Svg
        name="search"
        className="w-20 absolute top-1/2 -translate-y-1/2 right-10 text-tip hover:text-primary cursor-pointer duration-300"
        onClick={props.onSearch}
      />
    </div>
  );
};
