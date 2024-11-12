/** Component
 * 需要父元素有relative属性才能居中
 */
export const Loading = () => {
  /** Template */
  return (
    <span className="absolute position-center">
      <Svg name="spin" className="w-28 text-primary-1 animate-spin origin-center" />
    </span>
  );
};
