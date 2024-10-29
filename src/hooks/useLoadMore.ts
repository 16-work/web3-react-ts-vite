/** Hook */
export const useLoadMore = <T>(filters: T[]) => {
  /** Params */
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [pageSize] = useState(20);

  /** Actions */
  useEffect(() => {
    setItems(filters.slice(0, pageSize));
    if (filters.length <= pageSize) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setPage(2);
  }, [filters]);

  const loadMore = () => {
    if (hasMore) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const nextPageFilters = filters.slice(startIndex, endIndex);
      setItems((prevItems) => [...prevItems, ...nextPageFilters]);
      setPage(page + 1);
      if (nextPageFilters.length < pageSize) {
        setHasMore(false);
      }
    }
  };

  /** Return */
  return {
    items,
    hasMore,
    loadMore,
  };
};
