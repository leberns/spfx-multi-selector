import { IRelationalOption } from '../../../interfaces/IRelationalOption';
import { IRelationMap } from '../../relations/IRelationMap';

export interface IMultiSelectorState {
  suboptionsMap12: IRelationMap;
  suboptionsMap23: IRelationMap;
  selectedOptionsLevel1: IRelationalOption[];
  selectedOptionsLevel2: IRelationalOption[];
  selectedOptionsLevel3: IRelationalOption[];
  hasOptionSelected: boolean;
}
