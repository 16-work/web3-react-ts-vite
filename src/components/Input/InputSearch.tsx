import { useState, useEffect } from 'react';

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

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

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

  // 防抖
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    state.value = newValue;
    props.onChange && props.onChange(newValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        props.onSearch && props.onSearch(newValue);
      }, 300)
    );
  };

  /** Template */
  return (
    <div className={`group relative flex-align-x gap-x-12 ${props.className}`}>
      {/* icon: search */}
      <Svg
        name="search"
        className="w-32 text-tip-1 group-hover:text-primary-1 cursor-pointer duration-300"
        onClick={() => props.onSearch && props.onSearch(state.value)}
      />

      {/* input */}
      <input
        className="base-input flex-1 h-full"
        placeholder={props.placeholder}
        value={state.value}
        onChange={onChange}
        onFocus={() => (state.isFocus = true)}
        onBlur={() => (state.isFocus = false)}
      />
    </div>
  );
};
