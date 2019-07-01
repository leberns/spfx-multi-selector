import * as React from 'react';
import { ComboBox, IComboBoxOption, IComboBox } from 'office-ui-fabric-react';

import { IOptionsBoxEditorProps } from './IOptionsBoxEditorProps';
import { IOptionsBoxEditorState } from './IOptionsBoxEditorState';

export default class OptionsBoxEditor extends React.Component<IOptionsBoxEditorProps, IOptionsBoxEditorState> {
  constructor(props: IOptionsBoxEditorProps) {
    super(props);

    this.state = {
      comboOptions: []
    };
  }

  public render(): React.ReactElement<IOptionsBoxEditorProps> {
    return (
      <ComboBox
        autoComplete="on"
        options={this.state.comboOptions}
        onChanged={(comboOption: IComboBoxOption, index: number, value: string) => this.onChange(comboOption)}
      />
    );
  }

  private onChange(comboOption: IComboBoxOption): void {
    const selectedOptions = this.props.options.filter(op => op.key === comboOption.key);
    if (selectedOptions.length > 0) {
      const selectedOption = selectedOptions[0];
      this.props.onChange(selectedOption);
    }
  }

  public componentDidMount(): void {
    this.updateStateComboOptions();
  }

  public componentDidUpdate(prevProps: IOptionsBoxEditorProps): void {
    if (this.props.options.length !== prevProps.options.length) {
      this.updateStateComboOptions();
    }
  }

  public updateStateComboOptions(): void {
    const comboOptions = this.props.options.map(option => {
      const comboOption: IComboBoxOption = {
        key: option.key,
        text: option.title
      };
      return comboOption;
    });

    this.setState({ comboOptions });
  }
}
