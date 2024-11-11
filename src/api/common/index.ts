import { DTOUpload } from './types';

export default {
  // 上传图片
  upload: (dto: DTOUpload) => {
    return http.post<string>('/upload', dto, { timeout: 600000 });
  },

  // 获取1主币的美元单价
  fetchUSDTUnitPrice: () => {
    return http.get<number>('/usdtUnitPrice');
  },
};
