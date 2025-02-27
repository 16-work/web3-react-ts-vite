import { DropUser } from './DropUser';
import { BtnUser } from './BtnUser';

/** Component */
export const ActionUser = () => {
  /** Retrieval */
  const account = useAccount();
  const { isPC } = store.global();

  /** Params */

  /** Actions */

  /** Template */
  return (
    <Popover placement="bottomRight" trigger={[isPC && account.address ? 'hover' : 'contextMenu']} content={<DropUser />}>
      <div>
        <BtnUser />
      </div>
    </Popover>
  );
};
