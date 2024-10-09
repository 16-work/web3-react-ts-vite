/** Props */
interface Props {
  children: React.ReactNode;
  paddingY?: string; // 盒子有圆角边框时可以防止滚动条被遮挡
  className?: string;
}

/** Component
 * 高度撑满父元素 的盒子(父元素为flex布局时生效)
 * 内部元素高度超过盒子高度时，盒子内部可滚动
 */
export const BoxFill = (props: Props) => {
  /** Template */
  return (
    <div className={`flex-1 overflow-hidden ${props.paddingY} ${props.className}`}>
      <div className="w-full h-full overflow-auto">{props.children}</div>
    </div>
  );
};
