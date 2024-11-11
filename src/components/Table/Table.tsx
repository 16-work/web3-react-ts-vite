import { ReactNode } from 'react';
import { To } from 'react-router-dom';

/** Constants */
const tableStyleType = {
  // 基础表格样式
  base: {
    table: `rounded-20`,
    thead: `grid 
            gap-x-20 py-15 
            border-b-2 border-black 
            text-common-1 font-lg`,
    tbody: `relative xs:min-h-200 md:min-h-250
            `,
    row: `grid xs:items-start md:items-center overflow-hidden duration-300 
          gap-x-20 gap-y-10 xs:py-25 md:py-15 
          md:hover:bg-black/10 
          text-common-1 font-lg text-center`,
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
    gridCols: string;
    cols?: Record<number, string>;
    type?: keyof typeof tableStyleType; // 指定基础样式类型
    table?: string;
    thead?: string;
    tbody?: string;
    row?: string;
    hr?: string;
  };

  // 排序相关
  sort?: {
    sortFields: Record<number, string>; // 需要排序的字段 {index: field}
    onSort: (field: string, sort: 'asc' | 'desc' | '') => void; // 切换排序
    defaultActiveSort?: { index: number; sort: 'asc' | 'desc' }; // 默认激活的排序
  };

  // 其它
  other?: {
    rowTo?: (index: number) => To; // 行链接
    hideLoading?: boolean; // 隐藏加载图标（频繁轮询的表格使用）
    alwaysFullyDisplay?: boolean; // 可以理解为: 是否一直展示为PC端样式
  };
}

/** Component */
export const Table = (props: Props) => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Params */
  const styleType = props.classNames.type ?? 'base';
  const classNames = {
    type: props.classNames.type ?? 'base',
    table: `${tableStyleType[styleType].table} ${props.classNames.table}`,
    thead: `${tableStyleType[styleType].thead} ${props.classNames.gridCols} ${props.classNames.thead}`,
    tbody: `${tableStyleType[styleType].tbody} ${props.classNames.tbody}`,
    row: `${tableStyleType[styleType].row} ${props.classNames.row} ${props.classNames.gridCols}`,
    col: props.classNames.cols ?? {},
    hr: `${tableStyleType[styleType].hr} ${props.classNames.hr}`,
  };

  const state = ahooks.reactive({
    activeSortIndex: props.sort?.defaultActiveSort?.index ?? -1,
    sort: props.sort?.defaultActiveSort?.sort as 'asc' | 'desc' | '',
  });

  /** Template */
  return (
    <div className={`h-full flex flex-col overflow-hidden ${classNames.table}`}>
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
                  sort={state.activeSortIndex === index ? state.sort : ''}
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
                  <TCol label={props.elements.labels[colIndex]} className={classNames.col[colIndex]} alwaysFullyDisplay={props.other?.alwaysFullyDisplay}>
                    {col}
                  </TCol>
                ))}
              </div>
            )}

            {/* row: link */}
            {props.other?.rowTo && (
              <Link to={props.other?.rowTo(rowIndex)} className={`${classNames.row} cursor-pointer`}>
                {props.elements.cols(rowNode, rowIndex).map((col, colIndex) => (
                  <TCol label={props.elements.labels[colIndex]} className={classNames.col[colIndex]} alwaysFullyDisplay={props.other?.alwaysFullyDisplay}>
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
        {props.state.isLoading && props.state.isInit && !props.other?.hideLoading && <Loading />}

        {/* no data */}
        {props.state.list.length === 0 && !props.state.isLoading && <NoData />}
      </div>
    </div>
  );
};
