import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';

export interface ISuboptionsRendererProps {
  mainOption: IMainOption;
  relatedSuboptions: ISuboption[];
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: ISuboption) => void;
  onSingleSuboptionChange: (suboption: ISuboption) => void;
}
