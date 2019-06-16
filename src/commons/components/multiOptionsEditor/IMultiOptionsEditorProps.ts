import { IOptionItem } from '../../../interfaces/IOptionItem';

export interface IMultiOptionsEditorProps {
  options: IOptionItem[];
  onChange: (isChecked: boolean, option: IOptionItem) => void;
}
