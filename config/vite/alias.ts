import path from 'path';
import { AliasOptions } from 'vite';

export const alias: AliasOptions = {
    '@': path.resolve(__dirname, '../../src'),
};
