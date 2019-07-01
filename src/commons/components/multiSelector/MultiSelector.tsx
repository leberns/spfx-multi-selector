import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import MultiOptionsEditor from '../multiOptionsEditor/MultiOptionsEditor';
import SuboptionsRenderer from './suboptionsRenderer/SuboptionsRenderer';
import { RelationMap } from '../../relations/RelationMap';
import { IRelationMap } from '../../relations/IRelationMap';
import { OptionsComparer } from '../../comparers/OptionsComparer';
import { IOptionItem } from '../../../interfaces/IOptionItem';

export default class MultiSelector extends React.Component<IMultiSelectorProps, IMultiSelectorState> {
  private suboptionsMap12: IRelationMap;
  private suboptionsMap23: IRelationMap;

  constructor(props: IMultiSelectorProps) {
    super(props);
    this.state = {
      optionsLevel2: this.props.optionsLevel2,
      optionsLevel3: this.props.optionsLevel3,
      selectedOptionsLevel1: [],
      selectedOptionsLevel2: [],
      selectedOptionsLevel3: [],
      hasOptionSelected: false
    };
  }

  public render(): React.ReactElement<IMultiSelectorProps> {
    const allowComplete = !this.state.hasOptionSelected;
    return (
      <div className={styles.multiSelector}>
        <div className={styles.row}>
          <div className={styles.selectorColumns}>
            <MultiOptionsEditor
              options={this.props.optionsLevel1}
              onChange={(isChecked: boolean, option: IOptionItem) => this.onOptionChange1(isChecked, option)}
            />
          </div>
          <div className={styles.selectorColumns}>
            <SuboptionsRenderer
              selectedParentOptions={this.state.selectedOptionsLevel1}
              suboptions={this.state.optionsLevel2}
              suboptionsMap={this.suboptionsMap12}
              onUnlimitedOptionChange={(isChecked: boolean, suboption: IOptionItem) =>
                this.onUnlimitedOptionChange2(isChecked, suboption, this.state.selectedOptionsLevel2)
              }
            />
          </div>
          <div className={styles.selectorColumns}>
            <SuboptionsRenderer
              selectedParentOptions={this.state.selectedOptionsLevel2}
              suboptions={this.props.optionsLevel3}
              suboptionsMap={this.suboptionsMap23}
              onUnlimitedOptionChange={(isChecked: boolean, suboption: IOptionItem) =>
                this.onUnlimitedOptionChange3(isChecked, suboption, this.state.selectedOptionsLevel3)
              }
              onSingleOptionChange={(suboption: IOptionItem) => this.onSingleOptionChange3(suboption)}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <PrimaryButton disabled={allowComplete} text="Select" onClick={() => this.onSelectionComplete()} />
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    this.initializeSuboptionsMap();
    this.setStateWithSortedOptions();
  }

  public componentDidUpdate(prevProps: IMultiSelectorProps): void {
    this.initializeSuboptionsMap();
    if (this.props.optionsLevel2.length !== prevProps.optionsLevel2.length) {
      this.setStateWithSortedOptions();
    }
  }

  private initializeSuboptionsMap(): void {
    this.suboptionsMap12 = new RelationMap(this.props.optionsLevel1, this.props.optionsLevel2);
    this.suboptionsMap12.initializeRelations();
    this.suboptionsMap23 = new RelationMap(this.props.optionsLevel2, this.props.optionsLevel3);
    this.suboptionsMap23.initializeRelations();
  }

  public setStateWithSortedOptions(): void {
    const comparer = new OptionsComparer();
    const optionsLevel2 = this.props.optionsLevel2.sort((a, b) => comparer.compare(a, b));
    this.setState({
      optionsLevel2
    });
    const optionsLevel3 = this.props.optionsLevel3.sort((a, b) => comparer.compare(a, b));
    this.setState({
      optionsLevel3
    });
  }

  private onOptionChange1(isChecked: boolean, optionLevel1: IOptionItem): void {
    if (isChecked) {
      const newSelectedOptionsLevel1 = [optionLevel1, ...this.state.selectedOptionsLevel1];
      this.setState({
        selectedOptionsLevel1: newSelectedOptionsLevel1
      });
      return;
    }

    const selectedOptionsLevel1 = this.state.selectedOptionsLevel1.filter(op => op.key !== optionLevel1.key);
    const selectedOptionsLevel2 = this.clearRelatedSuboptions(
      optionLevel1.key,
      this.state.selectedOptionsLevel2,
      this.suboptionsMap12
    );
    this.setState({
      selectedOptionsLevel1,
      selectedOptionsLevel2
    });
  }

  private clearRelatedSuboptions(
    parentKey: string,
    options: IOptionItem[],
    suboptionsMap: IRelationMap
  ): IOptionItem[] {
    let newSelectedSuboptions: IOptionItem[];
    const relatedSuboptions = suboptionsMap.getChildren(parentKey);
    relatedSuboptions.forEach(relatedSuboption => {
      newSelectedSuboptions = options.filter(op => op.key !== relatedSuboption.key);
    });
    return newSelectedSuboptions;
  }

  private onUnlimitedOptionChange2(isChecked: boolean, option: IOptionItem, selectedOptions: IOptionItem[]): void {
    const selectedOptionsLevel2 = this.updateOptions(isChecked, option, selectedOptions);
    const hasOptionSelected = selectedOptionsLevel2.length > 0;
    this.setState({
      selectedOptionsLevel2,
      hasOptionSelected
    });
  }

  private onUnlimitedOptionChange3(isChecked: boolean, option: IOptionItem, selectedOptions: IOptionItem[]): void {
    const selectedOptionsLevel3 = this.updateOptions(isChecked, option, selectedOptions);
    this.setState({
      selectedOptionsLevel3
    });
  }

  private updateOptions(isChecked: boolean, option: IOptionItem, selectedOptions: IOptionItem[]): IOptionItem[] {
    if (isChecked) {
      const newSel = [option, ...selectedOptions];
      return newSel;
    }

    const newSelectedOptions = selectedOptions.filter(op => op.key !== option.key);
    return newSelectedOptions;
  }

  private onSingleOptionChange3(option: IOptionItem): void {
    const currentOptions = this.state.selectedOptionsLevel3;
    const optionsNoSameParent = currentOptions.filter(op => op.parentKey !== option.parentKey);
    const selectedOptionsLevel3 = [option, ...optionsNoSameParent];
    this.setState({
      selectedOptionsLevel3
    });
  }

  private onSelectionComplete(): void {
    this.props.onSelectionComplete(
      this.state.selectedOptionsLevel1,
      this.state.selectedOptionsLevel2,
      this.state.selectedOptionsLevel3
    );
  }
}
