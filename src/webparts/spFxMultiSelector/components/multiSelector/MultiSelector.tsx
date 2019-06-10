import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISubOption } from '../../../../interfaces/ISubOption';
import OptionsArray from '../optionsArray/OptionsArray';

export default class MultiSelector extends React.Component<IMultiSelectorProps, IMultiSelectorState> {
  constructor(props: IMultiSelectorProps) {
    super(props);
    this.state = {
      selectedMainOptions: [],
      selectedSubOptions: [],
      hasMainOptionSelected: false
    };
  }
  public render(): React.ReactElement<IMultiSelectorProps> {
    return (
      <div>
        <div className={styles.multiSelector}>
          <OptionsArray
            options={this.props.mainOptions}
            onChange={(isChecked: boolean, option: IMainOption) => this.onMainChange(isChecked, option)}
          />
        </div>
        <div>
          <PrimaryButton
            disabled={!this.state.hasMainOptionSelected}
            text="Select"
            onClick={() => this.onSelectionComplete()}
          />
        </div>
      </div>
    );
  }

  private onMainChange(isChecked: boolean, option: IMainOption): void {
    let newSelections: IMainOption[] = [];
    if (isChecked) {
      newSelections = [option, ...this.state.selectedMainOptions];
    } else {
      newSelections = this.state.selectedMainOptions.filter(op => {
        if (op.id !== option.id) {
          return op;
        }
      });
    }

    const hasMainOptionSelected = newSelections.length > 0;

    this.setState({
      selectedMainOptions: newSelections,
      hasMainOptionSelected
    });

    console.log(isChecked, option.title, option.id, newSelections);
  }

  private onSelectionComplete(): void {
    this.props.onSelectionComplete(this.state.selectedMainOptions, this.state.selectedSubOptions);
  }
}
