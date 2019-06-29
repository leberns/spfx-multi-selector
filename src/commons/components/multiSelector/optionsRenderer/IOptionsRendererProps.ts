import { IOptionItem } from '../../../../interfaces/IOptionItem';

export interface IOptionsRendererProps {
  parentOption: IOptionItem;
  suboptions: IOptionItem[];
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: IOptionItem) => void;
  onSingleSuboptionChange: (suboption: IOptionItem) => void;
}
