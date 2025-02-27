/** Props */
interface Props {
  className: string;
  skeletonType?: 'light' | 'dark';
}

/** Component */
export const Skeleton = (props: Props) => {
  /** Retrieval */
  const { theme } = store.global();

  /** Params */
  const skeletonType = useMemo(() => {
    const type = (props.skeletonType ?? theme.search('light') !== -1) ? 'dark' : 'light';
    return `skeleton-${type}`;
  }, [props.skeletonType, theme]);

  /** Template */
  return <div className={`${skeletonType} ${props.className}`}></div>;
};
