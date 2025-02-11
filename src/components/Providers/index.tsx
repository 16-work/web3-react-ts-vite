import { ReactNode } from 'react';
import { ProviderWallet } from './ProviderWallet';
import { ProviderAntd } from './ProviderAntd';

/** Props */
interface Props {
  children: ReactNode;
}

/** Component */
export const Providers = (props: Props) => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return (
    <ProviderWallet>
      <ProviderAntd>{props.children}</ProviderAntd>
    </ProviderWallet>
  );
};
