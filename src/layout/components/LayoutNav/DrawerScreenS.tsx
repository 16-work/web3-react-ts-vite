import { BtnConnect } from '../BtnConnect';
import { MenusScreenS } from '../Menus/MenusScreenS';
import { DropUser } from '../BtnUser/DropUser';
import { SwitchLanguage } from '../SwitchLanguage';
import { SwitchTheme } from '../SwitchTheme';
import { BtnUser } from '../BtnUser';

/** Component */
export const DrawerScreenS = () => {
  /** Retrieval */
  const account = useAccount();
  const { isOpenDrawer, setIsOpenDrawer } = store.global();

  /** Params */

  /** Template */
  return (
    <Drawer isShow={isOpenDrawer} placement="right" onClose={() => setIsOpenDrawer(false)}>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-y-40">
          {account.address ? <BtnUser /> : <BtnConnect />}

          {/* menus: user */}
          {account.address && <DropUser onClose={() => setIsOpenDrawer(false)} />}

          {/* menus: common */}
          <MenusScreenS onClick={() => setIsOpenDrawer(false)} />
        </div>

        {/* bottom */}
        {account.address && (
          <div className="flex-align-x justify-between pt-30 border-t-2 border-black">
            {/* left */}
            <div className="flex-align-x gap-x-30">
              {/* switch language */}
              <SwitchLanguage />

              {/* switch theme */}
              <SwitchTheme />
            </div>

            {/* logout */}
            <Button onClick={() => hooks.wallet.disconnect()}>
              <Svg name="logout" className="w-50" />
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};
