/// <reference types="vite/client" />

declare interface MetaEnv {
  VITE_ENV: 'dev' | 'test' | 'prod' | 'mock';

  VITE_APPNAME: string;

  VITE_PORT: number;
  VITE_HOST: string;

  VITE_API_URL: string;
}
