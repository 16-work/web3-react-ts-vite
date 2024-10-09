import { screenMinSize } from '@config/constants/screen';

/** Hook */
export const useWatchScreen = () => {
  /** Retrieval */
  const { pathname } = useLocation();
  const { setIsPC, setScreenType } = store.global();

  /** Actions */
  // 判断设备类型(PC/Mobile) & 屏幕类型
  useEffect(() => {
    const resize = () => {
      setIsPC(window.innerWidth >= screenMinSize[SCREEN.MD] && !isMobileDevice() ? true : false);

      setScreenType(tools.getScreenType());
    };
    resize(); // 初始检测

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 兼容safari 100vh
  useEffect(() => {
    let isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if (isSafari) {
      let windowsVH = window.innerHeight / 100;
      const container = document.querySelector('#root') as HTMLElement;
      container.style.setProperty('--vh', windowsVH + 'px');

      window.addEventListener('resize', function () {
        container.style.setProperty('--vh', windowsVH + 'px');
      });
    }
  }, []);

  // 切换路由移动到页面最上方(这里不要用router.location.pathname，会卡)
  useEffect(() => {
    tools.scrollToTop('document', 'instant');
  }, [pathname]);
};

/** Functions */
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
