import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxMultiSelector.module.scss';
import { ISpFxMultiSelectorProps } from './ISpFxMultiSelectorProps';
import { ISpFxMultiSelectorState } from './ISpFxMultiSelectorState';
import MultiSelector from '../../../commons/components/multiSelector/MultiSelector';
import { IOptionItem } from '../../../interfaces/IOptionItem';

export default class SpFxMultiSelector extends React.Component<ISpFxMultiSelectorProps, ISpFxMultiSelectorState> {
  constructor(props: ISpFxMultiSelectorProps) {
    super(props);
    this.state = {
      selectedOptionsLevel2: [],
      selectedOptionsLevel3: []
    };
  }

  private optionsLevel2: IOptionItem[] = [
    {
      key: 'TA',
      title: 'Team A',
      selectionAllowance: 0
    },
    {
      key: 'TC',
      title: 'Team C',
      selectionAllowance: 0
    },
    {
      key: 'TB',
      title: 'Team B',
      selectionAllowance: 1
    },
    {
      key: 'Tx',
      title: 'Team still Empty',
      selectionAllowance: 0
    }
  ];

  private optionsLevel3: IOptionItem[] = [
    {
      key: '1',
      title: 'John Blue',
      parentKey: 'TA'
    },
    {
      key: '2',
      title: 'Marry Green',
      parentKey: 'TA'
    },
    {
      key: '3',
      title: 'Mark Red',
      parentKey: 'TA'
    },
    {
      key: '4',
      title: 'Anna White',
      parentKey: 'TC'
    },
    {
      key: '5',
      title: 'Ellen Rose',
      parentKey: 'TC'
    },
    {
      key: '6',
      title: 'Daniel Black',
      parentKey: 'TB'
    },
    {
      key: '7',
      title: 'Paul Purple',
      parentKey: 'TB'
    }
  ];

  public render(): React.ReactElement<ISpFxMultiSelectorProps> {
    return (
      <div className={styles.spFxMultiSelector}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h2>Personal Available</h2>
              <MultiSelector
                optionsLevel2={this.optionsLevel2}
                optionsLevel3={this.optionsLevel3}
                onSelectionComplete={(selectedOptionsLevel2: IOptionItem[], selectedSubOptions: IOptionItem[]) =>
                  this.onSelectionComplete(selectedOptionsLevel2, selectedSubOptions)
                }
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <h2>Teams and Personal Selected</h2>
              <ul>
                {this.state.selectedOptionsLevel2.map(option => (
                  <li key={option.key}>
                    {escape(option.title)} ({escape(option.key)})
                  </li>
                ))}
              </ul>
              <ul>
                {this.state.selectedOptionsLevel3.map(option => (
                  <li key={option.key}>
                    {escape(option.title)} ({escape(option.key)}, team: {escape(option.parentKey)})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onSelectionComplete(selectedOptionsLevel2: IOptionItem[], selectedOptionsLevel3: IOptionItem[]): void {
    this.setState({
      selectedOptionsLevel2: [...selectedOptionsLevel2],
      selectedOptionsLevel3: [...selectedOptionsLevel3]
    });
  }
}
