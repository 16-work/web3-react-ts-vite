import lottie, { AnimationItem } from 'lottie-web';

/** Props */
interface Props {
  name: string;
  className: string;

  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

/** Component */
export const Lottie = (props: Props) => {
  /** Params */
  const animationContainer = useRef<HTMLDivElement>(null);

  const className = useMemo(() => {
    // 未设置height时自动和width一致
    const regex = /\bh-(\d+|auto|full|screen)\b/;
    if (regex.test(props.className)) return props.className;
    else return props.className + ' aspect-square';
  }, [props.className]);

  /** Actions */
  useEffect(() => {
    let anim: AnimationItem | undefined;

    const loadAnimation = async () => {
      try {
        const animationData = await import(`../../assets/lottie/${props.name}.json`);
        if (animationContainer.current) {
          anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData.default,
          });
        }
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
      }
    };

    loadAnimation();

    return () => {
      // 清除动画实例以防止内存泄漏
      if (anim) anim.destroy();
    };
  }, [props.name]);

  /** Template */
  return <div ref={animationContainer} className={className} />;
};
