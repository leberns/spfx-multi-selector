import { IOptionItem } from '../../../interfaces/IOptionItem';

export interface IOptionsBoxEditorProps {
  options: IOptionItem[];
  onChange: (option: IOptionItem) => void;
}
