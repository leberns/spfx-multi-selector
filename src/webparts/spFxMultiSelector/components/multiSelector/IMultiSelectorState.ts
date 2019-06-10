import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';

export interface IMultiSelectorState {
  selectedMainOptions: IMainOption[];
  selectedSuboptions: ISuboption[];
  hasMainOptionSelected: boolean;
}
