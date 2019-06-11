import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import OptionsArray from '../optionsArray/OptionsArray';
import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';
import SuboptionsProvider from '../suboptionsProvider/SuboptionsProvider';
import { SelectionAllowance } from '../../../../enums/SelectionAllowance';

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
              onChange={(option: IMainOption, isChecked: boolean) => this.onMainOptionChange(option, isChecked)}
            />
          </div>
          <div className={styles.halfColumns}>
            <SuboptionsProvider
              selectedMainOptions={this.state.selectedMainOptions}
              suboptions={this.props.suboptions}
              onUnlimitedSuboptionChange={(suboption: ISuboption, isChecked: boolean) =>
                this.onUnlimitedSuboptionChange(isChecked, suboption)
              }
              onSingleSuboptionChange={(suboption: ISuboption, mainOption: IMainOption) =>
                this.onSingleSuboptionChange(suboption, mainOption)
              }
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

  private onMainOptionChange(option: IMainOption, isChecked: boolean): void {
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
    const newSelectedOptions = selectedOptions.filter(op => {
      if (op.id !== option.id) {
        return op;
      }
    });
    return newSelectedOptions;
  }

  private onUnlimitedSuboptionChange(isChecked: boolean, suboption: ISuboption): void {
    this.updateSuboptionsState(isChecked, suboption, this.state.selectedSuboptions);
  }

  private updateSuboptionsState(isChecked: boolean, suboption: ISuboption, currentSelection: ISuboption[]): void {
    const selectedSuboptions = this.updateSelectedOptions<ISuboption>(isChecked, suboption, currentSelection);

    this.setState({
      selectedSuboptions
    });

    console.log(isChecked, suboption.title, suboption.id, selectedSuboptions);
  }

  private onSingleSuboptionChange(suboption: ISuboption, mainOption: IMainOption): void {
    let currentSelection = this.state.selectedSuboptions;
    if (mainOption.selectionAllowance === SelectionAllowance.Single) {
      const parentId = mainOption.id;
      const previousSuboptions = currentSelection.filter(op => op.parentId === parentId);
      if (previousSuboptions.length > 0) {
        const previousSuboption = previousSuboptions[0];
        currentSelection = this.removeSelectedOption<ISuboption>(previousSuboption, currentSelection);
      }
    }
    this.updateSuboptionsState(true, suboption, currentSelection);
  }

  private onSelectionComplete(): void {
    this.props.onSelectionComplete(this.state.selectedMainOptions, this.state.selectedSuboptions);
  }
}
