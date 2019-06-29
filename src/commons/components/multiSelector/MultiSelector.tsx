import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import MultiOptionsEditor from '../multiOptionsEditor/MultiOptionsEditor';
import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import SuboptionsRenderer from './suboptionsRenderer/SuboptionsRenderer';
import { RelationMap } from '../../relations/RelationMap';
import { IRelationMap } from '../../relations/IRelationMap';
import { OptionsComparer } from '../../comparers/OptionsComparer';
import { IOptionItem } from '../../../interfaces/IOptionItem';

export default class MultiSelector extends React.Component<IMultiSelectorProps, IMultiSelectorState> {
  private suboptionsMap: IRelationMap;

  constructor(props: IMultiSelectorProps) {
    super(props);
    this.state = {
      optionsLevel2: this.props.optionsLevel2,
      selectedOptionsLevel2: [],
      selectedOptionsLevel3: [],
      hasOptionSelected: false
    };
  }

  public render(): React.ReactElement<IMultiSelectorProps> {
    const allowComplete = !this.state.hasOptionSelected;
    const completeLabel = 'Select';
    return (
      <div className={styles.multiSelector}>
        <div className={styles.row}>
          <div className={styles.halfColumns}>
            <MultiOptionsEditor
              options={this.state.optionsLevel2}
              onChange={(isChecked: boolean, option: IOptionItem) => this.onMainOptionChange(isChecked, option)}
            />
          </div>
          <div className={styles.halfColumns}>
            <SuboptionsRenderer
              selectedParentOptions={this.state.selectedOptionsLevel2}
              suboptions={this.props.optionsLevel3}
              suboptionsMap={this.suboptionsMap}
              onUnlimitedSuboptionChange={(isChecked: boolean, suboption: IOptionItem) =>
                this.onUnlimitedSuboptionChange(isChecked, suboption)
              }
              onSingleSuboptionChange={(suboption: IOptionItem) => this.onSingleSuboptionChange(suboption)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
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
    if (this.props.optionsLevel2.length !== prevProps.optionsLevel2.length) {
      this.sortOptionsUpdateState();
    }
  }

  private initializeSuboptionsMap(): void {
    this.suboptionsMap = new RelationMap(this.props.optionsLevel2, this.props.optionsLevel3);
    this.suboptionsMap.initializeRelations();
  }

  public sortOptionsUpdateState(): void {
    const comparer = new OptionsComparer();
    const sortedMainOptions = this.props.optionsLevel2.sort((a, b) => comparer.compare(a, b));
    this.setState({
      optionsLevel2: sortedMainOptions
    });
  }

  private onMainOptionChange(isChecked: boolean, mainOption: IOptionItem): void {
    let newSelectedMainOptions: IOptionItem[];
    let newSelectedSuboptions: IOptionItem[];
    if (isChecked) {
      newSelectedMainOptions = [mainOption, ...this.state.selectedOptionsLevel2];
      newSelectedSuboptions = this.state.selectedOptionsLevel3;
    } else {
      newSelectedMainOptions = this.state.selectedOptionsLevel2.filter(op => op.key !== mainOption.key);
      newSelectedSuboptions = this.clearRelatedSuboptions(mainOption.key);
    }

    const hasOptionSelected = newSelectedMainOptions.length > 0;

    this.setState({
      selectedOptionsLevel2: newSelectedMainOptions,
      hasOptionSelected,
      selectedOptionsLevel3: newSelectedSuboptions
    });
  }

  private clearRelatedSuboptions(parentKey: string): IOptionItem[] {
    let newSelectedSuboptions = this.state.selectedOptionsLevel3;
    const relatedSuboptions = this.suboptionsMap.getChildren(parentKey);
    relatedSuboptions.forEach(relatedSuboption => {
      newSelectedSuboptions = newSelectedSuboptions.filter(op => op.key !== relatedSuboption.key);
    });
    return newSelectedSuboptions;
  }

  private onUnlimitedSuboptionChange(isChecked: boolean, suboption: IOptionItem): void {
    this.updateSuboptionsState(isChecked, suboption, this.state.selectedOptionsLevel3);
  }

  private updateSuboptionsState(
    isChecked: boolean,
    suboption: IOptionItem,
    selectedOptionsLevel3: IOptionItem[]
  ): void {
    let newSelectedSuboptions: IOptionItem[];
    if (isChecked) {
      newSelectedSuboptions = [suboption, ...selectedOptionsLevel3];
    } else {
      newSelectedSuboptions = selectedOptionsLevel3.filter(op => op.key !== suboption.key);
    }

    this.setState({
      selectedOptionsLevel3: newSelectedSuboptions
    });
  }

  private onSingleSuboptionChange(suboption: IOptionItem): void {
    const newSelectedSuboptions = this.clearRelatedSuboptions(suboption.parentKey);
    this.updateSuboptionsState(true, suboption, newSelectedSuboptions);
  }

  private onSelectionComplete(): void {
    this.props.onSelectionComplete(this.state.selectedOptionsLevel2, this.state.selectedOptionsLevel3);
  }
}
