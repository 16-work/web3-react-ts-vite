import { useAccount } from 'wagmi';

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
      className="btn-primary xs:w-full md:w-fit layout-nav-btn-h flex-align-x px-16 rounded-8"
    >
      {/* icon */}
      <Svg name="user" className="w-28" />

      {/* text */}
      <span className="ml-6 font-base">{t('account.connect')}</span>
    </Button>
  );
};
