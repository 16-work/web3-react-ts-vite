import { ActionUser } from '../LayoutActions/ActionUser';
import { SwitchLanguage } from '../LayoutActions/SwitchLanguage';
import { SwitchTheme } from '../LayoutActions/SwitchTheme';
import { Menus } from './Menus';

/** Component */
export const LayoutDrawer = () => {
  /** Retrieval */
  const account = useAccount();
  const { isOpenDrawer, setIsOpenDrawer } = store.global();

  /** Params */

  /** Template */
  return (
    <Drawer isShow={isOpenDrawer} placement="right" hideHeader onClose={() => setIsOpenDrawer(false)}>
      <div className="flex flex-col justify-between flex-1">
        {/* top */}
        <div className="flex flex-col gap-y-40">
          <ActionUser />

          {/* menus */}
          <Menus />
        </div>

        {/* bottom */}

        <div className="flex-align-x justify-between">
          {/* left */}
          <div className="flex-align-x gap-x-30">
            <SwitchTheme />
            <SwitchLanguage />
          </div>

          {/* right */}
          {account.address && (
            <Button onClick={hooks.wallet.disconnect}>
              <Svg name="logout" className="w-50" />
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
};
