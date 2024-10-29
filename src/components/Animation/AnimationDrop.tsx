import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/** Props */
interface Props {
  isFold: boolean;
  children: ReactNode;
}

/** Component */
export const AnimationDrop = (props: Props) => {
  /** Template */
  return (
    <AnimatePresence>
      {props.isFold && (
        <motion.div style={{ overflow: 'hidden' }} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
