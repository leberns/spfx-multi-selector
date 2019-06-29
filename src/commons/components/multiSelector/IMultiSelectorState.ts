import { IOptionItem } from '../../../interfaces/IOptionItem';

export interface IMultiSelectorState {
  optionsLevel2: IOptionItem[];
  selectedOptionsLevel2: IOptionItem[];
  selectedOptionsLevel3: IOptionItem[];
  hasOptionSelected: boolean;
}
