import { Slider as ASlider } from 'antd';
import { SliderBaseProps } from 'antd/es/slider';

const styleType = {
  base: {
    track: 'h-12 border-2 bg-white rounded-full',
    handle: '!w-24 !h-24 border-2 bg-white rounded-full',
    activeArea: '!bg-primary-1',
  },
};

/** Props */
interface Props extends Omit<SliderBaseProps, 'type'> {
  styleType?: keyof typeof styleType;
  valueType?: 'default' | 'percentage';
}

/** Component */
export const Slider = (props: Props) => {
  /** Retrieval */

  /** Params */
  const className = styleType[props.styleType ?? 'base'];
  const valueType = props.valueType ?? 'default';

  /** Actions */
  const formatter = (v?: number) => {
    switch (valueType) {
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
      classNames={{
        root: className.track,
        handle: className.handle,
        track: className.activeArea,
      }}
    />
  );
};
