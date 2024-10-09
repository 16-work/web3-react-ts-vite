import { Modal as AModal } from 'antd';

/** Props */
interface Props {
  isShow: boolean;
  onClose: () => void; // 关闭事件
  onOk?: () => void; // 确认事件
  isLoading?: boolean; // 加载中
  disabled?: boolean; // 禁止确认

  title: React.ReactNode; // 输入字符串时会用默认样式
  width?: number; // 模态框宽度
  hideBodyPadding?: boolean; // 隐藏边距
  children: React.ReactNode;

  okText?: string; // 确认文本
  cancelText?: string; // 取消文本（无值不显示取消按钮）
  footer?: React.ReactNode; // 自定义底部
}

/** Component */
export const Modal = (props: Props) => {
  /** Params */
  const width = props.width ?? 550;
  const okText = props.okText || 'Confirm';

  /** Template */
  return (
    <AModal open={props.isShow} footer={null} onCancel={props.onClose} centered closeIcon={null} width={width}>
      {/* modal box */}
      <div
        className={`
          ${props.hideBodyPadding ? 'pt-30' : 'p-30'}
        `}
      >
        {/* header */}
        <div
          className={`flex items-center justify-between mb-20
            ${props.hideBodyPadding ? 'px-30' : ''}
          `}
        >
          {/* title */}
          <div className={typeof props.title === 'string' ? 'text-common-1 text-24' : ''}>{props.title}</div>

          {/* icon: close */}
          <Svg name="close" className="w-24 text-common-1 hover:text-primary-1 cursor-pointer duration-300" onClick={props.onClose} />
        </div>

        {/* body */}
        {props.children}

        {/* footer */}
        {props.footer ? (
          props.footer
        ) : (
          <div className="grid grid-cols-2 gap-x-20 text-20">
            {/* btn: cancel */}
            {props.cancelText && (
              <Button className="btn-second px-10 py-8 rounded-full font-2xl" onClick={props.onClose}>
                {props.cancelText}
              </Button>
            )}

            {/* btn: ok */}
            <Button
              className={`btn-primary flex justify-center items-center px-10 py-8 rounded-full font-xl
                ${props.cancelText ? '' : 'col-span-2'}
              `}
              isLoading={props.isLoading}
              disabled={props.disabled}
              onClick={props.onOk}
            >
              {okText}
            </Button>
          </div>
        )}
      </div>
    </AModal>
  );
};
