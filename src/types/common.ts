export interface Option {
  label: string;
  value: any;
}

export enum ORDER {
  ASC = 1,
  DESC = 2,
}

export type ActiveStatus = 'Upcoming' | 'Live' | 'Ended';
