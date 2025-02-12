import { Program } from '@coral-xyz/anchor';
import { useAnchorProvider } from './useAnchorProvider';
import { IDL } from '@/constants/idl';
import { IDLType } from '@/constants/idl/type';

export const useProgram = () => {
  /** Retrieval */
  const anchorProvider = useAnchorProvider();

  /** Params */
  const program = useMemo(() => {
    return anchorProvider ? new Program(IDL as IDLType, anchorProvider) : null;
  }, [anchorProvider]);

  /** Return */
  return {
    program,
  };
};
