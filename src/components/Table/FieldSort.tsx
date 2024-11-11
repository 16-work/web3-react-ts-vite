import { ReactNode } from 'react';

/** Props */
interface Props {
  label: ReactNode;
  isShowSortIcon: boolean;
  sort: 'asc' | 'desc' | '';
  onSort: (sort: 'asc' | 'desc' | '') => void;
}

/** Component */
export const FieldSort = (props: Props) => {
  /** Template */
  return (
    <div
      className="flex-align-x"
      onClick={() => {
        props.isShowSortIcon && props.onSort(props.sort === 'asc' ? 'desc' : props.sort === 'desc' ? '' : 'asc');
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
        <div className="relative h-18 ml-5">
          <Svg
            name="sort-asc"
            className={`w-10 absolute top-0 left-0 cursor-pointer ${props.sort === 'asc' ? 'text-primary-2' : 'text-common-1'}`}
            onClick={(e) => {
              e.stopPropagation();
              props.onSort('asc');
            }}
          />

          <Svg
            name="sort-desc"
            className={`w-10 absolute bottom-0 left-0 cursor-pointer ${props.sort === 'desc' ? 'text-primary-2' : 'text-common-1'}`}
            onClick={(e) => {
              e.stopPropagation();
              props.onSort('desc');
            }}
          />
        </div>
      )}
    </div>
  );
};
