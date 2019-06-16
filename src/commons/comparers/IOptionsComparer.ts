import { IOptionItem } from '../../interfaces/IOptionItem';

export interface IOptionsComparer {
  compare(a: IOptionItem, b: IOptionItem): number;
}
