import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react';

import styles from './OptionsArray.module.scss';
import { IMultiOptionsEditorProps } from './IMultiOptionsEditorProps';

export default class MultiOptionsEditor extends React.Component<IMultiOptionsEditorProps, {}> {
  public render(): React.ReactElement<IMultiOptionsEditorProps> {
    return (
      <div className={styles.optionsArray}>
        {this.props.options.map(option => (
          <Checkbox
            key={option.id}
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
