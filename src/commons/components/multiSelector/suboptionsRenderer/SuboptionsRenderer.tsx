import * as React from 'react';

import { ISuboptionsRendererProps } from './ISuboptionsRendererProps';
import { ISuboptionsRendererState } from './ISuboptionsRendererState';
import OptionsRenderer from '../optionsRenderer/OptionsRenderer';
import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { OptionsComparer } from '../../../comparers/OptionsComparer';

export default class SuboptionsRenderer extends React.Component<ISuboptionsRendererProps, ISuboptionsRendererState> {
  constructor(props: ISuboptionsRendererProps) {
    super(props);
    this.state = {
      sortedParentOptions: []
    };
  }

  public render(): React.ReactElement<ISuboptionsRendererProps> {
    return (
      <div>
        {this.state.sortedParentOptions.map(mainOption => (
          <OptionsRenderer
            key={mainOption.key}
            parentOption={mainOption}
            suboptions={this.props.suboptionsMap.getChildren(mainOption.key)}
            onUnlimitedSuboptionChange={(isChecked: boolean, suboption: IOptionItem) =>
              this.props.onUnlimitedSuboptionChange(isChecked, suboption)
            }
            onSingleSuboptionChange={(suboption: IOptionItem) => this.props.onSingleSuboptionChange(suboption)}
          />
        ))}
      </div>
    );
  }

  public componentDidMount(): void {
    this.sortOptionsUpdateState();
  }

  public componentDidUpdate(prevProps: ISuboptionsRendererProps): void {
    if (this.props.selectedParentOptions.length !== prevProps.selectedParentOptions.length) {
      this.sortOptionsUpdateState();
    }
  }

  public sortOptionsUpdateState(): void {
    const comparer = new OptionsComparer();
    const sortedParentOptions = this.props.selectedParentOptions.sort((a, b) => comparer.compare(a, b));
    this.setState({
      sortedParentOptions
    });
  }
}
