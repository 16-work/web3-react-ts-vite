import { PageNoResults } from '@/pages/error/noResults';
import { PageHome } from '@/pages/home';
import { RouteObject } from 'react-router-dom';

export const baseRoutes: RouteObject[] = [
  // 首页
  {
    index: true,
    Component: PageHome,
  },
  // 无数据
  {
    path: path.noResults,
    Component: PageNoResults,
  },
];
