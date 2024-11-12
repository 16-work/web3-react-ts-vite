import { useLoadMore } from '@/hooks/useLoadMore';
import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

/** Props */
interface Props {
  list: any[];
  isInit: boolean;
  isLoading: boolean;
  children: (item: any, index: number) => React.ReactNode;
  skeleton: ReactNode;
  className?: string;
}

/** Component */
export const AllDataScrollLoad = (props: Props) => {
  /** Retrieval */
  const { isPC } = store.global();
  const { loadMore, hasMore, items } = useLoadMore(props.list);

  /** Params */
  const rowClassName = `
    relative grid items-center 
    px-20 py-10 md:hover:bg-black/10 duration-300 
    text-common-1 font-lg text-center`;

  /** Template */
  return (
    <Scrollbar maxHeight={isPC ? 300 : 650}>
      <InfiniteScroll
        className="relative"
        height={'100%'}
        dataLength={items.length} // This is important field to render the next data
        next={loadMore}
        hasMore={hasMore}
        loader={<h4 className="py-10 text-tip-1 font-base text-center">Loading...</h4>}
      >
        <div className="min-h-300 relative">
          {/* rows */}
          {items.map((item, index) => (
            <div key={index}>
              {/* hr */}
              {index !== 0 && <div className="hr-1 my-10"></div>}

              {/* row */}
              <div className={rowClassName}>{props.children(item, index)}</div>
            </div>
          ))}

          {/* skeletons */}
          {!props.isInit &&
            props.isLoading &&
            Array.from({ length: isPC ? 6 : 1 }).map((_, index) => (
              <div key={index}>
                {/* hr */}
                {index !== 0 && <div className="hr-1"></div>}

                {/* skeleton */}
                <div>{props.skeleton}</div>
              </div>
            ))}

          {/* load */}
          {props.isInit && props.isLoading && <Loading />}

          {/* no data */}
          {props.list.length === 0 && !props.isLoading && <NoData />}
        </div>
      </InfiniteScroll>
    </Scrollbar>
  );
};
