import { IOptionItem } from '../../../../interfaces/IOptionItem';

export interface IOptionsRendererProps {
  mainOption: IOptionItem;
  relatedSuboptions: IOptionItem[];
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: IOptionItem) => void;
  onSingleSuboptionChange: (suboption: IOptionItem) => void;
}
