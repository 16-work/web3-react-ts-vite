import { ReactNode } from 'react';

/** Props */
interface Props {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Component */
export const TCol = (props: Props) => {
  /** Retrieval */
  const { isPC } = store.global();

  /** Template */
  return (
    <div className={`flex xs:flex-col md:flex-row justify-center xs:items-start md:items-center ${props.className}`}>
      {/* mobile label */}
      {!isPC && <span className="mb-2 text-base text-tip-1 whitespace-nowrap">{props.label}</span>}

      {/* value */}
      {props.children}
    </div>
  );
};
