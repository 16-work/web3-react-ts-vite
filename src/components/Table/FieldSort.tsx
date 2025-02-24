import { ORDER } from '@/types/common';
import { ReactNode } from 'react';

/** Props */
interface Props {
  label: ReactNode;
  isShowSortIcon: boolean;
  sort?: ORDER;
  onSort: (sort?: ORDER) => void;
}

/** Component */
export const FieldSort = (props: Props) => {
  /** Template */
  return (
    <div
      className="flex-align-x"
      onClick={() => {
        props.isShowSortIcon && props.onSort(props.sort === ORDER.ASC ? undefined : props.sort === ORDER.DESC ? ORDER.ASC : ORDER.DESC);
      }}
    >
      {/* label */}
      {typeof props.label === 'string' ? (
        <span className={`select-none whitespace-nowrap ${props.isShowSortIcon ? 'cursor-pointer' : ''}`}>{props.label}</span>
      ) : (
        props.label
      )}

      {/* icon: sort */}
      {props.isShowSortIcon && (
        <div className="h-18 relative ml-5">
          <Svg
            name="sort-asc"
            className={`w-10 absolute top-0 left-0 cursor-pointer ${props.sort === ORDER.ASC ? 'text-primary-2' : 'text-common-1'}`}
            onClick={(e) => {
              e.stopPropagation();
              props.onSort(ORDER.ASC);
            }}
          />

          <Svg
            name="sort-desc"
            className={`w-10 absolute bottom-0 left-0 cursor-pointer ${props.sort === ORDER.DESC ? 'text-primary-2' : 'text-common-1'}`}
            onClick={(e) => {
              e.stopPropagation();
              props.onSort(ORDER.DESC);
            }}
          />
        </div>
      )}
    </div>
  );
};
