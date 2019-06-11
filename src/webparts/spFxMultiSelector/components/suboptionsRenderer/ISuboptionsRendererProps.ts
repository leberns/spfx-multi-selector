import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';

export interface ISuboptionsRendererProps {
  mainOption: IMainOption;
  relatedSuboptions: ISuboption[];
  onUnlimitedSuboptionChange: (suboption: ISuboption, isChecked: boolean) => void;
  onSingleSuboptionChange: (suboption: ISuboption) => void;
}
