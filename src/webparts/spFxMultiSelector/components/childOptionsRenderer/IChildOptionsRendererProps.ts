import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';

export interface IChildOptionsRendererProps {
  mainOption: IMainOption;
  relatedSuboptions: ISuboption[];
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: ISuboption) => void;
  onSingleSuboptionChange: (suboption: ISuboption) => void;
}
