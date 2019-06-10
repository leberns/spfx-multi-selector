import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react';

import { ISuboptionsRendererProps } from './ISuboptionsRendererProps';
import { ISuboptionsRendererState } from './ISuboptionsRendererState';
import OptionsArray from '../optionsArray/OptionsArray';
import { ISuboption } from '../../../../interfaces/ISuboption';

export default class SuboptionsRenderer extends React.Component<ISuboptionsRendererProps, ISuboptionsRendererState> {
  constructor(props: ISuboptionsRendererProps) {
    super(props);
    this.state = {
      comboOptions: []
    };
  }

  public render(): React.ReactElement<ISuboptionsRendererProps> {
    if (this.props.mainOption.selectionAllowance === 0) {
      return <OptionsArray options={this.props.options} onChange={this.props.onChange} />;
    }

    return (
      <ComboBox
        label={this.props.mainOption.title}
        autoComplete="on"
        options={this.state.comboOptions}
        onChange={(event: React.FormEvent<IComboBox>) => this.onChange(event)}
      />
    );
  }

  public componentDidMount(): void {
    this.defineComboOptions();
  }

  public defineComboOptions(): void {
    const comboOptions: IComboBoxOption[] = this.props.options.map(option => {
      const comboOption: IComboBoxOption = {
        key: option.id,
        text: option.title
      };
      return comboOption;
    });
    this.setState({
      comboOptions
    });
  }

  private onChange(event: React.FormEvent<IComboBox>): void {
    console.log(event);
    //this.props.onChange(isChecked, option);
  }
}
