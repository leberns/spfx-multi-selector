import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';

export interface ISuboptionsRendererProps {
  mainOption: IMainOption;
  options: ISuboption[];
  onChange: (isChecked: boolean, option: ISuboption) => void;
}
