import _ from 'lodash';
import path from 'path';
import { loadEnv } from 'vite';
import { MethodType } from 'vite-plugin-mock';

export const parseEnv = (env: Record<string, any>): MetaEnv => {
  const envs: any = _.cloneDeep(env);

  Object.entries(env).forEach(([key, value]) => {
    if (value == 'true' || value == 'false') envs[key] = value == 'true' ? true : false;
    else if (/^\d+$/.test(value)) envs[key] = Number(value);
    else if (value == 'null') envs[key] = null;
    else if (value == 'undefined') envs[key] = undefined;
  });
  return envs;
};

const root = path.resolve(__dirname, '../env');
const baseURL = loadEnv('mock', root).VITE_API_URL;
export const mockAPI = (method: MethodType, url: string, data: any, otherInfo?: any) => {
  const other = otherInfo ?? {
    status: 200,
    message: 'success',
  };

  return {
    url: baseURL + url,
    method,
    response: () => ({
      data,
      ...other,
    }),
  };
};
