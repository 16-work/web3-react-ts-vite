import { Paging } from '../types';

export interface DTOUpload {
  contentType: string;
  imageBase64: string;
}

export interface DTOGetTokenList extends Paging {
  contracts?: string[];
}
