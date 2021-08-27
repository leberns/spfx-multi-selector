import { IOptionsComparer } from './IOptionsComparer';
import { IOptionItem } from '../../interfaces/IOptionItem';

export class OptionsComparer implements IOptionsComparer {
  public compare(a: IOptionItem, b: IOptionItem): number {
    const aLower = !!a.title ? a.title.toLowerCase() : '';
    const bLower = !!b.title ? b.title.toLowerCase() : '';
    return aLower > bLower ? 1 : -1;
  }
}
