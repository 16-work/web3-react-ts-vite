/** Hook */
export const useMenus = () => {
  /** Retrieval */
  const { t } = useTranslation();
  const { screenType } = store.global();

  /** Params */
  const state = ahooks.reactive({
    activeMenuId: '1',
  });

  const menus = useMemo(() => {
    const list = [
      {
        id: '1',
        label: t('common.home'),
        path: path.home,
        relatedRoutes: [path.home],
      },
      {
        id: '2',
        label: 'Test',
        path: path.noResults,
        relatedRoutes: [path.noResults],
      },
    ];

    if (screenType <= SCREEN.MD) {
      list.push(...[]);
    }

    return list;
  }, [screenType, t]);

  /** Actions */
  useEffect(() => {
    let id = '';
    menus.map((menu) => {
      const index = menu.relatedRoutes?.findIndex((item) => {
        if (item === path.home) return router.location.pathname === item;
        return router.location.pathname.search(item) !== -1;
      });

      if (index !== -1) id = menu.id;
    });

    state.activeMenuId = id;
  }, [router.location.pathname]);

  /** Return */
  return { menus, state };
};
