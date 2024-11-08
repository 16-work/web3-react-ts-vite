import { ReactNode } from "react";

/** Props */
interface Props {
  list: any[];
  total: number;
  isLoading: boolean;
  children: ReactNode;
  onLoadMore: () => void;
}

/** Component */
export const HitBottomLoad = (props: Props) => {
  /** Retrieval */
  const { t } = useTranslation();
  const { isHitBottom } = store.global();

  /** Params */

  /** Actions */
  // 触底加载
  useEffect(() => {
    if (isHitBottom && props.total > props.list.length && !props.isLoading) props.onLoadMore();
  }, [isHitBottom]);

  /** Template */
  return (
    <div>
      {/* children */}
      {props.children}

      {/* loading & no more */}
      {props.list.length > 0 && (
        <div className="relative min-h-30">
          {/* loading */}
          {props.isLoading && <Loading />}

          {/* no more */}
          {!props.isLoading && props.total <= props.list.length && <div className="mt-30 text-common-1 text-center">{t("tip.nothingMore")}</div>}
        </div>
      )}
    </div>
  );
};
