import { IOptionItem } from '../../../interfaces/IOptionItem';

export interface IMultiSelectorProps {
  optionsLevel2: IOptionItem[];
  optionsLevel3: IOptionItem[];
  onSelectionComplete: (selectedOptionsLevel2: IOptionItem[], selectedOptionsLevel3: IOptionItem[]) => void;
}
