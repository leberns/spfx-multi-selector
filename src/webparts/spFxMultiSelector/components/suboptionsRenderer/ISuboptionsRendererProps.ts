import { ISuboption } from '../../../../interfaces/ISuboption';
import { IMainOption } from '../../../../interfaces/IMainOption';
import { IRelationMap } from '../../../../commons/relations/IRelationMap';

export interface ISuboptionsRendererProps {
  selectedMainOptions: IMainOption[];
  suboptions: ISuboption[];
  suboptionsMap: IRelationMap;
  onUnlimitedSuboptionChange: (isChecked: boolean, suboption: ISuboption) => void;
  onSingleSuboptionChange: (suboption: ISuboption) => void;
}
