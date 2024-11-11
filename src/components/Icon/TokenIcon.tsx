import IconDefaultToken from '@/assets/img/common/token-default.png';

/** Props */
interface Props {
  className: string; // 长/宽都写这(未设置height时自动和width一致)

  // 显示图片：icon和contract 2选1
  icon?: string;
  contract?: string;

  preview?: boolean;
}

/** Component */
export const TokenIcon = (props: Props) => {
  /** Retrieval */
  const { tokenIconList, setTokenIconList } = store.global();

  /** Params */
  const className = useMemo(() => {
    // 未设置height时自动和width一致
    const regex = /\bh-(\d+|auto|full|screen)\b/;
    if (regex.test(props.className)) return props.className;
    else return props.className + ' aspect-square';
  }, [props.className]);

  /** Actions */
  const checkIconByContract = async () => {
    // token已存在缓存列表中，则不操作
    if (!props.contract || tokenIconList[props.contract] === '' || tokenIconList[props.contract]) return;

    // token不存在缓存列表中，则从接口读取
    const res = await api.token.fetchList({ page: 1, pageSize: 1, contracts: [props.contract] });

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
      className={`${className} rounded-full`}
      src={props.icon || tokenIconList[props.contract ?? ''] || IconDefaultToken}
      preview={props.preview ?? false}
      defaultImg="token"
    />
  );
};
