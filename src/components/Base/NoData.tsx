import { ReactNode } from 'react';

/** Component
 * 注意：需要父元素有relative属性才能居中
 */
export const NoData = (props: { tip?: string; extra?: ReactNode; className?: string }) => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Params */
  const tip = props.tip ?? t('tip.noData');

  /** Template */
  return (
    <div className={`absolute z-0 position-center flex-align-y ${props.className}`}>
      {/* icon */}
      <div className="relative inline-block xs:w-260 md:w-270 xs:h-140 md:h-160 overflow-hidden">
        <Lottie name="no-data" className="w-200 absolute position-center -mt-10" />
      </div>

      {/* tip */}
      <span className="text-tip-1 font-lg">{tip}</span>

      {/* extra */}
      {props.extra && props.extra}
    </div>
  );
};
