import { CHAINS_ICON } from '@/constants/chain';

/** Component */
export const SwitchChain = () => {
  /** Retrieval */
  const account = useAccount();

  /** Params */

  /** Actions */

  /** Template */
  return (
    account.address && (
      <Button onClick={hooks.wallet.switchChain} className="btn-switch-chain    rounded-full">
        <Svg name={account.chain ? CHAINS_ICON[account.chain.id] : 'wrong-network'} className={`xs:w-50 md:w-28 ${!account.chain && 'text-stress-1'}`} />
      </Button>
    )
  );
};
