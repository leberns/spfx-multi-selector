import { ISuboption } from '../../../../interfaces/ISuboption';
import { IMainOption } from '../../../../interfaces/IMainOption';

export interface ISuboptionsProviderProps {
  selectedMainOptions: IMainOption[];
  suboptions: ISuboption[];
  onUnlimitedSuboptionChange: (suboption: ISuboption, isChecked: boolean) => void;
  onSingleSuboptionChange: (suboption: ISuboption, mainOption: IMainOption) => void;
}
