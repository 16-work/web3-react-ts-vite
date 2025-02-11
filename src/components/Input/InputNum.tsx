import { useDebounce } from 'ahooks';

/** Props */
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' | 'onFocus'> {
  value: string | number;
  onChange: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  onFocus?: (newValue: string) => void;
}

/** Component */
export const InputNum = (props: Props) => {
  /** Params */
  const debouncedValue = useDebounce(formatInputLocaleString(props.value ?? ''), { wait: 10 }); // 防止中/日/韩输入法下，onChange多次触发导致格式化多次

  /* Template */
  return (
    <input
      {...props}
      className={`base-input ${props.className}`}
      value={debouncedValue}
      onChange={(e) => props.onChange && props.onChange(formatInputOnlyPositive(e.target.value.trim()))}
      onBlur={(e) => {
        props.onBlur && props.onBlur(formatInputOnlyPositive(e.target.value.trim()));
      }}
      onFocus={(e) => {
        props.onFocus && props.onFocus(formatInputOnlyPositive(e.target.value.trim()));
      }}
    />
  );
};

/** Functions */
const formatInputLocaleString = (str: string | number) => {
  if (!str) return str;

  str = String(str);

  // 获取整数部分
  const [integralPart, _] = str.split('.');
  const intPart = integralPart.replace(/\B(?=(\d{3})+$)/g, ',');

  // 获取小数部分
  const decPart = str.slice(integralPart.length, str.length);

  // 拼接
  return intPart + decPart;
};

const formatInputOnlyPositive = (str: string) => {
  if (!str) return str;

  // 移除所有非数字字符，除了小数点
  str = str.replace(/[^\d.]/g, '');

  // 移除多余的小数点
  const parts = str.split('.');
  if (parts.length > 2) {
    str = parts[0] + '.' + parts.slice(1).join('');
  }

  return str;
};
