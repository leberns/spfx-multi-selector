import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { IRelationMap } from '../../../relations/IRelationMap';

export interface ISuboptionsRendererProps {
  parentOptions: IOptionItem[];
  allSuboptions: IOptionItem[];
  suboptionsMap: IRelationMap;
  onUnlimitedOptionChange?: (isChecked: boolean, option: IOptionItem) => void;
  onSingleOptionChange?: (option: IOptionItem) => void;
}
