import * as React from 'react';

import { ISuboptionsRendererProps } from './ISuboptionsRendererProps';
import { ISuboptionsRendererState } from './ISuboptionsRendererState';
import OptionsRenderer from '../optionsRenderer/OptionsRenderer';
import { IOptionItem } from '../../../../interfaces/IOptionItem';
import { OptionsComparer } from '../../../comparers/OptionsComparer';
import { IOptionsRendererProps } from '../optionsRenderer/IOptionsRendererProps';

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
          <OptionsRenderer
            key={mainOption.key}
            mainOption={mainOption}
            relatedSuboptions={this.props.suboptionsMap.getChildren(mainOption.key)}
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
    if (this.props.selectedOptionsLevel2.length !== prevProps.selectedOptionsLevel2.length) {
      this.sortOptionsUpdateState();
    }
  }

  public sortOptionsUpdateState(): void {
    const comparer = new OptionsComparer();
    const sortedMainOptions = this.props.selectedOptionsLevel2.sort((a, b) => comparer.compare(a, b));
    this.setState({
      sortedMainOptions
    });
  }
}
