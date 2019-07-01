import { IOptionsComparer } from './IOptionsComparer';
import { IOptionItem } from '../../interfaces/IOptionItem';

export class OptionsComparer implements IOptionsComparer {
  public compare(a: IOptionItem, b: IOptionItem): number {
    return a.title > b.title ? 1 : -1;
  }
}
