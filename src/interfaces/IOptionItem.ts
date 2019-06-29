import { SelectionAllowance } from '../enums/SelectionAllowance';

export interface IOptionItem {
  key: string;
  title: string;
  parentKey?: string;
  selectionAllowance?: SelectionAllowance;
}
