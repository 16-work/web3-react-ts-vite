import { ReactNode } from 'react';

/** Props */
interface Props {
  label: string;
  labelExtra?: ReactNode;
  value: boolean;
  setValue: (bool: boolean) => void;
  className?: string;
}

/** Component */
export const Radio = (props: Props) => {
  /** Template */
  return (
    <span className={`flex items-center cursor-pointer select-none ${props.className}`} onClick={() => props.setValue(!props.value)}>
      {/* icon */}
      <span
        className={`w-18 h-18 relative -mt-3 border rounded-full duration-300
          ${props.value ? 'border-second-300' : 'border-gray-100'}
        `}
      >
        <span
          className={`w-10 h-10 absolute position-center rounded-full duration-300
            ${props.value ? 'bg-second-300' : 'bg-transparent'}
          `}
        ></span>
      </span>

      {/* label */}
      <span
        className={`flex-align-x ml-6 font-lg thin duration-300
          ${props.value ? 'text-second-3' : 'text-common-1'}
        `}
      >
        {props.label} {props.labelExtra}
      </span>
    </span>
  );
};
