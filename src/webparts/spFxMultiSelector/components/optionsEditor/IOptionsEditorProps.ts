import { IOptionItem } from '../../../../interfaces/IOptionItem';

export interface IOptionsEditorProps {
  options: IOptionItem[];
  onChange: (option: IOptionItem) => void;
}
