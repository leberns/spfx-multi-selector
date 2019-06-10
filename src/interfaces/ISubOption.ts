import { IOptionItem } from './IOptionItem';

export interface ISubOption extends IOptionItem {
  parentId: number;
}
