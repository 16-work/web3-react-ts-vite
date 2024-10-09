import { useAccount } from 'wagmi';

/** Component */
export const VerifyTip = () => {
  /** Retrieval */
  const account = useAccount();
  const { t } = useTranslation();
  const { usersToken, setUsersToken } = store.user();

  /** Params */
  const [isInit, setIsInit] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  /** Actions */
  // 清空过期token
  useEffect(() => {
    setUsersToken(account.address?.toLowerCase() ?? '', '');
    setIsInit(true);
  }, []);

  // 更新token关闭
  ahooks.updateEffect(() => {
    if (usersToken[account.address?.toLowerCase() ?? ''] && isInit) toast.dismiss?.();
  }, [usersToken, account.address]);

  /** Template */
  return (
    <div ref={componentRef}>
      <span className="font-2xl text-common-1">{t('tip.unauthorized')}</span>
      {hooks.wallet.verify && (
        <Button
          fullWidth
          className="btn-primary xs:h-60 md:h-40 mt-10 rounded-8 text-common-1 font-base"
          onClick={async () => {
            await hooks.wallet.verify();
          }}
        >
          {t('tip.verify')}
        </Button>
      )}
    </div>
  );
};
