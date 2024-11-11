import { RDList } from '../types';
import { DTOFetchList, TokenInfo } from './types';

export default {
  fetchList: async (dto: DTOFetchList) => {
    const res = await http.post<RDList<TokenInfo>>('/token/list', dto);

    res.list.forEach((item) => {
      item.contract = item.contract.toLowerCase();
    });

    return res;
  },
};
