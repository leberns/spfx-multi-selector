import { IOptionItem } from '../../../interfaces/IOptionItem';

export interface IMultiOptionsEditorProps {
  options: IOptionItem[];
  defaultSelectedKeys?: string[];
  onChange: (isChecked: boolean, option: IOptionItem) => void;
}
