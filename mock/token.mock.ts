import { mockAPI } from '../config/vite/utils';
import { MockMethod } from 'vite-plugin-mock';

export default [
  // 获取Token列表
  mockAPI('post', '/token/list', {
    list: [],
    count: 0,
  }),
] as MockMethod[];
