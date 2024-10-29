import { NavigateFunction, Location, Params } from 'react-router-dom';

export const router = {
  location: {} as Location,
  push: {} as NavigateFunction,
  query: {} as {
    get: (key: string) => string | null;
    set: (key: string, value: string) => void;
    del: (key: string) => void;
  },
  params: {} as Readonly<Params<string>>,
};

/** Hook */
export const useRouterFun = () => {
  /** Retrieval */
  router.push = useNavigate();
  router.location = useLocation();
  router.params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  /** Actions */
  router.query = {
    get: (key: string) => {
      return searchParams.get(key);
    },
    set: (key: string, value: string) => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    del: (key: string) => {
      // 获取所有查询参数
      const queryParams = new URLSearchParams(location.search);

      // 删除指定查询参数
      queryParams.delete(key);

      // 更新URL并重定向
      const newUrl = `${location.pathname}?${queryParams.toString()}`;
      router.push(newUrl);
    },
  };
};
