import { cloneDeep } from 'lodash-es';

const parseEnv = (env: Record<string, any>): MetaEnv => {
  const envs: any = cloneDeep(env);

  Object.entries(env).forEach(([key, value]) => {
    if (value == 'true' || value == 'false') envs[key] = value == 'true' ? true : false;
    else if (/^\d+$/.test(value)) envs[key] = Number(value);
    else if (value == 'null') envs[key] = null;
    else if (value == 'undefined') envs[key] = undefined;
  });
  return envs;
};

export const env = parseEnv(import.meta.env);
