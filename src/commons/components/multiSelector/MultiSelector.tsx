import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';

import styles from './MultiSelector.module.scss';
import { IMultiSelectorProps } from './IMultiSelectorProps';
import { IMultiSelectorState } from './IMultiSelectorState';
import MultiOptionsEditor from '../multiOptionsEditor/MultiOptionsEditor';
import SuboptionsRenderer from './suboptionsRenderer/SuboptionsRenderer';
import { RelationMap } from '../../relations/RelationMap';
import { IRelationalOption } from '../../../interfaces/IRelationalOption';

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
              onChange={(isChecked: boolean, option: IRelationalOption) => this.onOptionLevel1Change(isChecked, option)}
            />
          </div>
          <div className={styles.selectorColumns}>
            <SuboptionsRenderer
              parentOptions={this.state.selectedOptionsLevel1}
              suboptionsMap={this.state.suboptionsMap12}
              onUnlimitedOptionChange={(isChecked: boolean, suboption: IRelationalOption) =>
                this.onUnlimitedOptionLevel2Change(isChecked, suboption)
              }
            />
          </div>
          <div className={styles.selectorColumns}>
            <SuboptionsRenderer
              parentOptions={this.state.selectedOptionsLevel2}
              suboptionsMap={this.state.suboptionsMap23}
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
    this.updateStateRelationsMap();
  }

  public componentDidUpdate(prevProps: IMultiSelectorProps): void {
    if (
      this.props.optionsLevel1.length !== prevProps.optionsLevel1.length ||
      this.props.optionsLevel2.length !== prevProps.optionsLevel2.length ||
      this.props.optionsLevel3.length !== prevProps.optionsLevel3.length
    ) {
      this.updateStateRelationsMap();
    }
  }

  private updateStateRelationsMap(): void {
    const suboptionsMap12 = new RelationMap(this.props.optionsLevel1, this.props.optionsLevel2);
    suboptionsMap12.initialize();
    const suboptionsMap23 = new RelationMap(this.props.optionsLevel2, this.props.optionsLevel3);
    suboptionsMap23.initialize();

    this.setState({ suboptionsMap12, suboptionsMap23 });
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
    const hasOptionSelected = selectedOptionsLevel2.length > 0;
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
