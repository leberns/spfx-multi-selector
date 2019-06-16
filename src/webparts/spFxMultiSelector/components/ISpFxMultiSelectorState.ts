import { IMainOption } from '../../../interfaces/IMainOption';
import { ISuboption } from '../../../interfaces/ISuboption';

export interface ISpFxMultiSelectorState {
  selectedMainOptions: IMainOption[];
  selectedSuboptions: ISuboption[];
}
