import { IOptionItem } from './IOptionItem';
import { SelectionAllowance } from '../enums/SelectionAllowance';

export interface IMainOption extends IOptionItem {
  selectionAllowance: SelectionAllowance;
}
