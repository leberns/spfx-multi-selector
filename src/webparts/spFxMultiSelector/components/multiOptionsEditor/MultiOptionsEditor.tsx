import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react';

import { IMultiOptionsEditorProps } from './IMultiOptionsEditorProps';

export default class MultiOptionsEditor extends React.Component<IMultiOptionsEditorProps, {}> {
  public render(): React.ReactElement<IMultiOptionsEditorProps> {
    return (
      <div>
        {this.props.options.map(option => (
          <Checkbox
            key={option.key}
            label={option.title}
            onChange={(event: React.FormEvent<HTMLElement>, isChecked: boolean) =>
              this.props.onChange(isChecked, option)
            }
          />
        ))}
      </div>
    );
  }
}
