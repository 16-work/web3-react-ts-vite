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
      <div className="inline-block xs:w-120 md:w-150 xs:h-100 md:h-120 relative overflow-hidden">
        <Lottie name="no-data" className="w-full absolute position-center -mt-10" />
      </div>

      {/* tip */}
      <span className="text-tip-1 font-lg">{tip}</span>

      {/* extra */}
      {props.extra && props.extra}
    </div>
  );
};
