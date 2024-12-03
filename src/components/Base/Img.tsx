import { Image as AImage } from 'antd';
import IconDefaultToken from '@/assets/img/common/token-default.png';

/** Props */
interface Props {
  src: string;
  className: string;

  preview?: boolean; // 是否预览
  defaultImg?: string | 'empty' | 'token'; // 默认图片
  hideSkeleton?: boolean; // 是否隐藏骨架屏
  alt?: string;
}

/** Component */
export const Img = (props: Props) => {
  /** Params */
  const { defaultImg, hideSkeleton, className, ...aImgProps } = props;

  const state = ahooks.reactive({
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
    return props.className.match(/\b(w|h|m|rounded|shadow)\S*/g)?.join(' ');
  }, [props.className]);

  /** Template */
  return (
    <>
      {/* loading */}
      {state.isLoading && (
        <span
          className={`inline-block shrink-0 
          ${sizeClassName} 
          ${state.isLoading && !hideSkeleton ? 'skeleton' : ''}`}
        ></span>
      )}

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
          rootClassName={state.isLoading ? 'w-0 h-0' : props.className}
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
