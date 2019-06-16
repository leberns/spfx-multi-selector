import { IMainOption } from '../../../interfaces/IMainOption';
import { ISuboption } from '../../../interfaces/ISuboption';

export interface IMultiSelectorState {
  mainOptions: IMainOption[];
  selectedMainOptions: IMainOption[];
  selectedSuboptions: ISuboption[];
  hasMainOptionSelected: boolean;
}
