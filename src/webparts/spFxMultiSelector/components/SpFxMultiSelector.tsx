import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxMultiSelector.module.scss';
import { ISpFxMultiSelectorProps } from './ISpFxMultiSelectorProps';
import { ISpFxMultiSelectorState } from './ISpFxMultiSelectorState';
import MultiSelector from '../../../commons/components/multiSelector/MultiSelector';
import { IMainOption } from '../../../interfaces/IMainOption';
import { ISuboption } from '../../../interfaces/ISuboption';

export default class SpFxMultiSelector extends React.Component<ISpFxMultiSelectorProps, ISpFxMultiSelectorState> {
  constructor(props: ISpFxMultiSelectorProps) {
    super(props);
    this.state = {
      selectedMainOptions: [],
      selectedSuboptions: []
    };
  }

  private mainOptions: IMainOption[] = [
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

  private suboptions: ISuboption[] = [
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
                mainOptions={this.mainOptions}
                suboptions={this.suboptions}
                onSelectionComplete={(selectedMainOptions: IMainOption[], selectedSubOptions: ISuboption[]) =>
                  this.onSelectionComplete(selectedMainOptions, selectedSubOptions)
                }
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <h2>Teams and Personal Selected</h2>
              <ul>
                {this.state.selectedMainOptions.map(option => (
                  <li key={option.key}>
                    {escape(option.title)} ({escape(option.key)})
                  </li>
                ))}
              </ul>
              <ul>
                {this.state.selectedSuboptions.map(option => (
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

  private onSelectionComplete(selectedMainOptions: IMainOption[], selectedSuboptions: ISuboption[]): void {
    this.setState({
      selectedMainOptions: [...selectedMainOptions],
      selectedSuboptions: [...selectedSuboptions]
    });
  }
}
