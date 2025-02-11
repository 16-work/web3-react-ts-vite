import { useInit } from '@/hooks/init';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutNav } from './components/LayoutNav';

/** Component */
export const Layout = () => {
  /** Retrieval */
  const { setIsHitBottom } = store.global();

  /** Params */

  /** Actions */
  useInit();

  /** Template */
  return (
    <div id="layout">
      <Scrollbar id="layout-scroll" autoHeight={false} onHitBottom={(v) => setIsHitBottom(v)}>
        {/* nav */}
        <LayoutNav />

        {/* main */}
        <div id="layout-main">
          <AnimationRoute>
            {/* routes */}
            <Outlet />
          </AnimationRoute>
        </div>

        {/* footer */}
        <LayoutFooter />
      </Scrollbar>
    </div>
  );
};
