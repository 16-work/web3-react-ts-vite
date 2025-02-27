import IconDefaultToken from '@/assets/img/common/token-default.png';
import { useReactive } from 'ahooks';
import { Image as AImage } from 'antd';

/** Props */
interface Props {
  src: string;
  /** 注：1.至少要有w；2.最好加上h或aspect属性，否则加载时高度会为0 */
  className: string;

  preview?: boolean; // 是否预览
  defaultImg?: string | 'empty' | 'token'; // 默认图片
  skeletonType?: 'light' | 'dark'; // 骨架屏样式类型
  hideSkeleton?: boolean; // 是否隐藏骨架屏
  alt?: string;
}

/** Component */
export const Img = (props: Props) => {
  /** Retrieval */
  const { theme } = store.global();

  /** Params */
  const { defaultImg, hideSkeleton, className, skeletonType, ...aImgProps } = props;

  const state = useReactive({
    isLoading: true,
    isError: false,
  });

  const defaultImgURL = useMemo(() => {
    if (!props.defaultImg || props.defaultImg === 'empty') return '';
    else if (props.defaultImg === 'token') return IconDefaultToken;
    else return props.defaultImg;
  }, [props.defaultImg]);

  const sizeClassName = useMemo(() => {
    // 读取w、h、rounded相关属性
    return props.className.match(/\b(w|h|absolute|reactive|fixed|m|rounded|shadow|aspect-square)\S*/g)?.join(' ');
  }, [props.className]);

  const skeleton = useMemo(() => {
    const type = (props.skeletonType ?? theme.search('light') !== -1) ? 'dark' : 'light';
    return `skeleton-${type}`;
  }, [props.skeletonType, theme]);

  /** Template */
  return (
    <>
      {/* img: empty */}
      {!state.isLoading && !defaultImgURL && state.isError && (
        <span
          className={`inline-block shrink-0 bg-transparent
            ${sizeClassName} 
          `}
        ></span>
      )}

      {/* img */}
      {(!state.isError || (state.isError && defaultImgURL)) && (
        <AImage
          {...aImgProps}
          rootClassName={state.isLoading ? `inline-block shrink-0 ${skeleton} ${sizeClassName}` : props.className}
          className={state.isLoading ? 'hidden' : 'w-full !h-full'}
          preview={props.preview ?? false}
          fallback={defaultImgURL}
          onLoad={() => {
            state.isLoading = false;
          }}
          onError={() => {
            state.isLoading = false;
            state.isError = true;
          }}
        />
      )}
    </>
  );
};
