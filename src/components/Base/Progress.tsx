import { Progress as AProgress, ProgressProps } from 'antd';

/** Props */
interface Props {
  percent: number | string;

  currentColor?: string; // 进度条当前进度色
  bgColor?: string; // 进度条背景色
}

/** Component */
export const Progress = (props: Props & Omit<ProgressProps, 'percent' | 'strokeColor' | 'trailColor'>) => {
  /** Retrieval */

  /** Params */
  const currentColor = props.currentColor ?? 'rgb(var(--cus-primary-1))';
  const bgColor = props.bgColor ?? 'rgba(255, 255, 255 , 0.2)';

  /** Actions */

  /** Template */
  return <AProgress {...props} percent={Number(props.percent)} strokeColor={currentColor} trailColor={bgColor} showInfo={false} />;
};
