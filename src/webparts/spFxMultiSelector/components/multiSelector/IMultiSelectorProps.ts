import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISubOption } from '../../../../interfaces/ISubOption';

export interface IMultiSelectorProps {
  mainOptions: IMainOption[];
  subOptions: ISubOption[];
  onSelectionComplete: (selectedMainOptions: IMainOption[], selectedSubOptions: ISubOption[]) => void;
}
