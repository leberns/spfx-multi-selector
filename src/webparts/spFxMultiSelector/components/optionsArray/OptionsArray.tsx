import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react';

import styles from './OptionsArray.module.scss';
import { IOptionsArrayProps } from './IOptionsArrayProps';
import { IOptionItem } from '../../../../interfaces/IOptionItem';

export default class OptionsArray extends React.Component<IOptionsArrayProps, {}> {
  public render(): React.ReactElement<IOptionsArrayProps> {
    return (
      <div className={styles.optionsArray}>
        {this.props.options.map(option => (
          <Checkbox
            key={option.id}
            label={option.title}
            onChange={(event: React.FormEvent<HTMLElement>, isChecked: boolean) => this.onChange(isChecked, option)}
          />
        ))}
      </div>
    );
  }

  private onChange(isChecked: boolean, option: IOptionItem): void {
    this.props.onChange(isChecked, option);
  }
}
