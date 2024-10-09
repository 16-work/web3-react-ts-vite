import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';

/** Props */
interface Props {
  id: string;
  list: any[];
  hasMore: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  className?: string;
}

/** Component */
export const BoxScrollLoad = (props: Props) => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Template */
  return (
    <div id={props.id} className={`w-full h-full overflow-auto ${props.className}`}>
      <InfiniteScroll
        scrollableTarget={props.id}
        dataLength={props.list.length}
        next={props.onLoadMore}
        hasMore={props.hasMore}
        loader={
          <div className="relative w-full h-50">
            <Loading />
          </div>
        }
        endMessage={<Divider className="text-18 !text-[--c-text-tip] select-none">{t('tip.nothingMore')}</Divider>}
      >
        {props.children}
      </InfiniteScroll>
    </div>
  );
};
