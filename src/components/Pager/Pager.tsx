import { Pagination } from 'antd';

/** Props */
interface Props {
  total: number;
  page: number;
  pageSize: number;
  onChange: (page: number) => void;
  className?: string;
}

/** Component */
export const Pager = (props: Props) => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Params */
  const isShow = props.total > props.pageSize;

  /** Template */
  return (
    isShow && (
      <Pagination
        className={`w-fit m-auto select-none ${props.className}`}
        showQuickJumper={screenType >= SCREEN.MD}
        simple={screenType < SCREEN.MD}
        current={props.page}
        pageSize={props.pageSize}
        total={props.total}
        onChange={(e) => props.onChange(e)}
      />
    )
  );
};
