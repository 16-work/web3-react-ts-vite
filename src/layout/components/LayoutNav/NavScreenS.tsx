import { BoxLogo } from '../BoxLogo';
import { BtnChain } from '../BtnChain';
import { DrawerScreenS } from './DrawerScreenS';

/** Component */
export const NavScreenS = () => {
  /** Template */
  return (
    <div className="layout-nav-w h-60 !mt-20 !mb-40 z-[5] flex-align-x justify-between">
      {/* logo */}
      <BoxLogo />

      {/* right */}
      <div className="flex-align-x xs:gap-x-14 md:gap-x-20">
        {/* current chain */}
        <BtnChain />

        {/* drawer */}
        <DrawerScreenS />
      </div>
    </div>
  );
};
