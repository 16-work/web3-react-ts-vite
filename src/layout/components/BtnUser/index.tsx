import { Popover } from 'antd';
import { BtnConnect } from '../BtnConnect';
import { DropUser } from './DropUser';

/** Component */
export const BtnUser = () => {
  /** Retrieval */
  const account = useAccount();
  const { isPC } = store.global();

  /** Template */
  return (
    <div>
      {!account.address && <BtnConnect />}
      {account.address && (
        <Popover placement="bottomRight" trigger={[isPC ? 'hover' : 'contextMenu']} content={<DropUser />}>
          <Button className="btn-primary layout-nav-btn-h xs:w-full md:w-fit px-16 rounded-8 font-base">{format.address(account.address, 6, 4)}</Button>
        </Popover>
      )}
    </div>
  );
};
