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
            key={mainOption.id}
            mainOption={mainOption}
            relatedSuboptions={this.getRelatedSuboptions(mainOption.id)}
            onUnlimitedSuboptionChange={(isChecked: boolean, suboption: ISuboption) =>
              this.props.onUnlimitedSuboptionChange(isChecked, suboption)
            }
            onSingleSuboptionChange={(suboption: ISuboption) =>
              this.props.onSingleSuboptionChange(mainOption, suboption)
            }
          />
        ))}
      </div>
    );
  }

  private getRelatedSuboptions(id: number): ISuboption[] {
    let suboptions = this.state.mainOptionsSuboptions[id];
    if (suboptions === undefined) {
      suboptions = [];
    }
    return suboptions;
  }

  public componentDidUpdate(prevProps: ISuboptionsProviderProps): void {
    if (this.props.selectedMainOptions.length !== prevProps.selectedMainOptions.length) {
      this.defineRelatedSuboptions();
    }
  }

  private defineRelatedSuboptions(): void {
    const mainOptionsSuboptions: object = {};
    for (const mainOption of this.props.selectedMainOptions) {
      const parentId = mainOption.id;
      const relatedSuboptions = this.props.suboptions.filter(op => op.parentId === parentId);
      mainOptionsSuboptions[parentId] = relatedSuboptions;
    }
    this.setState({
      mainOptionsSuboptions
    });
  }
}
