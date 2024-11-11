import { DTOUpload } from './types';

export default {
  upload: (dto: DTOUpload) => {
    return http.post<string>('/upload', dto, { timeout: 600000 });
  },

  getUSDTUnitPrice: () => {
    return http.get<number>('/ethPrice');
  },
};
