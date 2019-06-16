import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';
import { IRelationMap } from '../../../relations/IRelationMap';

export interface IParentsSuboptionsRendererProps {
  selectedMainOptions: IMainOption[];
  suboptions: ISuboption[];
  suboptionsMap: IRelationMap;
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: ISuboption) => void;
  onSingleSuboptionChange: (suboption: ISuboption) => void;
}
