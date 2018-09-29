export interface ITarget {
  name: string;
  cost: number;
  inMonths: number;
}

export interface IMonthlySavings {
  value: number;
  tillMonth: number;
  fromMonth: number;
}
