/** Props */
interface Props {
  page: number;
  currentPageLength: number;
  hasMore: boolean;
  onChange: (page: number) => void;
  className?: string;
}

/** Component
 * 无页数，只有左右翻页
 */
export const PagerSimple = (props: Props) => {
  /** Template */
  return (
    !(props.currentPageLength === 0 && props.page === 1) && (
      <div className={`w-fit flex-align-x m-auto select-none ${props.className}`}>
        {/* btn: prev */}
        <Button
          className="group inline-block p-6 border-2 border-gray-100 hover:border-gray-50 rounded-8 duration-300"
          disabled={props.page === 1}
          onClick={() => props.onChange(props.page - 1)}
        >
          <Svg name="arrow-down" className="w-20 rotate-90 text-tip-1 group-hover:text-common-1 duration-300" />
        </Button>

        {/* page */}
        <span className="-mb-4 mx-20 text-common-1 font-xl">{props.page}</span>

        {/* btn: next */}
        <Button
          className="group inline-block p-6 border-2 border-gray-100 hover:border-gray-50 rounded-8 duration-300"
          disabled={!props.hasMore}
          onClick={() => props.onChange(props.page + 1)}
        >
          <Svg name="arrow-down" className="w-20 -rotate-90 text-tip-1 group-hover:text-common-1 duration-300" />
        </Button>
      </div>
    )
  );
};