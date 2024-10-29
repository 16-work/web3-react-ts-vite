import { Popover } from 'antd';
import { BtnConnect } from '../BtnConnect';
import { DropUser } from './DropUser';
import { useAccount } from 'wagmi';

/** Component */
export const BtnUser = () => {
  /** Retrieval */
  const account = useAccount();
  const { isPC, screenType } = store.global();

  /** Template */
  return (
    <div>
      {!account.address && <BtnConnect />}
      {account.address && (
        <Popover placement="bottomRight" trigger={[isPC ? 'hover' : 'contextMenu']} content={<DropUser />}>
          <Button
            className="btn-primary xs:w-full md:w-fit layout-nav-btn-h px-16 rounded-8 font-base"
            onClick={() => {
              if (screenType < SCREEN.MD && account.address) tools.copy(account.address);
            }}
          >
            {format.address(account.address, 6, 4)}
          </Button>
        </Popover>
      )}
    </div>
  );
};
