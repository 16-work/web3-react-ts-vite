import { ConfigEnv, loadEnv } from 'vite';
import path from 'path';
import { parseEnv } from './config/vite/utils';
import { setServer } from './config/vite/server';
import { setPlugins } from './config/vite/plugin';
import { resolve } from './config/vite/resolve';
import { build } from './config/vite/build';
import { other } from './config/vite/other';

export default ({ mode }: ConfigEnv) => {
  const root = path.resolve(__dirname, './config/env');
  const env = parseEnv(loadEnv(mode, root));

  return {
    plugins: setPlugins(env),
    resolve,
    envDir: './config/env', // 读取环境变量目录
    server: setServer(env),
    build,
    ...other,
  };
};
