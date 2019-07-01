import { IOptionsComparer } from './IOptionsComparer';
import { IRelationalOption } from '../../interfaces/IRelationalOption';

export class OptionsComparer implements IOptionsComparer {
  public compare(a: IRelationalOption, b: IRelationalOption): number {
    return a.title > b.title ? 1 : -1;
  }
}
