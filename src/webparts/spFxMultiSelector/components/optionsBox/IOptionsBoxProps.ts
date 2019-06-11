import { IOptionItem } from '../../../../interfaces/IOptionItem';

export interface IOptionsBoxProps {
  options: IOptionItem[];
  onChange: (option: IOptionItem) => void;
}
