const baseClassName = 'xs:w-full md:w-fit xs:h-80 md:h-40 px-20 rounded-8 font-base';

/** Component */
export const BtnUser = () => {
  /** Retrieval */
  const account = useAccount();

  /** Template */
  return account.address ? (
    // btn: user
    <button className={`btn-user    ${baseClassName} btn-primary `}>{format.address(account.address, 6, 4)}</button>
  ) : (
    // btn: connect
    <Button onClick={hooks.wallet.connect} isLoading={account.isConnecting} className={`btn-connect    ${baseClassName} btn-primary `}>
      <span className="font-base">Connect</span>
    </Button>
  );
};
