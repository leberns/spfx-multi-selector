import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import OptionsArray from '../optionsArray/OptionsArray';
import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';

export default class MultiSelector extends React.Component<IMultiSelectorProps, IMultiSelectorState> {
  constructor(props: IMultiSelectorProps) {
    super(props);
    this.state = {
      selectedMainOptions: [],
      selectedSuboptions: [],
      hasMainOptionSelected: false
    };
  }

  public render(): React.ReactElement<IMultiSelectorProps> {
    return (
      <div className={styles.multiSelector}>
        <div className={styles.row}>
          <div className={styles.halfColumns}>
            <OptionsArray
              options={this.props.mainOptions}
              onChange={(isChecked: boolean, option: IMainOption) => this.onMainOptionChange(isChecked, option)}
            />
          </div>
          <div className={styles.halfColumns}>
            <OptionsArray
              options={this.props.subOptions}
              onChange={(isChecked: boolean, option: ISuboption) => this.onSubOptionChange(isChecked, option)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.halfColumns}>
            <PrimaryButton
              disabled={!this.state.hasMainOptionSelected}
              text="Select"
              onClick={() => this.onSelectionComplete()}
            />
          </div>
        </div>
      </div>
    );
  }

  private onMainOptionChange(isChecked: boolean, option: IMainOption): void {
    const newSelectedOptions = this.updateSelectedOptions<IMainOption>(
      isChecked,
      option,
      this.state.selectedMainOptions
    );
    const hasMainOptionSelected = newSelectedOptions.length > 0;

    this.setState({
      selectedMainOptions: newSelectedOptions,
      hasMainOptionSelected
    });

    console.log(isChecked, option.title, option.id, newSelectedOptions);
  }

  private updateSelectedOptions<T extends IOptionItem>(isChecked: boolean, option: T, selectedOptions: T[]): T[] {
    let newSelectedOptions: T[];
    if (isChecked) {
      newSelectedOptions = this.addSelectedOption<T>(option, selectedOptions);
    } else {
      newSelectedOptions = this.removeSelectedOption<T>(option, selectedOptions);
    }
    return newSelectedOptions;
  }

  private addSelectedOption<T extends IOptionItem>(option: T, selectedOptions: T[]): T[] {
    const newOptions = [option, ...selectedOptions];
    return newOptions;
  }

  private removeSelectedOption<T extends IOptionItem>(option: T, selectedOptions: T[]): T[] {
    const newOptions = selectedOptions.filter(op => {
      if (op.id !== option.id) {
        return op;
      }
    });
    return newOptions;
  }

  private onSubOptionChange(isChecked: boolean, option: ISuboption): void {
    const newSelectedOptions = this.updateSelectedOptions<ISuboption>(isChecked, option, this.state.selectedSuboptions);

    this.setState({
      selectedSuboptions: newSelectedOptions
    });

    console.log(isChecked, option.title, option.id, newSelectedOptions);
  }

  private onSelectionComplete(): void {
    this.props.onSelectionComplete(this.state.selectedMainOptions, this.state.selectedSuboptions);
  }
}
