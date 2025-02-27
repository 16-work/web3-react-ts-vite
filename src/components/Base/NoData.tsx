import { ReactNode } from 'react';

const styleType = {
  base: {
    box: '',
    iconSize: 'xs:w-120 md:w-150 xs:h-100 md:h-120',
    tip: 'text-tip-1 font-lg',
  },
};

/** Props */
interface Props {
  type?: keyof typeof styleType;
  tip?: string; // 底部提示文本
  extra?: ReactNode; // 底部额外信息
}

/** Component
 * 注意：需要父元素有relative属性才能居中
 */
export const NoData = (props: Props) => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Params */
  const tip = props.tip ?? t('tip.noData');
  const className = styleType[props.type ?? 'base'];

  /** Template */
  return (
    <div className={`absolute z-0 position-center flex-align-y ${className.box}`}>
      {/* icon */}
      <div className={`inline-block relative overflow-hidden ${className.iconSize}`}>
        <Lottie name="no-data" className="w-full absolute position-center" />
        {/* <Img src={img} className="w-full absolute position-center" /> */}
      </div>

      {/* tip */}
      <span className={`${className.tip}`}>{tip}</span>

      {/* extra */}
      {props.extra && props.extra}
    </div>
  );
};
