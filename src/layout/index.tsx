import { useInit } from '@/hooks/init';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutNavPC } from './components/LayoutNav/LayoutNavPC';
import { LayoutNavMobile } from './components/LayoutNav/LayoutNavMobile';

/** Component */
export const Layout = () => {
  /** Retrieval */
  useInit();
  const { screenType } = store.global();

  /** Template */
  return (
    <>
      {/* 上下布局 */}
      <div className="pc-min-w h-screen flex flex-col bg-gray-5">
        {/* layout-nav */}
        {screenType >= SCREEN.M ? <LayoutNavPC /> : <LayoutNavMobile />}

        <div id="drawer-root" className="relative flex-1 overflow-hidden">
          <Scrollbar autoHeight={false} className="scroll-box absolute w-full h-full">
            {/* animation */}
            <div className="page-min-h">
              <AnimationRoute>
                {/* routes */}
                <Outlet />
              </AnimationRoute>
            </div>

            {/* footer */}
            <LayoutFooter />
          </Scrollbar>
        </div>
      </div>

      {/* 左右布局 */}
      {/* <div className="h-screen flex overflow-hidden">
        <AnimationRoute>
          <Outlet />
        </AnimationRoute>
      </div> */}
    </>
  );
};
