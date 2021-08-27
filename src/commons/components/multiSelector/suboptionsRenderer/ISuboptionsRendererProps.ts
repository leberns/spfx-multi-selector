import { IRelationalOption } from '../../../../interfaces/IRelationalOption';
import { IRelationMap } from '../../../relations/IRelationMap';

export interface ISuboptionsRendererProps {
  parentOptions: IRelationalOption[];
  suboptionsMap: IRelationMap;
  defaultSelectedKeys: string[];
  onUnlimitedOptionChange?: (isChecked: boolean, option: IRelationalOption) => void;
  onSingleOptionChange?: (option: IRelationalOption) => void;
}
