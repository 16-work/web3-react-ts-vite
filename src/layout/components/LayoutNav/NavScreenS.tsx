import { BoxLogo } from '../BoxLogo';
import { BtnChain } from '../BtnChain';
import { DrawerScreenS } from './DrawerScreenS';

/** Component */
export const NavScreenS = () => {
  /** Retrieval */
  const { setIsOpenDrawer } = store.global();

  /** Template */
  return (
    <div className="layout-nav-w h-60 relative top-0 z-[5] flex-align-x justify-between mt-20 mb-40">
      {/* logo */}
      <BoxLogo />

      {/* right */}
      <div className="flex-align-x xs:gap-x-30 md:gap-x-20">
        {/* current chain */}
        <BtnChain />

        {/* btn: more */}
        <Svg name="more" className="layout-nav-icon-w" onClick={() => setIsOpenDrawer(true)} />

        {/* drawer */}
        <DrawerScreenS />
      </div>
    </div>
  );
};
