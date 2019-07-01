import * as React from 'react';

import { ISuboptionsRendererProps } from './ISuboptionsRendererProps';
import { ISuboptionsRendererState } from './ISuboptionsRendererState';
import OptionsRenderer from '../optionsRenderer/OptionsRenderer';
import { IRelationalOption } from '../../../../interfaces/IRelationalOption';
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
        {this.state.sortedParentOptions.map(parentOption => (
          <OptionsRenderer
            key={parentOption.key}
            parentOption={parentOption}
            suboptions={this.props.suboptionsMap.getChildren(parentOption.key)}
            onUnlimitedOptionChange={(isChecked: boolean, option: IRelationalOption) =>
              this.onUnlimitedOptionChange(isChecked, option)
            }
            onSingleOptionChange={(option: IRelationalOption) => this.onSingleOptionChange(option)}
          />
        ))}
      </div>
    );
  }

  private onUnlimitedOptionChange(isChecked: boolean, option: IRelationalOption): void {
    if (!!this.props.onUnlimitedOptionChange) {
      this.props.onUnlimitedOptionChange(isChecked, option);
    }
  }

  private onSingleOptionChange(option: IRelationalOption): void {
    if (!!this.props.onSingleOptionChange) {
      this.props.onSingleOptionChange(option);
    }
  }

  public componentDidMount(): void {
    this.updateStateSortedOptions();
  }

  public componentDidUpdate(prevProps: ISuboptionsRendererProps): void {
    if (this.props.parentOptions.length !== prevProps.parentOptions.length) {
      this.updateStateSortedOptions();
    }
  }

  public updateStateSortedOptions(): void {
    const comparer = new OptionsComparer();
    const sortedParentOptions = this.props.parentOptions.sort((a, b) => comparer.compare(a, b));
    this.setState({
      sortedParentOptions
    });
  }
}
