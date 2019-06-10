import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISubOption } from '../../../../interfaces/ISubOption';

export interface IMultiSelectorState {
  selectedMainOptions: IMainOption[];
  selectedSubOptions: ISubOption[];
  hasMainOptionSelected: boolean;
}
