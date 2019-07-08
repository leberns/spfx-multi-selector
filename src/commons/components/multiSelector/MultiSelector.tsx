import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import MultiOptionsEditor from '../multiOptionsEditor/MultiOptionsEditor';
import SuboptionsRenderer from './suboptionsRenderer/SuboptionsRenderer';
import { RelationMap } from '../../relations/RelationMap';
import { IRelationalOption } from '../../../interfaces/IRelationalOption';
import { IRelationMap } from '../../relations/IRelationMap';

export default class MultiSelector extends React.Component<IMultiSelectorProps, IMultiSelectorState> {
  constructor(props: IMultiSelectorProps) {
    super(props);
    const suboptionsMap12 = new RelationMap([], []);
    const suboptionsMap23 = new RelationMap([], []);
    this.state = {
      suboptionsMap12,
      suboptionsMap23,
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
              defaultSelectedKeys={this.props.defaultSelectedKeys1}
              onChange={(isChecked: boolean, option: IRelationalOption) => this.onOptionLevel1Change(isChecked, option)}
            />
          </div>
          <div className={styles.selectorColumns}>
            <SuboptionsRenderer
              parentOptions={this.state.selectedOptionsLevel1}
              suboptionsMap={this.state.suboptionsMap12}
              defaultSelectedKeys={this.props.defaultSelectedKeys2}
              onUnlimitedOptionChange={(isChecked: boolean, suboption: IRelationalOption) =>
                this.onUnlimitedOptionLevel2Change(isChecked, suboption)
              }
            />
          </div>
          <div className={styles.selectorColumns}>
            <SuboptionsRenderer
              parentOptions={this.state.selectedOptionsLevel2}
              suboptionsMap={this.state.suboptionsMap23}
              defaultSelectedKeys={this.props.defaultSelectedKeys3}
              onUnlimitedOptionChange={(isChecked: boolean, suboption: IRelationalOption) =>
                this.onUnlimitedOptionLevel3Change(isChecked, suboption)
              }
              onSingleOptionChange={(suboption: IRelationalOption) => this.onSingleOptionLevel3Change(suboption)}
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
    this.updateState();
  }

  public componentDidUpdate(prevProps: IMultiSelectorProps): void {
    if (
      this.props.optionsLevel1.length !== prevProps.optionsLevel1.length ||
      this.props.optionsLevel2.length !== prevProps.optionsLevel2.length ||
      this.props.optionsLevel3.length !== prevProps.optionsLevel3.length
    ) {
      this.updateState();
    }
  }

  private updateState(): void {
    const [suboptionsMap12, suboptionsMap23] = this.initializeRelationsMap();
    const [
      selectedOptionsLevel1,
      selectedOptionsLevel2,
      selectedOptionsLevel3
    ] = this.initializeDefaultSelectedOptions();
    const hasOptionSelected = this.hasOptionSelected(selectedOptionsLevel2);

    this.setState({
      suboptionsMap12,
      suboptionsMap23,
      selectedOptionsLevel1,
      selectedOptionsLevel2,
      selectedOptionsLevel3,
      hasOptionSelected
    });
  }

  private initializeRelationsMap(): IRelationMap[] {
    const suboptionsMap12: IRelationMap = new RelationMap(this.props.optionsLevel1, this.props.optionsLevel2);
    suboptionsMap12.initialize();
    const suboptionsMap23: IRelationMap = new RelationMap(this.props.optionsLevel2, this.props.optionsLevel3);
    suboptionsMap23.initialize();

    return [suboptionsMap12, suboptionsMap23];
  }

  private initializeDefaultSelectedOptions(): IRelationalOption[][] {
    const selectedOptionsLevel1 = this.mergeOptions(
      this.props.defaultSelectedKeys1,
      this.state.selectedOptionsLevel1,
      this.props.optionsLevel1
    );

    const selectedOptionsLevel2 = this.mergeOptions(
      this.props.defaultSelectedKeys2,
      this.state.selectedOptionsLevel2,
      this.props.optionsLevel2
    );

    const selectedOptionsLevel3 = this.mergeOptions(
      this.props.defaultSelectedKeys3,
      this.state.selectedOptionsLevel3,
      this.props.optionsLevel3
    );

    return [selectedOptionsLevel1, selectedOptionsLevel2, selectedOptionsLevel3];
  }

  private mergeOptions(
    defaultSelectedKeys: string[],
    selectedOptions: IRelationalOption[],
    options: IRelationalOption[]
  ): IRelationalOption[] {
    const keysSet = new Set(defaultSelectedKeys);
    for (const op of selectedOptions) {
      keysSet.add(op.key);
    }

    const mergedKeys = [];
    keysSet.forEach(key => mergedKeys.push(key));
    const mergedOptions = [];
    for (const key of mergedKeys) {
      const opts = options.filter(op => op.key === key);
      if (opts.length > 0) {
        mergedOptions.push(opts[0]);
      }
    }

    if (!!mergedOptions) {
      return mergedOptions;
    }

    return [];
  }

  private hasOptionSelected(selectedOptionsLevel2: IRelationalOption[]): boolean {
    const hasOptionSelected = selectedOptionsLevel2.length > 0;
    return hasOptionSelected;
  }

  private onOptionLevel1Change(isChecked: boolean, option: IRelationalOption): void {
    if (isChecked) {
      const newSelectedOptionsLevel1 = [option, ...this.state.selectedOptionsLevel1];
      this.setState({
        selectedOptionsLevel1: newSelectedOptionsLevel1
      });
      return;
    }

    const selectedOptionsLevel1 = this.state.selectedOptionsLevel1.filter(op => op.key !== option.key);
    const selectedOptionsLevel2 = this.state.selectedOptionsLevel2.filter(op => op.parentKey !== option.key);
    const selectedOptionsLevel3 = this.state.selectedOptionsLevel3.filter(
      op => selectedOptionsLevel2.filter(parentOp => parentOp.key === op.parentKey).length > 0
    );
    const hasOptionSelected = this.hasOptionSelected(selectedOptionsLevel2);
    this.setState({
      selectedOptionsLevel1,
      selectedOptionsLevel2,
      selectedOptionsLevel3,
      hasOptionSelected
    });
  }

  private onUnlimitedOptionLevel2Change(isChecked: boolean, option: IRelationalOption): void {
    if (isChecked) {
      const newSel = [option, ...this.state.selectedOptionsLevel2];
      this.setState({
        selectedOptionsLevel2: newSel,
        hasOptionSelected: true
      });
      return;
    }

    const selectedOptionsLevel2 = this.state.selectedOptionsLevel2.filter(op => op.key !== option.key);
    const selectedOptionsLevel3 = this.state.selectedOptionsLevel3.filter(op => op.parentKey !== option.key);
    const hasOptionSelected = selectedOptionsLevel2.length > 0;
    this.setState({ selectedOptionsLevel2, selectedOptionsLevel3, hasOptionSelected });
  }

  private onUnlimitedOptionLevel3Change(isChecked: boolean, option: IRelationalOption): void {
    if (isChecked) {
      const newSel = [option, ...this.state.selectedOptionsLevel3];
      this.setState({ selectedOptionsLevel3: newSel });
      return;
    }

    const selectedOptionsLevel3 = this.state.selectedOptionsLevel3.filter(op => op.key !== option.key);
    this.setState({ selectedOptionsLevel3 });
  }

  private onSingleOptionLevel3Change(option: IRelationalOption): void {
    const remainingOptions = this.state.selectedOptionsLevel3.filter(op => op.parentKey !== option.parentKey);
    const selectedOptionsLevel3 = [option, ...remainingOptions];
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
