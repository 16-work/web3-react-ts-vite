import { RDList } from '../types';
import { DTOGetTokenList, DTOUpload } from './types';

export default {
  upload: (dto: DTOUpload) => {
    return http.post<string>('/upload', dto, { timeout: 600000 });
  },

  getUSDTUnitPrice: () => {
    return http.get<number>('/ethPrice');
  },

  getTokenList: async (dto: DTOGetTokenList) => {
    const res = await http.post<RDList<{ contract: string; icon: string }>>('/token/list', dto);

    res.list.forEach((item) => {
      item.contract = item.contract.toLowerCase();
    });

    return res;
  },
};
