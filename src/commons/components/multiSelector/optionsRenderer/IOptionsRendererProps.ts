import { IOptionItem } from '../../../../interfaces/IOptionItem';

export interface IOptionsRendererProps {
  parentOption: IOptionItem;
  suboptions: IOptionItem[];
  onUnlimitedOptionChange: (isChecked: boolean, suboption: IOptionItem) => void;
  onSingleOptionChange: (suboption: IOptionItem) => void;
}
