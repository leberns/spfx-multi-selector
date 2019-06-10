import { IOptionItem } from './IOptionItem';

export interface ISuboption extends IOptionItem {
  parentId: number;
}
