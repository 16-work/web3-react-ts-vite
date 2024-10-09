import { ReactNode } from 'react';
import { To } from 'react-router-dom';

/** Constants */
const tableStyleType = {
  // 基础表格样式
  base: {
    thead: `gap-x-20 py-15 
            border-b-2 border-black 
            text-common-1 font-lg`,
    tbody: ``,
    row: `gap-x-20 gap-y-10 xs:py-25 md:py-15 
          md:hover:bg-black/10 
          text-common-1 font-lg text-center`,
    hr: `bg-black`,
  },
};

/** Props */
interface Props {
  // 基础属性
  labels: ReactNode[]; // 表头项
  gridCols: string; // 各列占比
  list: any[]; // 列表数据
  children: (item: any, index: number) => React.ReactNode; // 行内容
  rowTo?: (index: number) => To; // 行链接
  styleType?: keyof typeof tableStyleType; // 指定样式类型

  // 加载相关
  isLoading: boolean; // 是否处于加载状态
  isInit: boolean; // 是否已初始化
  skeleton: ReactNode; // 骨架屏
  hideLoading?: boolean; // 隐藏加载图标

  // 排序相关
  fields?: string[]; // 全字段
  sortFields?: string[]; // 存在排序的字段
  defaultActiveSort?: {
    field: string;
    sort: 'asc' | 'desc';
  };
  onSort?: (field: string, sort: 'asc' | 'desc' | '') => void;

  // 自定义样式
  className?: string;
  theadClassName?: string;
  rowClassName?: string;
}

/** Component */
export const Table = (props: Props) => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Params */
  const styleType = props.styleType ?? 'base';

  const theadClassName = `grid 
    ${tableStyleType[styleType].thead}
    ${props.gridCols} ${props.theadClassName}`;

  const tbodyClassName = `relative xs:min-h-200 md:min-h-250 
    ${tableStyleType[styleType].tbody}`;

  const rowClassName = `grid xs:items-start md:items-center overflow-hidden duration-300 
    ${tableStyleType[styleType].row} 
    ${props.gridCols} ${props.rowClassName}`;

  const hrClassName = `w-full h-2
    ${tableStyleType[styleType].hr}`;

  const state = ahooks.reactive({
    activeSortField: props.defaultActiveSort?.field ?? '',
    sort: props.defaultActiveSort?.sort as 'asc' | 'desc' | '',
  });

  /** Template */
  return (
    <div className={`h-full flex flex-col rounded-20 overflow-hidden ${props.className}`}>
      {/* thead */}
      {screenType >= SCREEN.M && (
        <>
          <div className={theadClassName}>
            {props.labels.map((label, index) => (
              // field
              <div key={index} className="flex-align-x justify-center">
                <FieldSort
                  label={label}
                  isShowSortIcon={Boolean(props.sortFields?.find((item) => props.fields && item === props.fields[index]))}
                  sort={props.fields && state.activeSortField === props.fields[index] ? state.sort : ''}
                  onSort={(sort) => {
                    if (props.fields) state.activeSortField = props.fields[index];
                    state.sort = sort;
                    props.onSort && props.onSort(state.activeSortField, state.sort);
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* tbody */}
      <BoxFill className={tbodyClassName}>
        {/* rows */}
        {props.list.map((item, index) => (
          <div key={index}>
            {/* hr */}
            {index !== 0 && <div className={hrClassName}></div>}

            {/* row: common */}
            {!props.rowTo && <div className={rowClassName}>{props.children(item, index)}</div>}

            {/* row: link */}
            {props.rowTo && (
              <Link to={props.rowTo(index)} className={`${rowClassName} cursor-pointer`}>
                {props.children(item, index)}
              </Link>
            )}
          </div>
        ))}

        {/* skeletons */}
        {props.skeleton &&
          !props.isInit &&
          props.isLoading &&
          Array.from({ length: screenType >= SCREEN.M ? 4 : 1 }).map((_, index) => (
            <div key={index}>
              {/* hr */}
              {index !== 0 && <div className={hrClassName}></div>}

              {/* skeleton */}
              <div className={rowClassName}>{props.skeleton}</div>
            </div>
          ))}

        {/* load */}
        {props.isLoading && props.isInit && !props.hideLoading && <Loading />}

        {/* no data */}
        {props.list.length === 0 && !props.isLoading && <NoData />}
      </BoxFill>
    </div>
  );
};
