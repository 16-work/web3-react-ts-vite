import { useAccount } from 'wagmi';
import { BtnConnect } from '../BtnConnect';
import { MenusScreenS } from '../Menus/MenusScreenS';
import { DropUser } from '../BtnUser/DropUser';
import { SwitchLanguage } from '../SwitchLanguage';
import { SwitchTheme } from '../SwitchTheme';

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
      <Button className="btn-second-1 w-50 h-50 rounded-8" onClick={() => (state.isShowDrawer = true)}>
        <Svg name="more" className="w-36" />
      </Button>

      {/* drawer */}
      <Drawer
        isShow={state.isShowDrawer}
        title={
          // copy: address
          <Copy text={account.address!} iconClassName="w-30">
            <span className="text-info-2 mr-10">{format.address(account.address ?? '', 5, 5)}</span>
          </Copy>
        }
        placement="right"
        hideHeader={!account.address}
        onClose={() => (state.isShowDrawer = false)}
      >
        <div className="flex flex-col justify-between flex-1">
          <div>
            {/* user info || connect */}
            {account.address ? <DropUser onClose={() => (state.isShowDrawer = false)} /> : <BtnConnect />}

            {/* hr */}
            <div className="hr-1 my-30"></div>

            {/* menus */}
            <MenusScreenS onClick={() => (state.isShowDrawer = false)} />
          </div>

          {/* bottom */}
          {account.address && (
            <div className="flex-align-x justify-between pt-30 border-t-2 border-gray-800">
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
