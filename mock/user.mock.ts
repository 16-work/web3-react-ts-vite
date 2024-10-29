import { mockAPI } from '../config/vite/utils';
import { MockMethod } from 'vite-plugin-mock';

export default [
    mockAPI(
        'get',
        '/login',
        {
            token: 'Bearer xxxxxxxxx',
        },
        {
            status: 200,
            message: 'success',
        }
    ),
] as MockMethod[];
