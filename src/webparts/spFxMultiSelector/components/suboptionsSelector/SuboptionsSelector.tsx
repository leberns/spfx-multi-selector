import * as React from 'react';

import styles from './SuboptionsSelector2.module.scss';
import { ISuboptionsSelectorProps } from './ISuboptionsSelectorProps';
import { ISuboptionsSelectorState } from './ISuboptionsSelectorState';
import SuboptionsRenderer from '../suboptionsRenderer/SuboptionsRenderer';
import { ISuboption } from '../../../../interfaces/ISuboption';

export default class SuboptionsSelector extends React.Component<ISuboptionsSelectorProps, ISuboptionsSelectorState> {
  constructor(props: ISuboptionsSelectorProps) {
    super(props);
    this.state = {
      mainOptionsSuboptions: []
    };
  }

  public render(): React.ReactElement<ISuboptionsSelectorProps> {
    return (
      <div className={styles.suboptionsSelector}>
        {this.props.selectedMainOptions.map(mainOption => (
          <SuboptionsRenderer
            mainOption={mainOption}
            options={this.state.mainOptionsSuboptions[mainOption.id]}
            onChange={(isChecked: boolean, option: ISuboption) => this.onChange(isChecked, option)}
          />
        ))}
      </div>
    );
  }

  public componentDidMount(): void {
    this.defineRelatedSuboptions();
  }

  private defineRelatedSuboptions(): void {
    const mainOptionsSuboptions: object = {};
    for (const mainOption of this.props.selectedMainOptions) {
      const parentId = mainOption.id;
      const relatedSuboptions = this.props.suboptions.map(op => op.parentId === parentId);
      mainOptionsSuboptions[parentId] = relatedSuboptions;
    }
    this.setState({
      mainOptionsSuboptions
    });
  }

  private onChange(isChecked: boolean, option: ISuboption): void {
    this.props.onChange(isChecked, option);
  }
}
