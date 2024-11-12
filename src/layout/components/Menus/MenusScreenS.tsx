import { useMenus } from '@/hooks/useMenus';

/** Props */
interface Props {
  onClick: () => void;
}

/** Component */
export const MenusScreenS = (props: Props) => {
  /** Retrieval */
  const menusHook = useMenus();
  const account = useAccount();
  const { usersToken } = store.user();
  const { isOpenDrawer, setIsOpenDrawer } = store.global();

  /** Params */
  const state = ahooks.reactive({
    isVerify: Boolean(account.address && usersToken[account.address]),
    isShowModalWithdrawRecords: false,
  });

  /** Actions */
  useEffect(() => {
    if (isOpenDrawer && account.address) state.isVerify = Boolean(usersToken[account.address]);
  }, [isOpenDrawer, account.address, usersToken]);

  /** Template */
  return (
    <div className="flex flex-col">
      {menusHook.menus.map((item, index) => (
        <Link
          key={item.id}
          className={`relative hover-primary font-3xl
            ${item.id === menusHook.state.activeMenuId ? 'text-primary-1' : 'text-tip-1'}
            ${index === 0 ? 'mt-0' : 'mt-20'}
          `}
          to={item.path}
          onClick={() => {
            menusHook.state.activeMenuId = item.id;
            setIsOpenDrawer(false);
            props.onClick();
          }}
        >
          {/* label */}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
