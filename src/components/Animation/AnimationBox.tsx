import { useInView } from 'framer-motion';
import { ReactNode } from 'react';

/** Props */
interface Props {
  type: 'fadeInDown' | 'slideInUp' | 'slideInDown' | string;
  children: ReactNode;

  duration?: number;
  startAt?: number;
}

/** Component */
export const AnimationBox = (props: Props) => {
  /** Retrieval */

  /** Params */
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const duration = props.duration ?? 0.8;
  const startAt = props.startAt ?? 0;

  const type = useMemo(() => {
    switch (props.type) {
      case 'fadeInDown':
        return 'translateX(-200px)';
      case 'slideInUp':
        return 'translateY(-200px)';
      case 'slideInDown':
        return 'translateY(200px)';

      default:
        return '';
    }
  }, [props.type]);

  /** Actions */

  /** Template */
  return (
    <section ref={ref}>
      <div
        style={{
          transform: isInView ? 'none' : type,
          opacity: isInView ? 1 : 0,
          transition: `all ${duration}s cubic-bezier(0.17, 0.55, 0.55, 1) ${startAt}s`,
        }}
      >
        {props.children}
      </div>
    </section>
  );
};
