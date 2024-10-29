import { ABIDemo } from '@/constants/abi/demo';
import { contracts } from '@/constants/contracts';
import { Task } from '@/store/global/types';

/** Hook */
export const useABIDemo = () => {
  /** Params */
  const contractConfig = {
    address: contracts.demo,
    abi: ABIDemo,
  };

  /** Actions */
  const writeFunc = (task: Task, args: any[], value?: bigint) => {
    return hooks.contract.write(task, {
      contractConfig,
      functionName: 'functionName',
      args,
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
