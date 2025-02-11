import { useDebounceFn } from 'ahooks';
import { CSSProperties } from 'react';
import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars-2';

/** Props */
interface Props extends ScrollbarProps {
  minHeight?: number;
  maxHeight?: number;
  static?: boolean;
  onHitBottom?: (isHitBottom: boolean) => void;
}

/** Component */
export const Scrollbar = (props: Props) => {
  /** Retrieval */
  const { isPC } = store.global();

  /** Params */
  const { static: isStatic, minHeight, maxHeight, onHitBottom, ...scrollbarProps } = props;
  const refScrollBar = useRef<any>(null);

  /** Actions */
  // 触底检测
  const { run: onScroll } = useDebounceFn(
    () => {
      if (onHitBottom) {
        const scrollTop = refScrollBar.current.getScrollTop();
        const scrollHeight = refScrollBar.current.getScrollHeight();
        const clientHeight = refScrollBar.current.getClientHeight();
        const offset = 300; // 页脚高度 + 偏移量

        const isHitBottom = scrollTop + clientHeight + offset >= scrollHeight;
        onHitBottom(isHitBottom);

        // 复位
        if (isHitBottom) {
          setTimeout(() => {
            onHitBottom(false);
          }, 1);
        }
      }
    },
    { wait: 50 }
  );

  // 滚动条样式
  const renderThumb = (type: 'x' | 'y') => {
    const baseClassName = type === 'y' ? 'w-4 !-right-4' : 'h-4 !-bottom-4';

    return (
      <div
        className={`${baseClassName} relative rounded-4 cursor-pointer 
          ${isPC ? 'bg-[var(--cus-scrollbar)]' : 'bg-transparent'}
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
      universal={true}
      className={`${props.className} 
        ${props.static ? 'flex' : ''}
      `}
      autoHeight={props.autoHeight ?? false}
      autoHeightMin={minHeight ? tools.pxToRem(minHeight) : undefined}
      autoHeightMax={maxHeight ? tools.pxToRem(maxHeight) : undefined}
      renderThumbVertical={() => renderThumb('y')}
      renderThumbHorizontal={() => renderThumb('x')}
      renderView={renderView}
      renderTrackVertical={props.static && isPC ? renderThumbVertical : undefined}
      autoHide={props.autoHide ?? !isPC} // 移动端滚完就隐藏
      ref={refScrollBar}
      onScroll={(e) => {
        props.onScroll && props.onScroll(e);
        onScroll();
      }}
    >
      {props.children}
    </Scrollbars>
  );
};
