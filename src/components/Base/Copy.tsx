import { ReactNode } from 'react';

/** Props */
interface Props {
  children: ReactNode;
  text: string;
  className?: string;
  iconClassName?: string;
}

/** Component */
export const Copy = (props: Props) => {
  /** Params */
  const iconClassName = useMemo(() => {
    // 未设置width时使用默认size
    const regex = /\bw-(\d+|auto|full|screen)\b/;
    if (regex.test(props.iconClassName + '')) return props.iconClassName;
    else return props.iconClassName + ' xs:w-26 md:w-18';
  }, [props.iconClassName]);

  /** Template */
  return (
    <div className={`flex-align-x ${props.className}`}>
      {props.children}

      <Svg
        name="copy"
        className={`-mt-2 hover-primary ${iconClassName}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          tools.copy(props.text);
        }}
      />
    </div>
  );
};
