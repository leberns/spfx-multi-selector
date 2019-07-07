import { IRelationalOption } from '../../../../interfaces/IRelationalOption';

export interface IOptionsRendererProps {
  parentOption: IRelationalOption;
  suboptions: IRelationalOption[];
  defaultSelectedKeys: string[];
  onUnlimitedOptionChange: (isChecked: boolean, suboption: IRelationalOption) => void;
  onSingleOptionChange: (suboption: IRelationalOption) => void;
}
