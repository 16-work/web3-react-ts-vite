import { useMenus } from '@/hooks/useMenus';
import { DropUser } from '../LayoutActions/ActionUser/DropUser';

/** Component */
export const Menus = () => {
  /** Retrieval */
  const menusHook = useMenus();
  const account = useAccount();
  const { setIsOpenDrawer } = store.global();

  /** Params */

  /** Actions */

  /** Template */
  return (
    <div className="flex flex-col gap-y-20">
      {account.address && <DropUser onClose={() => setIsOpenDrawer(false)} />}

      {menusHook.menus.map((item: any, index) => (
        <Link
          key={index}
          className={`relative hover-primary font-lg
            ${item.id === menusHook.state.activeMenuId ? 'text-primary-1' : 'text-tip-1'}
          `}
          to={item.path}
          onClick={() => {
            menusHook.state.activeMenuId = item.id;
            setIsOpenDrawer(false);
          }}
        >
          {/* label */}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
