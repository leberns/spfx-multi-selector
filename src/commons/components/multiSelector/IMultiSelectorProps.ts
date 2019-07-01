import { IRelationalOption } from '../../../interfaces/IRelationalOption';

export interface IMultiSelectorProps {
  optionsLevel1: IRelationalOption[];
  optionsLevel2: IRelationalOption[];
  optionsLevel3: IRelationalOption[];
  onSelectionComplete: (
    selectedOptionsLevel1: IRelationalOption[],
    selectedOptionsLevel2: IRelationalOption[],
    selectedOptionsLevel3: IRelationalOption[]
  ) => void;
}
