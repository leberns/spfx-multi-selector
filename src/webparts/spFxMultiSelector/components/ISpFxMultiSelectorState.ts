import { IRelationalOption } from '../../../interfaces/IRelationalOption';

export interface ISpFxMultiSelectorState {
  optionsLevel1: IRelationalOption[];
  optionsLevel2: IRelationalOption[];
  optionsLevel3: IRelationalOption[];
  selectedOptionsLevel1: IRelationalOption[];
  selectedOptionsLevel2: IRelationalOption[];
  selectedOptionsLevel3: IRelationalOption[];
}
