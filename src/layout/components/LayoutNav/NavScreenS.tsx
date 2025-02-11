import { LayoutDrawer } from '../LayoutDrawer';
import { BoxLogo } from './BoxLogo';

/** Component */
export const NavScreenS = () => {
  /** Retrieval */
  const { setIsOpenDrawer } = store.global();

  /** Template */
  return (
    <>
      {/* left */}
      <BoxLogo />

      {/* right */}
      <div className="flex-align-x gap-20">
        <>
          <Svg name="more" className="w-50" onClick={() => setIsOpenDrawer(true)} />
          <LayoutDrawer />
        </>
      </div>
    </>
  );
};
