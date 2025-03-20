import { useCreation } from 'ahooks';

/** Props */
interface Props {
  onClose?: () => void;
}

/** Component */
export const DropUser = (props: Props) => {
  /** Retrieval */
  const account = useAccount();
  const { screenType } = store.global();

  /** Params */
  const list = useCreation(() => {
    const arr = [
      {
        label: 'Copy Address',
        icon: 'copy',
        onClick: () => {
          tools.copy(account.address!);
        },
      },
      {
        label: 'Disconnect',
        icon: 'logout',
        onClick: () => hooks.wallet.disconnect(),
      },
    ];

    if (screenType < SCREEN.MD) arr.pop();

    return arr;
  }, [screenType]);

  /** Template */
  return (
    account.address && (
      <div className="drop-user    relative px-20 py-10">
        {/* list */}
        {list.map((item, index) => (
          <div key={index}>
            {/* hr */}
            {index !== 0 && <div className="hr-1 my-10"></div>}

            {/* item */}
            <Item
              icon={item.icon}
              label={item.label}
              onClick={() => {
                item.onClick();
                props.onClose && props.onClose();
              }}
            />
          </div>
        ))}
      </div>
    )
  );
};

/** Props */
interface ItemProps {
  icon: string;
  label: string;
  className?: string;
  onClick: () => void;
}

/** Component */
const Item = (props: ItemProps) => {
  /** Template */
  return (
    <div className={`flex-align-x py-6 text-18 text-common-1 hover-primary ${props.className}`} onClick={props.onClick}>
      {/* icon */}
      <Svg name={props.icon} className="xs:w-40 md:w-20 mr-10" />

      {/* label */}
      <span className="font-base">{props.label}</span>
    </div>
  );
};
