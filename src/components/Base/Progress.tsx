import { Progress as AProgress, ProgressProps } from 'antd';

const styleType = {
  base: {
    height: 'h-6',
    bgColor: 'rgb(var(--cus-gray-100))',
    progressColor: 'rgb(var(--cus-primary-1))',
  },
};

/** Props */
interface Props {
  percent: number | string;

  type?: keyof typeof styleType;
}

/** Component */
export const Progress = (props: Props & Omit<ProgressProps, 'percent' | 'strokeColor' | 'trailColor'>) => {
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
