import { useMenus } from '@/hooks/useMenus';

/** Component */
export const MenusScreenL = () => {
  /** Retrieval */
  const { menus, state } = useMenus();

  /** Template */
  return (
    <div className="flex-align-x gap-x-40 mx-26">
      {menus.map((item) => (
        <Link
          key={item.id}
          className={`relative hover-primary font-xl duration-300 cursor-pointer 
            ${item.id === state.activeMenuId ? '!text-primary-1' : ''}
          `}
          to={item.path}
          onClick={() => {
            state.activeMenuId = item.id;
          }}
        >
          {/* label */}
          <span className="whitespace-nowrap">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
