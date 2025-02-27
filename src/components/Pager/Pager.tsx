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
      <>
        {/* screen md */}
        {screenType >= SCREEN.MD && (
          <Pagination
            className={`w-fit mx-auto select-none ${props.className}`}
            current={props.page}
            pageSize={props.pageSize}
            total={props.total}
            onChange={(e) => props.onChange(e)}
          />
        )}

        {/* screen xs */}
        {screenType < SCREEN.MD && <PagerTiny {...props} />}
      </>
    )
  );
};

const PagerTiny = (props: Props) => {
  /** Params */
  const totalPage = Math.ceil(props.total / props.pageSize);

  /** Actions */
  const onChangePage = (v: number | string) => {
    let page = Number(v);

    if (page < 1) page = 1;
    else if (page > totalPage) page = totalPage;

    props.onChange(page);
  };

  /** Template */
  return (
    <div className={`w-fit flex-align-x mx-auto select-none text-common-1 font-base duration-300 ${props.className}`}>
      <Svg name="arrow-left" className="w-40 hover:text-primary-1" onClick={() => onChangePage(props.page - 1)} />

      <span className="flex-align-x gap-x-10 px-10">
        <InputNum
          value={props.page}
          onChange={(v) => onChangePage(v)}
          className="base-input text-center"
          style={{
            width: `${props.page.toString().length + 0.5}ch`,
          }}
        />
        <span>/</span>
        {totalPage}
      </span>

      <Svg name="arrow-left" className="w-40 rotate-180 hover:text-primary-1" onClick={() => onChangePage(props.page + 1)} />
    </div>
  );
};
