import { CSSProperties } from 'react';
import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars-2';

/** Props */
interface Props extends ScrollbarProps {
  minHeight?: number;
  maxHeight?: number;
  static?: boolean;
}

/** Component */
export const Scrollbar = (props: Props) => {
  /** Retrieval */
  const { isPC } = store.global();

  /** Params */
  const { static: isStatic, minHeight, maxHeight, ...scrollbarProps } = props;

  // 滚动条样式
  const renderThumb = () => {
    return (
      <div
        className={`rounded-4 cursor-pointer
          ${isPC ? 'bg-white/20' : 'bg-transparent'}
        `}
      />
    );
  };

  // y轴滑轨样式
  const renderThumbVertical = ({ style, ...props }: { style: CSSProperties }) => {
    const thumbStyle = {
      ...style,
      position: 'relative',
      marginLeft: '6px',
    } as CSSProperties;
    return <div style={thumbStyle} {...props} />;
  };

  // 可视窗口样式
  const renderView = ({ style, ...viewProps }: { style: CSSProperties }) => {
    const viewStyle: CSSProperties = props.static ? { flex: 1, ...style } : { ...style };
    return <div {...viewProps} style={viewStyle} />;
  };

  /** Template */
  return (
    <Scrollbars
      {...scrollbarProps}
      className={`${props.className} 
        ${props.static ? 'flex' : ''}
      `}
      autoHeight={props.autoHeight ?? true}
      autoHeightMin={minHeight ? tools.pxToRem(minHeight) : undefined}
      autoHeightMax={maxHeight ? tools.pxToRem(maxHeight) : undefined}
      renderThumbVertical={renderThumb}
      renderThumbHorizontal={renderThumb}
      renderView={renderView}
      renderTrackVertical={props.static && isPC ? renderThumbVertical : undefined}
      style={{ right: '-2px' }}
      autoHide={props.autoHide ?? !isPC} // 移动端滚完就隐藏
    >
      {props.children}
    </Scrollbars>
  );
};
