import { ActiveStatus } from '@/types/common';
import styles from './style.module.scss';
import classNames from 'classnames';

/** Props */
interface Props {
  time: { start: number; end: number };
}

/** Component */
export const CountDownFlip = (props: Props) => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Params */
  const state = useReactive({
    status: '' as ActiveStatus,
  });

  /** Actions */
  useEffect(() => {
    state.status = tools.getActiveStatus(props.time.start, props.time.end);
  }, []);

  /** Template */
  return (
    <CountDownBase
      time={props.time}
      onLive={() => (state.status = 'Live')}
      onEnd={() => (state.status = 'Ended')}
      children={(d, h, m, s) => (
        <div className="flex-align-x text-common-1 font-2xl">
          {/* h */}
          <FlipUnit time={d * 24 + h} type="h" />
          <span className="-mb-4 ml-10 mr-20 font-2xl">{t('common.h')}</span>
          {/* m */}
          <FlipUnit time={m} type="m" />
          <span className="-mb-4 ml-10 mr-20 font-2xl">{t('common.m')}</span>
          {/* s */}
          <FlipUnit time={s} type="s" />
          <span className="-mb-4 ml-10 font-2xl">{t('common.s')}</span>
        </div>
      )}
    />
  );
};

/** Props */
interface FlipUnitProps {
  time: number;
  type: 'd' | 'h' | 'm' | 's';
  className?: string;
}

/** Component */
const FlipUnit = (props: FlipUnitProps) => {
  /** Params */
  const flipBoxRef = useRef<HTMLDivElement>(null);
  const state = useReactive({
    isInit: false,
  });

  const nextTime = useMemo(() => {
    if (!state.isInit) {
      if (props.time === 0) return 0;
      else return props.time;
    } else {
      if ((props.type === 'm' || props.type === 's') && props.time === 59) return 0;
      else return props.time + 1;
    }
  }, [props.time]);

  /** Actions */
  useUpdateEffect(() => {
    state.isInit = true;

    if (flipBoxRef.current) {
      flipBoxRef.current.style.transition = 'transform 0s';
      flipBoxRef.current.style.transform = 'perspective(200px) rotateX(0deg)';

      const timer = setTimeout(() => {
        if (flipBoxRef.current) {
          flipBoxRef.current.style.transition = 'transform 0.9s';
          flipBoxRef.current.style.transform = 'perspective(200px) rotateX(-180deg)';
          clearTimeout(timer);
        }
      }, 100);
    }
  }, [props.time]);

  /** Template */
  return (
    <div className={`relative ${props.className}`}>
      {/* num */}
      <div className={classNames(styles.time, styles.text)}>
        {/* top */}
        <div className={classNames(styles.top, styles.block)}>{props.time}</div>

        {/* flip */}
        <div className={styles.flipBox} ref={flipBoxRef}>
          <div className={classNames(styles.front, styles.flipBlock)}>{nextTime}</div>
          <div className={classNames(styles.back, styles.flipBlock)}>{props.time}</div>
        </div>

        {/* bottom */}
        <div className={classNames(styles.bottom, styles.block)}>{nextTime}</div>
      </div>

      {/* line */}
      <span className="inline-block w-full h-1 absolute position-center bg-black"></span>

      {/* point: left */}
      <span className="inline-block w-4 h-8 absolute position-center-v -left-2 bg-second-300 rounded-10 shadow-2xl"></span>

      {/* point: right */}
      <span className="inline-block w-4 h-8 absolute position-center-v -right-2 bg-second-300 rounded-10 shadow-2xl"></span>
    </div>
  );
};
