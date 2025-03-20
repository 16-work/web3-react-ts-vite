import BigNumber from 'bignumber.js';

/** Props */
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' | 'onFocus' | 'max' | 'min'> {
  value: string | number;
  onChange: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  onFocus?: (newValue: string) => void;
  max?: string | number | BigNumber;
  min?: string | number | BigNumber;
  isInt?: boolean;
}

/** Component */
export const InputNum = (props: Props) => {
  /** Params */
  const { max, min, isInt = false, ...params } = props;

  /** Actions */
  const getValue = (v: string) => {
    let value = formatInputOnlyPositive(v.trim(), isInt);
    if (props.max && BigNumber(value).gt(props.max)) value = formatInputOnlyPositive(String(props.max), isInt);
    if (props.min && BigNumber(value).lt(props.min)) value = formatInputOnlyPositive(String(props.min), isInt);
    return value;
  };

  /* Template */
  return (
    <input
      {...params}
      className={`base-input ${props.className}`}
      value={formatInputLocaleString(props.value ?? '')}
      onChange={(e) => {
        props.onChange && props.onChange(getValue(e.target.value));
      }}
      onBlur={(e) => {
        props.onBlur && props.onBlur(getValue(e.target.value));
      }}
      onFocus={(e) => {
        props.onFocus && props.onFocus(getValue(e.target.value));
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

const formatInputOnlyPositive = (str: string, isInt: boolean) => {
  if (!str) return str;

  // 移除所有非数字字符
  if (isInt) {
    str = str.replace(/\D/g, '');
  }
  // 移除除小数点外所有非数字字符
  else {
    str = str.replace(/[^\d.]/g, '');

    // 移除多余的小数点
    const parts = str.split('.');
    if (parts.length > 2) {
      str = parts[0] + '.' + parts.slice(1).join('');
    }
  }

  return str;
};
