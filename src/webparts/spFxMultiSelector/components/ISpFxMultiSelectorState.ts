import { IMainOption } from '../../../interfaces/IMainOption';
import { ISubOption } from '../../../interfaces/ISubOption';

export interface ISpFxMultiSelectorState {
  selectedMainOptions: IMainOption[];
  selectedSubOptions: ISubOption[];
}
