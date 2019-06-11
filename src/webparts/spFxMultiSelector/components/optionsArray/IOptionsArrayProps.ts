import { IOptionItem } from '../../../../interfaces/IOptionItem';

export interface IOptionsArrayProps {
  options: IOptionItem[];
  onChange: (option: IOptionItem, isChecked: boolean) => void;
}
