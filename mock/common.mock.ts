import { mockAPI } from '../config/vite/utils';
import { MockMethod } from 'vite-plugin-mock';

export default [
  // 上传图片
  mockAPI('post', '/upload', 'base64'),

  // 获取1主币的美元单价
  mockAPI('get', '/usdtUnitPrice', 2000),
] as MockMethod[];
