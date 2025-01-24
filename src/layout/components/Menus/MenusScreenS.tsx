import { useMenus } from '@/hooks/useMenus';

/** Props */
interface Props {
  onClick: () => void;
}

/** Component */
export const MenusScreenS = (props: Props) => {
  /** Retrieval */
  const menusHook = useMenus();
  const { setIsOpenDrawer } = store.global();

  /** Params */

  /** Actions */

  /** Template */
  return (
    <div className="flex flex-col gap-y-20">
      {menusHook.menus.map((item, index) => (
        <Link
          key={index}
          className={`relative hover-primary font-lg
            ${item.id === menusHook.state.activeMenuId ? 'text-primary-1' : 'text-tip-1'}
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
