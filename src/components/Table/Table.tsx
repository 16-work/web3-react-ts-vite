import { ORDER } from '@/types/common';
import { ReactNode } from 'react';
import { To } from 'react-router-dom';

/** Constants */
const styleType = {
  // 基础表格样式
  base: {
    table: `h-full flex flex-col overflow-hidden 
            rounded-20`,
    thead: `grid 
            gap-x-20 py-15 
            border-b-2 border-black 
            text-common-1 font-lg`,
    tbody: `xs:min-h-200 md:min-h-250 relative 
            `,
    row: `grid xs:items-start md:items-center overflow-hidden
          gap-x-20 gap-y-10 xs:py-25 md:py-15 
          md:hover:bg-black/10 
          text-common-1 font-lg text-center 
          duration-300`,
    hr: `hr-1`,
  },
};

/** Props */
interface Props {
  state: {
    list: any[]; // 列表数据
    isLoading: boolean; // 是否处于加载状态
    isInit: boolean; // 是否已初始化
  };

  // 元素相关
  elements: {
    labels: ReactNode[]; // 表头项
    cols: (data: any, index: number) => ReactNode[]; // 各列内容
    skeletons: ReactNode[]; // 骨架屏
  };

  // 样式相关
  classNames: {
    type?: keyof typeof styleType; // 指定基础样式类型
    gridCols: string;
    cols?: Record<number, string>;
    table?: string;
    thead?: string;
    tbody?: string;
    row?: string;
    hr?: string;
  };

  // 排序相关
  sort?: {
    sortFields: Record<number, string>; // 需要排序的字段 {index: field}
    onSort: (field: any, sort?: ORDER) => void; // 切换排序
    defaultActiveSort?: { index: number; sort: ORDER }; // 默认激活的排序
  };

  // 其它
  other?: {
    rowTo?: (index: number) => To; // 行链接
    isFrequentPolling?: boolean; // 频繁轮询时隐藏加载图标
    alwaysFullyDisplay?: boolean; // 可以理解为: 是否一直展示为PC端样式
  };
}

/** Component */
export const Table = (props: Props) => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Params */
  const classNames = useMemo(() => {
    const type = styleType[props.classNames.type ?? 'base'];
    return {
      table: `${type.table} ${props.classNames.table}`,
      thead: `${type.thead} ${props.classNames.gridCols} ${props.classNames.thead}`,
      tbody: `${type.tbody} ${props.classNames.tbody}`,
      row: `${type.row} ${props.classNames.row} ${props.classNames.gridCols}`,
      col: props.classNames.cols ?? {},
      hr: `${type.hr} ${props.classNames.hr}`,
    };
  }, [props.classNames.type]);

  const state = useReactive({
    activeSortIndex: props.sort?.defaultActiveSort?.index ?? -1,
    sort: props.sort?.defaultActiveSort?.sort,
  });

  /** Template */
  return (
    <div className={`${classNames.table}`}>
      {/* thead */}
      {(screenType >= SCREEN.MD || props.other?.alwaysFullyDisplay) && (
        <>
          <div className={classNames.thead}>
            {props.elements.labels.map((label, index) => (
              // field
              <div key={index} className="flex-align-x justify-center">
                <FieldSort
                  label={label}
                  isShowSortIcon={Boolean(props.sort && Object.entries(props.sort.sortFields).find((item) => Number(item[0]) === index))}
                  sort={state.activeSortIndex === index ? state.sort : undefined}
                  onSort={(sort) => {
                    state.activeSortIndex = index;
                    state.sort = sort;
                    props.sort?.onSort && props.sort.onSort(props.sort.sortFields[state.activeSortIndex], state.sort);
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* tbody */}
      <div className={classNames.tbody}>
        {/* rows */}
        {props.state.list.map((rowNode, rowIndex) => (
          <div key={rowIndex}>
            {/* hr */}
            {rowIndex !== 0 && <div className={classNames.hr}></div>}

            {/* row: common */}
            {!props.other?.rowTo && (
              <div className={classNames.row}>
                {props.elements.cols(rowNode, rowIndex).map((col, colIndex) => (
                  <TCol
                    key={colIndex}
                    label={props.elements.labels[colIndex]}
                    className={classNames.col[colIndex]}
                    alwaysFullyDisplay={props.other?.alwaysFullyDisplay}
                  >
                    {col}
                  </TCol>
                ))}
              </div>
            )}

            {/* row: link
             * 里面有Button的话，Button要加上 e.preventDefault(); e.stopPropagation(); 否则Button会点不了
             */}
            {props.other?.rowTo && (
              <Link to={props.other?.rowTo(rowIndex)} className={`${classNames.row} cursor-pointer`}>
                {props.elements.cols(rowNode, rowIndex).map((col, colIndex) => (
                  <TCol
                    key={colIndex}
                    label={props.elements.labels[colIndex]}
                    className={classNames.col[colIndex]}
                    alwaysFullyDisplay={props.other?.alwaysFullyDisplay}
                  >
                    {col}
                  </TCol>
                ))}
              </Link>
            )}
          </div>
        ))}

        {/* skeletons */}
        {props.elements.skeletons &&
          !props.state.isInit &&
          props.state.isLoading &&
          Array.from({ length: screenType >= SCREEN.MD ? 4 : 2 }).map((_, index) => (
            <div key={index}>
              {/* hr */}
              {index !== 0 && <div className={classNames.hr}></div>}

              {/* skeleton */}
              <div className={classNames.row}>
                {props.elements.skeletons.map((col, colIndex) => (
                  <TCol label={props.elements.labels[colIndex]} className={classNames.col[colIndex]} alwaysFullyDisplay={props.other?.alwaysFullyDisplay}>
                    {col}
                  </TCol>
                ))}
              </div>
            </div>
          ))}

        {/* load */}
        {props.state.isLoading && props.state.isInit && !props.other?.isFrequentPolling && <Loading />}

        {/* no data */}
        {props.state.list.length === 0 && props.state.isInit && <NoData />}
      </div>
    </div>
  );
};
