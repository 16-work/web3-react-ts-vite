import { useMenus } from '@/hooks/useMenus';
import { ActionUser } from '../LayoutActions/ActionUser';
import { SwitchLanguage } from '../LayoutActions/SwitchLanguage';
import { SwitchTheme } from '../LayoutActions/SwitchTheme';
import { BoxLogo } from './BoxLogo';

/** Component */
export const NavScreenL = () => {
  /** Template */
  return (
    <>
      {/* left */}
      <BoxLogo />

      {/* center */}
      <Menus />

      {/* right */}
      <div className="flex-align-x gap-x-12">
        <SwitchTheme />

        <SwitchLanguage />

        <ActionUser />
      </div>
    </>
  );
};

const Menus = () => {
  const { menus, state } = useMenus();

  return (
    <div className="flex-align-x gap-x-40 mx-26">
      {menus.map((item: any) => (
        <Link
          key={item.id}
          className={`relative hover-primary font-xl 
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
