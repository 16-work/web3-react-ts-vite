import { useDropzone } from 'react-dropzone';
import { useReactive } from 'ahooks';
import ImgUpload from '@/assets/img/common/upload-img.png';

/** Props */
interface Props {
  img: string;
  setImg: (base64: string) => void;
  uploadType?: 'single' | 'multi';
  accept?: { [p: string]: any };
  className?: string;
  maxSize?: number;
}

/** Component */
export const UploadImg = (props: Props) => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Params */
  const {
    uploadType = 'single',
    accept = {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'image/svg': ['.svg'],
    },
    maxSize: maxSize = 10 * 1024 * 1024,
  } = props;

  const state = useReactive({
    isLoading: false,
  });

  /** Actions */
  const onDrop = (acceptedFiles: File[]) => {
    state.isLoading = true;

    try {
      if (uploadType === 'single') {
        const file = acceptedFiles[0];

        if (file.size > maxSize) {
          msg.error(`${t('tip.maxFileSize')} ${format.bytesSize(maxSize)}`);
          state.isLoading = false;
          return;
        }

        getBase64(file)
          .then(async (base64: string) => {
            if (!(await hooks.wallet.verify())) return;

            const res = await api.common.upload({
              contentType: acceptedFiles[0].type,
              imageBase64: base64.split(',')[1],
            });

            props.setImg(res);
          })
          .catch((e: any) => {
            console.error(e);
          })
          .finally(() => {
            state.isLoading = false;
          });
      }
    } catch (e) {
      console.error(e);
      msg.error(t('tip.uploadFailed'));
      state.isLoading = false;
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

  /** Template */
  return (
    <div {...getRootProps()} className={`relative flex-align-y justify-center border-2 cursor-pointer ${props.className}`}>
      <input type={'file'} {...getInputProps()} />

      {props.img ? (
        // 图片
        <Img src={props.img ?? ImgUpload} className="w-fit h-full" defaultImg="token" />
      ) : (
        // 无图
        <div className="w-full h-full flex-align-y">
          <Img src={ImgUpload} className="xs:w-140 md:w-90 xs:h-140 md:h-90" />
          <span className="mt-12 text-common-1 font-lg">{t('tip.dragFile')}</span>
          <span className="text-tip-1 font-sm">{t('tip.fileType')}</span>
        </div>
      )}

      {/* 加载中 */}
      {state.isLoading && <Loading />}
    </div>
  );
};

/** Functions */
const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
