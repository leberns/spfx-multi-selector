import { ISuboption } from '../../../../interfaces/ISuboption';
import { IMainOption } from '../../../../interfaces/IMainOption';

export interface ISuboptionsSelectorProps {
  selectedMainOptions: IMainOption[];
  suboptions: ISuboption[];
  onChange: (isChecked: boolean, option: ISuboption) => void;
}
