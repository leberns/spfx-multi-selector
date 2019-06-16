import { IOptionItem } from './IOptionItem';

export interface ISuboption extends IOptionItem {
  parentKey: string;
}
