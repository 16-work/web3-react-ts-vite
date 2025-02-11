import { PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { setMock } from './mock';
import { setAutoImport } from './autoImport';
import { setSvg } from './svg';
import { setCompression } from './gzip.ts';
import { visualizer } from 'rollup-plugin-visualizer';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export const setPlugins = (env: MetaEnv) => {
  let plugins: PluginOption[] = [react()];

  if (env.VITE_ENV === 'mock') plugins.push(setMock());
  plugins.push(visualizer());
  plugins.push(...setAutoImport());
  plugins.push(setSvg());
  plugins.push(setCompression());
  if (env.VITE_ENV === 'prod') plugins.push(nodePolyfills());

  return plugins;
};
