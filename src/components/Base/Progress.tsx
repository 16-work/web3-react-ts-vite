import { Progress as AProgress, ProgressProps } from 'antd';

// 边框只能用scss改，antd没对外暴露

const styleType = {
  base: {
    height: 'h-6',
    bgColor: 'rgb(var(--cus-gray-100))',
    progressColor: 'rgb(var(--cus-primary-1))',
  },
};

/** Props */
interface Props extends Omit<ProgressProps, 'percent' | 'strokeColor' | 'trailColor' | 'type'> {
  percent: number | string;

  type?: keyof typeof styleType;
}

/** Component */
export const Progress = (props: Props) => {
  /** Retrieval */

  /** Params */
  const { type = 'base', ...params } = props;

  /** Actions */

  /** Template */
  return (
    <AProgress
      {...params}
      percent={Number(props.percent)}
      strokeColor={styleType[type].progressColor}
      trailColor={styleType[type].bgColor}
      showInfo={false}
      className={`${styleType[type].height} ${props.className}`}
    />
  );
};
