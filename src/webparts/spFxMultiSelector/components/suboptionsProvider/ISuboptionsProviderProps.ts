import { ISuboption } from '../../../../interfaces/ISuboption';
import { IMainOption } from '../../../../interfaces/IMainOption';

export interface ISuboptionsProviderProps {
  selectedMainOptions: IMainOption[];
  suboptions: ISuboption[];
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: ISuboption) => void;
  onSingleSuboptionChange: (mainOption: IMainOption, suboption: ISuboption) => void;
}
