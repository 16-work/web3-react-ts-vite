import { ReactNode } from 'react';

/** Props */
interface Props {
  children: ReactNode;

  page: number;
  pageSize: number;
  total: number;
  onSwitchPage: (page: number) => void;

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
    <div className={`relative min-h-250 ${props.className}`}>
      {/* list */}
      {props.children}

      {/* pager */}
      <Pager page={props.page} pageSize={props.pageSize} total={props.total} onChange={props.onSwitchPage} className="py-20" />

      {/* loading */}
      {!props.isInit && props.isLoading && <Loading />}

      {/* no data */}
      {props.isInit && !props.isLoading && props.total === 0 && <NoData />}
    </div>
  );
};
