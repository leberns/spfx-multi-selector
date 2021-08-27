import { IOptionItem } from './IOptionItem';
import { SelectionAllowance } from '../enums/SelectionAllowance';

export interface IRelationalOption extends IOptionItem {
  parentKey?: string;
  selectionAllowance?: SelectionAllowance;
}
