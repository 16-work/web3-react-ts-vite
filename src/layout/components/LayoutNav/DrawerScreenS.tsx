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

  /** Params */
  const state = ahooks.reactive({
    isShowDrawer: false,
  });

  /** Template */
  return (
    <>
      {/* icon: more */}
      <Svg name="more" className="layout-nav-icon-w" onClick={() => (state.isShowDrawer = true)} />

      {/* drawer */}
      <Drawer
        isShow={state.isShowDrawer}
        title={account.address ? <BtnUser /> : <BtnConnect />}
        hideCloseIcon
        placement="right"
        onClose={() => (state.isShowDrawer = false)}
      >
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-y-40">
            {/* menus: user */}
            {account.address && <DropUser onClose={() => (state.isShowDrawer = false)} />}

            {/* menus: common */}
            <MenusScreenS onClick={() => (state.isShowDrawer = false)} />
          </div>

          {/* bottom */}
          {account.address && (
            <div className="flex-align-x justify-between pt-30 border-t-2 border-gray-900">
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
    </>
  );
};
