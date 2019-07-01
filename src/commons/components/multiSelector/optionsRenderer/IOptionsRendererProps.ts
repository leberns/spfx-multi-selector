import { IRelationalOption } from '../../../../interfaces/IRelationalOption';

export interface IOptionsRendererProps {
  parentOption: IRelationalOption;
  suboptions: IRelationalOption[];
  onUnlimitedOptionChange: (isChecked: boolean, suboption: IRelationalOption) => void;
  onSingleOptionChange: (suboption: IRelationalOption) => void;
}
