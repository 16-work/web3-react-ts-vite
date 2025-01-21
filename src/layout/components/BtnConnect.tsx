/** Component */
export const BtnConnect = () => {
  /** Retrieval */
  const account = useAccount();
  const { t } = useTranslation();

  /** Template */
  return (
    <Button
      onClick={() => hooks.wallet.connect()}
      isLoading={account.isConnecting || account.isReconnecting}
      className="btn-primary layout-nav-btn-h xs:w-full md:w-fit flex-align-x px-16 rounded-8"
    >
      {/* icon */}
      <Svg name="user" className="w-28 mr-6" />

      {/* text */}
      <span className="font-base">{t('account.connect')}</span>
    </Button>
  );
};
