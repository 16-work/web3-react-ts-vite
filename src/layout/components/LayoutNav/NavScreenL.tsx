import { BoxLogo } from '../BoxLogo';
import { BtnChain } from '../BtnChain';
import { BtnUser } from '../BtnUser';
import { MenusScreenL } from '../Menus/MenusScreenL';
import { SwitchLanguage } from '../SwitchLanguage';
import { SwitchTheme } from '../SwitchTheme';

/** Component */
export const NavScreenL = () => {
  /** Template */
  return (
    <div className="layout-nav-w h-60 relative top-0 z-[5] flex-align-x justify-between">
      {/* box: logo */}
      <BoxLogo />

      {/* box: menus */}
      <MenusScreenL />

      {/* right */}
      <div className="flex-align-x xs:gap-x-14 md:gap-x-20">
        {/* switch theme */}
        {<SwitchTheme />}

        {/* switch language */}
        <SwitchLanguage />

        {/* current chain */}
        <BtnChain />

        {/* btn: user */}
        <BtnUser />
      </div>
    </div>
  );
};
