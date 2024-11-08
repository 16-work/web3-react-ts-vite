import { useInit } from '@/hooks/init';
import { LayoutFooter } from './components/LayoutFooter';
import { NavScreenL } from './components/LayoutNav/NavScreenL';
import { NavScreenS } from './components/LayoutNav/NavScreenS';

/** Component */
export const Layout = () => {
  /** Retrieval */
  useInit();
  const { screenType, setIsHitBottom } = store.global();

  /** Template */
  return (
    <>
      {/* 上下布局 */}
      <div className="pc-min-w h-screen flex flex-col overflow-hidden">
        {/* layout-nav */}
        {screenType >= SCREEN.MD ? <NavScreenL /> : <NavScreenS />}

        <div id="drawer-root" className="relative flex-1 overflow-hidden">
          <Scrollbar autoHeight={false} className="scroll-box absolute w-full h-full" onHitBottom={(v) => setIsHitBottom(v)}>
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
