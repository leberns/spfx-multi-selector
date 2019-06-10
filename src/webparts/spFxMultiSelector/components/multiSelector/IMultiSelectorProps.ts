import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';

export interface IMultiSelectorProps {
  mainOptions: IMainOption[];
  subOptions: ISuboption[];
  onSelectionComplete: (selectedMainOptions: IMainOption[], selectedSuboptions: ISuboption[]) => void;
}
