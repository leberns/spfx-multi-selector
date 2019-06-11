import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react';

import { IOptionsBoxProps } from './IOptionsBoxProps';
import { IOptionsBoxState } from './IOptionsBoxState';

export default class OptionsBox extends React.Component<IOptionsBoxProps, IOptionsBoxState> {
  constructor(props: IOptionsBoxProps) {
    super(props);
    this.state = {
      comboOptions: []
    };
  }

  public render(): React.ReactElement<IOptionsBoxProps> {
    return (
      <ComboBox
        autoComplete="on"
        options={this.state.comboOptions}
        onChanged={(comboOption: IComboBoxOption, index: number, value: string) => this.onChange(comboOption)}
      />
    );
  }

  private onChange(comboOption: IComboBoxOption): void {
    const selectedOptions = this.props.options.filter(op => op.id === comboOption.key);
    if (selectedOptions.length > 0) {
      const selectedOption = selectedOptions[0];
      this.props.onChange(selectedOption);
    }
  }

  public componentDidMount(): void {
    this.defineComboOptions();
  }

  public defineComboOptions(): void {
    const comboOptions = this.props.options.map(option => {
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
}
