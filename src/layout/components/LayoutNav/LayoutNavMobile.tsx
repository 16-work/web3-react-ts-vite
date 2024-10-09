import { BtnChain } from '../BtnChain';
import { MobileDrawer } from '../MobileDrawer';

/** Component */
export const LayoutNavMobile = () => {
  /** Template */
  return (
    <div className="layout-nav-w h-60 !mt-20 !mb-40 z-[5] flex-align-x justify-between">
      {/* logo */}
      <Link to={path.home} className="flex-align-x cursor-pointer">
        <Svg name={'logo'} className="w-40" />
      </Link>

      {/* right */}
      <div className="flex-align-x xs:gap-x-14 md:gap-x-20">
        {/* current chain */}
        <BtnChain />

        {/* drawer */}
        <MobileDrawer />
      </div>
    </div>
  );
};
