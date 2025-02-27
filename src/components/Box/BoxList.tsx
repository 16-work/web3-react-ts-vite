import { ReactNode } from 'react';

/** Props */
interface Props {
  children: ReactNode;

  page: number;
  pageSize: number;
  total: number;
  onChangePage: (page: number) => void;

  isInit: boolean;
  isLoading: boolean;

  className?: string;
}

/** Component */
export const BoxList = (props: Props) => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return (
    <div className={`relative box-data ${props.className}`}>
      {/* list */}
      {props.children}

      {/* pager */}
      <Pager page={props.page} pageSize={props.pageSize} total={props.total} onChange={props.onChangePage} className="py-20" />

      {/* loading */}
      {!props.isInit && props.isLoading && <Loading />}

      {/* no data */}
      {props.isInit && props.total === 0 && <NoData />}
    </div>
  );
};
