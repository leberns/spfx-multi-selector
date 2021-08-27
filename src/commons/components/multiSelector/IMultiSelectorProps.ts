import { IRelationalOption } from '../../../interfaces/IRelationalOption';

export interface IMultiSelectorProps {
  optionsLevel1: IRelationalOption[];
  optionsLevel2: IRelationalOption[];
  optionsLevel3: IRelationalOption[];
  defaultSelectedKeys1: string[];
  defaultSelectedKeys2: string[];
  defaultSelectedKeys3: string[];
  onSelectionComplete: (
    selectedOptionsLevel1: IRelationalOption[],
    selectedOptionsLevel2: IRelationalOption[],
    selectedOptionsLevel3: IRelationalOption[]
  ) => void;
}
