import { IOptionItem } from '../../../../interfaces/IOptionItem';

export interface IOptionsArrayProps {
  options: IOptionItem[];
  onChange: (isChecked: boolean, option: IOptionItem) => void;
}
