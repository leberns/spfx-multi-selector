import * as React from 'react';

import { ISuboptionsRendererProps } from './ISuboptionsRendererProps';
import { ISuboptionsRendererState } from './ISuboptionsRendererState';
import ChildOptionsRenderer from '../childOptionsRenderer/ChildOptionsRenderer';
import { ISuboption } from '../../../../interfaces/ISuboption';
import { OptionsComparer } from '../../../../commons/comparers/OptionsComparer';

export default class SuboptionsRenderer extends React.Component<ISuboptionsRendererProps, ISuboptionsRendererState> {
  constructor(props: ISuboptionsRendererProps) {
    super(props);
    this.state = {
      sortedMainOptions: []
    };
  }

  public render(): React.ReactElement<ISuboptionsRendererProps> {
    return (
      <div>
        {this.state.sortedMainOptions.map(mainOption => (
          <ChildOptionsRenderer
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

  public componentDidUpdate(prevProps: ISuboptionsRendererProps): void {
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
