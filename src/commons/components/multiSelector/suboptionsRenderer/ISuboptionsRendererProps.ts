import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { IRelationMap } from '../../../relations/IRelationMap';

export interface ISuboptionsRendererProps {
  selectedParentOptions: IOptionItem[];
  suboptions: IOptionItem[];
  suboptionsMap: IRelationMap;
  onUnlimitedOptionChange?: (isChecked: boolean, option: IOptionItem) => void;
  onSingleOptionChange?: (option: IOptionItem) => void;
}
