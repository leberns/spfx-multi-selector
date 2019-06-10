import * as React from 'react';

import { ISuboptionsProviderProps } from './ISuboptionsProviderProps';
import { ISuboptionsProviderState } from './ISuboptionsProviderState';
import SuboptionsRenderer from '../suboptionsRenderer/SuboptionsRenderer';
import { ISuboption } from '../../../../interfaces/ISuboption';

export default class SuboptionsProvider extends React.Component<ISuboptionsProviderProps, ISuboptionsProviderState> {
  constructor(props: ISuboptionsProviderProps) {
    super(props);
    this.state = {
      mainOptionsSuboptions: []
    };
  }

  public render(): React.ReactElement<ISuboptionsProviderProps> {
    return (
      <div>
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
