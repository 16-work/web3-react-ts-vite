import AnimatedNumber from 'animated-number-react';

/** Props */
interface Props {
  value: number;
  decimal?: number;
  className?: string;
}

/** Component */
export const AnimationNum = (props: Props) => {
  /** Params */
  const state = ahooks.reactive({
    isInit: false,
  });

  /** Actions */
  // 防止初始化时随机归零bug
  useEffect(() => {
    if (!state.isInit && props.value) state.isInit = true;
  }, [props.value]);

  // 格式化
  const formatValue = (value: number) => {
    // 整数
    if (!props.decimal) {
      const [integralPart, _] = value.toString().split('.');
      const intPart = integralPart.replace(/\B(?=(\d{3})+$)/g, ',');
      return intPart;
    }

    // 小数
    return format.bignum(value, props.decimal);
  };

  /** Template */
  return <span className={props.className}>{state.isInit ? <AnimatedNumber value={props.value} formatValue={formatValue} duration={500} /> : '0'}</span>;
};
