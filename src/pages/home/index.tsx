/** Component */
export const PageHome = () => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return (
    <div className="flex-align-x">
      Home
      <HitBottomLoad
        list={[]}
        isLoading
        total={100}
        onLoadMore={() => {
          console.log(233);
        }}
      >
        <div className="h-1200">123</div>
      </HitBottomLoad>
    </div>
  );
};
