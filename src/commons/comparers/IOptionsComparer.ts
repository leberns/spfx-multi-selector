import { IRelationalOption } from '../../interfaces/IRelationalOption';

export interface IOptionsComparer {
  compare(a: IRelationalOption, b: IRelationalOption): number;
}
