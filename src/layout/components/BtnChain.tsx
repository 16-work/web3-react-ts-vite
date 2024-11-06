import { CHAINS_ICON } from '@/constants/chain';
import { useAccount } from 'wagmi';

/** Component */
export const BtnChain = () => {
  /** Retrieval */
  const account = useAccount();
  const { t } = useTranslation();

  /** Template */
  return (
    account.address && (
      <Button
        className={`layout-nav-btn-h border-2 rounded-8 cursor-pointer duration-300
          ${account.chain ? 'border-gray-900' : 'border-stress-1'}
        `}
        onClick={() => hooks.wallet.switchChain()}
      >
        <div className="h-full flex-align-x px-16">
          {/* correct */}
          {account.chain && (
            <>
              <Svg name={CHAINS_ICON[account.chain.id]} className="w-28 mr-8" />

              <span className="xs:max-w-100 md:max-w-fit text-title-1 font-base ellipsis-1">{account.chain.name}</span>
            </>
          )}

          {/* wrong */}
          {!account.chain && (
            <>
              {/* icon */}
              <Svg name="wrong-network" className="w-28 text-stress-1 mr-8" />

              {/* name */}
              <span className="xs:max-w-100 md:max-w-fit text-stress-1 font-xl ellipsis-1">{t('account.wrongNetwork')}</span>
            </>
          )}
        </div>
      </Button>
    )
  );
};
