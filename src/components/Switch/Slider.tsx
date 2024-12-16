import { Slider as ASlider } from 'antd';
import { SliderBaseProps } from 'antd/es/slider';

/** Props */
interface Props extends Omit<SliderBaseProps, 'type'> {
  type?: 'default' | 'percentage';
}

/** Component */
export const Slider = (props: Props) => {
  /** Retrieval */

  /** Params */
  const type = props.type ?? 'default';

  /** Actions */
  const formatter = (v?: number) => {
    switch (type) {
      case 'percentage':
        return `${v ?? 0}%`;
      default:
        return v;
    }
  };

  /** Template */
  return (
    <ASlider
      {...props}
      tooltip={{
        formatter,
      }}
    />
  );
};
