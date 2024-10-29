/** Props */
interface Props {
  label?: string;
  value: boolean;
  setValue: (bool: boolean) => void;
  className?: string;
}

/** Component */
export const CheckBox = (props: Props) => {
  /** Template */
  return (
    <span className={`flex items-center cursor-pointer select-none ${props.className}`} onClick={() => props.setValue(!props.value)}>
      <Svg name={props.value ? 'check-true' : 'check-false'} className={`w-26 ${props.value ? 'text-second-3' : 'text-common-1'}`} />
      <span className={`mt-2 text-20 ${props.value ? 'text-second-3' : 'text-common-1'}`}>{props.label}</span>
    </span>
  );
};
