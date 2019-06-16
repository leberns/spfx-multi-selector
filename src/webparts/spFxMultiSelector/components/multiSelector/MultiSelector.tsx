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
import { RelationMap } from '../../../../commons/relations/RelationMap';
import { IRelationMap } from '../../../../commons/relations/IRelationMap';

export default class MultiSelector extends React.Component<IMultiSelectorProps, IMultiSelectorState> {
  private optionsMap: IRelationMap;

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
            <SuboptionsProvider
              selectedMainOptions={this.state.selectedMainOptions}
              suboptions={this.props.suboptions}
              onUnlimitedSuboptionChange={(isChecked: boolean, suboption: ISuboption) =>
                this.onUnlimitedSuboptionChange(isChecked, suboption)
              }
              onSingleSuboptionChange={(mainOption: IMainOption, suboption: ISuboption) =>
                this.onSingleSuboptionChange(mainOption, suboption)
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

  private onMainOptionChange(isChecked: boolean, mainOption: IMainOption): void {
    let newSelectedMainOptions: IMainOption[];
    let newSelectedSuboptions = this.state.selectedSuboptions;
    if (isChecked) {
      newSelectedMainOptions = [mainOption, ...this.state.selectedMainOptions];
    } else {
      newSelectedMainOptions = this.state.selectedMainOptions.filter(op => op.id !== mainOption.id);
      newSelectedSuboptions = this.clearRelatedSuboptions(mainOption);
    }

    const hasMainOptionSelected = newSelectedMainOptions.length > 0;

    this.setState({
      selectedMainOptions: newSelectedMainOptions,
      hasMainOptionSelected,
      selectedSuboptions: newSelectedSuboptions
    });
  }

  private clearRelatedSuboptions(mainOption: IMainOption): ISuboption[] {
    if (!this.optionsMap) {
      this.optionsMap = new RelationMap(this.props.mainOptions, this.props.suboptions);
      this.optionsMap.initializeRelations();
    }

    let newSelectedSuboptions = this.state.selectedSuboptions;
    const relatedSuboptions = this.optionsMap.getChildren(mainOption.id);
    relatedSuboptions.forEach(relatedSuboption => {
      newSelectedSuboptions = newSelectedSuboptions.filter(op => op.id === relatedSuboption.id);
    });
    return newSelectedSuboptions;
  }

  private onUnlimitedSuboptionChange(isChecked: boolean, suboption: ISuboption): void {
    this.updateSuboptionsState(isChecked, suboption, this.state.selectedSuboptions);
  }

  private updateSuboptionsState(isChecked: boolean, suboption: ISuboption, selectedSuboptions: ISuboption[]): void {
    let newSelectedSuboptions: ISuboption[];
    if (isChecked) {
      newSelectedSuboptions = [suboption, ...selectedSuboptions];
    } else {
      newSelectedSuboptions = selectedSuboptions.filter(op => op.id !== suboption.id);
    }

    this.setState({
      selectedSuboptions: newSelectedSuboptions
    });
  }

  private onSingleSuboptionChange(mainOption: IMainOption, suboption: ISuboption): void {
    const selectedSuboptions = this.state.selectedSuboptions;
    const newSelections = selectedSuboptions.filter(op => op.parentId !== mainOption.id);
    this.updateSuboptionsState(true, suboption, newSelections);
  }

  private onSelectionComplete(): void {
    this.props.onSelectionComplete(this.state.selectedMainOptions, this.state.selectedSuboptions);
  }
}
