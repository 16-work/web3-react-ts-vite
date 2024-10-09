import { ABIDemo } from '@/constants/abi/Demo';
import { contracts } from '@/constants/contracts';

/** Hook */
export const useABIDemo = () => {
  /** Params */
  const contractConfig = {
    address: contracts.demo,
    abi: ABIDemo,
  };

  /** Actions */
  const writeFunc = (value?: bigint) => {
    return hooks.contract.write({
      contractConfig,
      functionName: 'functionName',
      args: [],
      value,
    });
  };

  const readFunc = async (args: any[]) => {
    const res = await hooks.contract.read({
      contractConfig,
      functionName: 'functionName',
      args,
    });

    return res;
  };

  /** Return */
  return { writeFunc, readFunc };
};
