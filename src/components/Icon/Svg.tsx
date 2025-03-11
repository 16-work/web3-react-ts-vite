/** Props */
interface Props {
  name: string;
  className: string; // 长/宽/颜色都写这(未设置height时自动和width一致)

  color?: string;
  fill?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

/** Component */
export const Svg = (props: Props) => {
  /** Parmas */
  const className = useMemo(() => {
    return tools.getAutoHeightClassName(props.className);
  }, [props.className]);

  /** Template */
  return (
    <svg
      className={className}
      style={{
        color: props.color,
        flexShrink: 0,
        ...props.style,
      }}
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      <use xlinkHref={`#icon-${props.name}`} fill={props.fill || props.color} />
    </svg>
  );
};
