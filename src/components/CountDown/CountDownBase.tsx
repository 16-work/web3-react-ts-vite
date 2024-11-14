import { ActiveStatus } from '@/types/common';
import { ReactNode } from 'react';

/** Props */
interface Props {
  time: { start: number; end: number };
  onLive?: () => void;
  onEnd?: () => void;
  children?: (d: number, h: number, m: number, s: number) => ReactNode;
}

/** Component */
export const CountDownBase = (props: Props) => {
  /** Params */
  const workerRef = useRef<Worker | null>(null);
  const [milliseconds, setMilliseconds] = useState(0);
  const [_status, setStatus] = useState<ActiveStatus>('Upcoming');

  /** Actions */
  useEffect(() => {
    // 初始化Web Worker
    workerRef.current = new Worker(new URL('./countDownWorker.ts', import.meta.url));

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { status, milliseconds } = e.data;
      setStatus(status);
      setMilliseconds(milliseconds);

      if (status === 'Live' && props.onLive) {
        props.onLive();
      } else if (status === 'Ended' && props.onEnd) {
        props.onEnd();
      }
    };

    // 向Web Worker发送初始时间数据
    workerRef.current.postMessage({
      start: props.time.start,
      end: props.time.end,
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, [props.time.start, props.time.end]);

  const d = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  const h = Math.floor((milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const m = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const s = Math.floor((milliseconds % (60 * 1000)) / 1000);

  /** Template */
  return <>{props.children && props.children(d, h, m, s)}</>;
};
