import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { IRelationMap } from '../../../relations/IRelationMap';

export interface ISuboptionsRendererProps {
  selectedOptionsLevel2: IOptionItem[];
  optionsLevel3: IOptionItem[];
  suboptionsMap: IRelationMap;
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: IOptionItem) => void;
  onSingleSuboptionChange: (suboption: IOptionItem) => void;
}
