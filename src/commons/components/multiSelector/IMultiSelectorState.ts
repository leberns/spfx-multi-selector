import { IRelationalOption } from '../../../interfaces/IRelationalOption';

export interface IMultiSelectorState {
  optionsLevel2: IRelationalOption[];
  optionsLevel3: IRelationalOption[];
  selectedOptionsLevel1: IRelationalOption[];
  selectedOptionsLevel2: IRelationalOption[];
  selectedOptionsLevel3: IRelationalOption[];
  hasOptionSelected: boolean;
}
