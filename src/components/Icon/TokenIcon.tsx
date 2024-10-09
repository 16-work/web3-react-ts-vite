import IconDefaultToken from '@/assets/img/common/token-default.png';

/** Props */
interface Props {
  size: number;
  icon?: string;
  contract?: string;
  className?: string;
  preview?: boolean;
}

/** Component */
export const TokenIcon = (props: Props) => {
  /** Retrieval */
  const { tokenIconList, setTokenIconList } = store.global();

  /** Actions */
  const checkIconByContract = async () => {
    // token已存在缓存列表中，则不操作
    if (!props.contract || tokenIconList[props.contract] === '' || tokenIconList[props.contract]) return;

    // token不存在缓存列表中，则从接口读取
    const res = await api.common.getTokenList({ page: 1, pageSize: 1, contracts: [props.contract] });

    const list: Record<string, string> = {};
    if (res.list.length === 0) {
      list[props.contract] = '';
    } else {
      for (let i = 0; i < res.list.length; i++) {
        list[res.list[i].contract] = res.list[i].icon;
      }
    }

    setTokenIconList(list);
  };

  useEffect(() => {
    if (props.contract) checkIconByContract();
  }, [props.contract]);

  /** Template */
  return (
    <Img
      className={`${props.className} rounded-full`}
      src={props.icon || tokenIconList[props.contract ?? ''] || IconDefaultToken}
      preview={props.preview ?? false}
      defaultImg="token"
    />
  );
};
