import { ISuboption } from '../../../../interfaces/ISuboption';
import { IMainOption } from '../../../../interfaces/IMainOption';

export interface ISuboptionsProviderProps {
  selectedMainOptions: IMainOption[];
  suboptions: ISuboption[];
  onChange: (isChecked: boolean, option: ISuboption) => void;
}
