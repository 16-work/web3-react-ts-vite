import { Image as AImage } from 'antd';
import IconDefaultToken from '@/assets/img/common/token-default.png';

/** Props */
interface Props {
  src: string;
  className?: string;
  preview?: boolean;
  defaultImg?: 'empty' | 'token';
  hideSkeleton?: boolean;
  alt?: string;
}

/** Component */
export const Img = (props: Props) => {
  /** Params */
  const { defaultImg: defaultImgType, hideSkeleton, className, ...aImgProps } = props;

  const state = ahooks.reactive({
    isLoading: true,
    isError: false,
  });

  const defaultImg = useMemo(() => {
    if (!props.defaultImg || props.defaultImg === 'empty') return 'empty';
    else if (props.defaultImg === 'token') return IconDefaultToken;
  }, [props.defaultImg]);

  const sizeClassName = useMemo(() => {
    // 读取w、h、rounded相关属性
    return props.className?.match(/\b(w|h|m|rounded)\S*/g)?.join(' ');
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
      {!state.isLoading && defaultImg === 'empty' && state.isError && (
        <span
          className={`inline-block shrink-0 bg-transparent
            ${sizeClassName} 
          `}
        ></span>
      )}

      {/* img */}
      <AImage
        {...aImgProps}
        rootClassName={state.isLoading ? 'w-0 h-0' : props.className}
        className={state.isLoading ? 'hidden' : 'w-full !h-full'}
        preview={props.preview ?? false}
        fallback={defaultImg}
        onLoad={() => (state.isLoading = false)}
        onError={() => {
          state.isLoading = false;
          state.isError = true;
        }}
      />
    </>
  );
};
