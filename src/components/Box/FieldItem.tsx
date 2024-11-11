import { ReactNode } from 'react';

/** Props */
interface Props {
  label: ReactNode;
  children: ReactNode;

  errorMsg?: string;
  extra?: ReactNode;
  className?: string;
}

/** Component */
export const FieldItem = (props: Props) => {
  /** Template */
  return (
    <div className={`${props.className}`}>
      {/* top */}
      <div className="flex-align-x justify-between mb-5">
        {/* label */}
        <span className="flex-align-x text-common-1 font-base whitespace-nowrap">{props.label}</span>

        {/* extra */}
        {props.extra}

        {/* error */}
        {props.errorMsg && <span className="ml-10 text-stress-1 font-sm text-right">{props.errorMsg}</span>}
      </div>

      {/* bottom */}
      {props.children}
    </div>
  );
};
