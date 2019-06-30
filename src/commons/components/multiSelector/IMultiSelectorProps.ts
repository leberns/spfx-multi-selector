import { IOptionItem } from '../../../interfaces/IOptionItem';

export interface IMultiSelectorProps {
  optionsLevel1: IOptionItem[];
  optionsLevel2: IOptionItem[];
  optionsLevel3: IOptionItem[];
  onSelectionComplete: (
    selectedOptionsLevel1: IOptionItem[],
    selectedOptionsLevel2: IOptionItem[],
    selectedOptionsLevel3: IOptionItem[]
  ) => void;
}
