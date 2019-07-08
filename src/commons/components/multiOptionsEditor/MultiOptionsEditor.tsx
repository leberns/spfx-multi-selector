import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react';

import { IMultiOptionsEditorProps } from './IMultiOptionsEditorProps';
import { IOptionItem } from '../../../interfaces/IOptionItem';

export default class MultiOptionsEditor extends React.Component<IMultiOptionsEditorProps, {}> {
  public render(): React.ReactElement<IMultiOptionsEditorProps> {
    return (
      <div>
        {this.props.options.map(option => (
          <Checkbox
            key={option.key}
            label={option.title}
            defaultChecked={this.isChecked(option)}
            onChange={(event: React.FormEvent<HTMLElement>, isChecked: boolean) =>
              this.props.onChange(isChecked, option)
            }
          />
        ))}
      </div>
    );
  }

  private isChecked(option: IOptionItem): boolean {
    if (!this.props.defaultSelectedKeys) {
      return false;
    }
    const isChecked = this.props.defaultSelectedKeys.indexOf(option.key) !== -1;
    return isChecked;
  }
}
