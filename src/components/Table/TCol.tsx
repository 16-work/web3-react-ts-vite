import { ReactNode } from 'react';

/** Props */
interface Props {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  alwaysFullyDisplay?: boolean;
}

/** Component */
export const TCol = (props: Props) => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Template */
  return (
    <div
      className={`flex justify-center xs:items-start md:items-center ${props.alwaysFullyDisplay ? 'flex-row' : 'xs:flex-col md:flex-row'} ${props.className}`}
    >
      {/* mobile label */}
      {screenType < SCREEN.MD && !props.alwaysFullyDisplay && <span className="mb-2 text-base text-tip-1 whitespace-nowrap">{props.label}</span>}

      {/* value */}
      {props.children}
    </div>
  );
};
