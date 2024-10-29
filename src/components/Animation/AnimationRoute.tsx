import { motion } from 'framer-motion';

/** Props */
interface Props {
  children: JSX.Element;
}

/** Component */
export const AnimationRoute = (props: Props) => {
  /** Retrieval */
  const location = useLocation();

  /** Template */
  return (
    <motion.div
      key={location.key}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-1 overflow-auto"
    >
      {props.children}
    </motion.div>
  );
};
