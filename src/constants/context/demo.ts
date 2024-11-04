import { createContext } from 'react';

export const contextInitValue: TypeContextDemo = {
  key: '',
};

export type TypeContextDemo = {
  key: string;
};

export const ContextDemo = createContext({ ...contextInitValue });
