import { createContext } from 'react';

export const contextInitValue: TypeContext = {
  key: '',
};

export type TypeContext = {
  key: string;
};

export const ContextDemo = createContext({ ...contextInitValue });
