import * as React from 'react';

import { IParentsSuboptionsRendererProps } from './IParentsSuboptionsRendererProps';
import { IParentsSuboptionsRendererState } from './IParentSuboptionsRendererState';
import SuboptionsRenderer from '../suboptionsRenderer/SuboptionsRenderer';
import { ISuboption } from '../../../../interfaces/ISuboption';
import { OptionsComparer } from '../../../comparers/OptionsComparer';

export default class ParentsSuboptionsRenderer extends React.Component<
  IParentsSuboptionsRendererProps,
  IParentsSuboptionsRendererState
> {
  constructor(props: IParentsSuboptionsRendererProps) {
    super(props);
    this.state = {
      sortedMainOptions: []
    };
  }

  public render(): React.ReactElement<IParentsSuboptionsRendererProps> {
    return (
      <div>
        {this.state.sortedMainOptions.map(mainOption => (
          <SuboptionsRenderer
            key={mainOption.key}
            mainOption={mainOption}
            relatedSuboptions={this.props.suboptionsMap.getChildren(mainOption.key)}
            onUnlimitedSuboptionChange={(isChecked: boolean, suboption: ISuboption) =>
              this.props.onUnlimitedSuboptionChange(isChecked, suboption)
            }
            onSingleSuboptionChange={(suboption: ISuboption) => this.props.onSingleSuboptionChange(suboption)}
          />
        ))}
      </div>
    );
  }

  public componentDidMount(): void {
    this.sortOptionsUpdateState();
  }

  public componentDidUpdate(prevProps: IParentsSuboptionsRendererProps): void {
    if (this.props.selectedMainOptions.length !== prevProps.selectedMainOptions.length) {
      this.sortOptionsUpdateState();
    }
  }

  public sortOptionsUpdateState(): void {
    const comparer = new OptionsComparer();
    const sortedMainOptions = this.props.selectedMainOptions.sort((a, b) => comparer.compare(a, b));
    this.setState({
      sortedMainOptions
    });
  }
}
