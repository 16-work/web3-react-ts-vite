import { Paging } from '../types';

export interface TokenInfo {
  contract: string;
  icon: string;
}

export interface DTOFetchList extends Paging {
  contracts?: string[];
}
