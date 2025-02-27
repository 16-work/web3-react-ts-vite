import { DEFAULT_THEME } from '@/constants/common';

/** Props */
interface Props {
  className: string;
  skeletonType?: 'light' | 'dark';
}

/** Component */
export const Skeleton = (props: Props) => {
  const skeletonType = useMemo(() => {
    const type = (props.skeletonType ?? DEFAULT_THEME.search('light') !== -1) ? 'dark' : 'light';
    return `skeleton-${type}`;
  }, [props.skeletonType]);

  /** Template */
  return <div className={`${skeletonType} ${props.className}`}></div>;
};
