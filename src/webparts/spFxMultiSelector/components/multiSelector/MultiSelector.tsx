import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import MultiOptionsEditor from '../multiOptionsEditor/MultiOptionsEditor';
import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { IMainOption } from '../../../../interfaces/IMainOption';
import { ISuboption } from '../../../../interfaces/ISuboption';
import SuboptionsRenderer from '../suboptionsRenderer/SuboptionsRenderer';
import { SelectionAllowance } from '../../../../enums/SelectionAllowance';
import { RelationMap } from '../../../../commons/relations/RelationMap';
import { IRelationMap } from '../../../../commons/relations/IRelationMap';
import { OptionsComparer } from '../../../../commons/comparers/OptionsComparer';

export default class MultiSelector extends React.Component<IMultiSelectorProps, IMultiSelectorState> {
  private suboptionsMap: IRelationMap;

  constructor(props: IMultiSelectorProps) {
    super(props);
    this.state = {
      mainOptions: this.props.mainOptions,
      selectedMainOptions: [],
      selectedSuboptions: [],
      hasMainOptionSelected: false
    };
  }

  public render(): React.ReactElement<IMultiSelectorProps> {
    const allowComplete = !this.state.hasMainOptionSelected;
    const completeLabel = 'Select';
    return (
      <div className={styles.multiSelector}>
        <div className={styles.row}>
          <div className={styles.halfColumns}>
            <MultiOptionsEditor
              options={this.state.mainOptions}
              onChange={(isChecked: boolean, option: IMainOption) => this.onMainOptionChange(isChecked, option)}
            />
          </div>
          <div className={styles.halfColumns}>
            <SuboptionsRenderer
              selectedMainOptions={this.state.selectedMainOptions}
              suboptions={this.props.suboptions}
              suboptionsMap={this.suboptionsMap}
              onUnlimitedSuboptionChange={(isChecked: boolean, suboption: ISuboption) =>
                this.onUnlimitedSuboptionChange(isChecked, suboption)
              }
              onSingleSuboptionChange={(suboption: ISuboption) => this.onSingleSuboptionChange(suboption)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.halfColumns}>
            <PrimaryButton disabled={allowComplete} text={completeLabel} onClick={() => this.onSelectionComplete()} />
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    this.initializeSuboptionsMap();
    this.sortOptionsUpdateState();
  }

  public componentDidUpdate(prevProps: IMultiSelectorProps): void {
    this.initializeSuboptionsMap();
    if (this.props.mainOptions.length !== prevProps.mainOptions.length) {
      this.sortOptionsUpdateState();
    }
  }

  private initializeSuboptionsMap(): void {
    this.suboptionsMap = new RelationMap(this.props.mainOptions, this.props.suboptions);
    this.suboptionsMap.initializeRelations();
  }

  public sortOptionsUpdateState(): void {
    const comparer = new OptionsComparer();
    const sortedMainOptions = this.props.mainOptions.sort((a, b) => comparer.compare(a, b));
    this.setState({
      mainOptions: sortedMainOptions
    });
  }

  private onMainOptionChange(isChecked: boolean, mainOption: IMainOption): void {
    let newSelectedMainOptions: IMainOption[];
    let newSelectedSuboptions: ISuboption[];
    if (isChecked) {
      newSelectedMainOptions = [mainOption, ...this.state.selectedMainOptions];
      newSelectedSuboptions = this.state.selectedSuboptions;
    } else {
      newSelectedMainOptions = this.state.selectedMainOptions.filter(op => op.key !== mainOption.key);
      newSelectedSuboptions = this.clearRelatedSuboptions(mainOption.key);
    }

    const hasMainOptionSelected = newSelectedMainOptions.length > 0;

    this.setState({
      selectedMainOptions: newSelectedMainOptions,
      hasMainOptionSelected,
      selectedSuboptions: newSelectedSuboptions
    });
  }

  private clearRelatedSuboptions(parentKey: string): ISuboption[] {
    let newSelectedSuboptions = this.state.selectedSuboptions;
    const relatedSuboptions = this.suboptionsMap.getChildren(parentKey);
    relatedSuboptions.forEach(relatedSuboption => {
      newSelectedSuboptions = newSelectedSuboptions.filter(op => op.key === relatedSuboption.key);
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
      newSelectedSuboptions = selectedSuboptions.filter(op => op.key !== suboption.key);
    }

    this.setState({
      selectedSuboptions: newSelectedSuboptions
    });
  }

  private onSingleSuboptionChange(suboption: ISuboption): void {
    const newSelectedSuboptions = this.clearRelatedSuboptions(suboption.parentKey);
    this.updateSuboptionsState(true, suboption, newSelectedSuboptions);
  }

  private onSelectionComplete(): void {
    this.props.onSelectionComplete(this.state.selectedMainOptions, this.state.selectedSuboptions);
  }
}
