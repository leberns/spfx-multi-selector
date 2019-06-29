import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { IRelationMap } from '../../../relations/IRelationMap';

export interface ISuboptionsRendererProps {
  selectedParentOptions: IOptionItem[];
  suboptions: IOptionItem[];
  suboptionsMap: IRelationMap;
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: IOptionItem) => void;
  onSingleSuboptionChange: (suboption: IOptionItem) => void;
}
