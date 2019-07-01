import { IOptionItem } from '../../../interfaces/IOptionItem';

export interface ISpFxMultiSelectorState {
  optionsLevel1: IOptionItem[];
  optionsLevel2: IOptionItem[];
  optionsLevel3: IOptionItem[];
  selectedOptionsLevel1: IOptionItem[];
  selectedOptionsLevel2: IOptionItem[];
  selectedOptionsLevel3: IOptionItem[];
}
