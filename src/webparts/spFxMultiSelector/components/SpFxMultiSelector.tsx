import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxMultiSelector.module.scss';
import { ISpFxMultiSelectorProps } from './ISpFxMultiSelectorProps';
import { ISpFxMultiSelectorState } from './ISpFxMultiSelectorState';
import MultiSelector from './multiSelector/MultiSelector';
import { IMainOption } from '../../../interfaces/IMainOption';
import { ISuboption } from '../../../interfaces/ISuboption';

export default class SpFxMultiSelector extends React.Component<ISpFxMultiSelectorProps, ISpFxMultiSelectorState> {
  constructor(props: ISpFxMultiSelectorProps) {
    super(props);
    this.state = {
      selectedMainOptions: [],
      selectedSubOptions: []
    };
  }

  private mainOptions: IMainOption[] = [
    {
      id: 1,
      title: 'Team A',
      selectionAllowance: 0
    },
    {
      id: 2,
      title: 'Team B',
      selectionAllowance: 0
    },
    {
      id: 3,
      title: 'Team C',
      selectionAllowance: 1
    },
    {
      id: 4,
      title: 'Team still Empty',
      selectionAllowance: 0
    }
  ];

  private subOptions: ISuboption[] = [
    {
      id: 1,
      title: 'John Blue',
      parentId: 1
    },
    {
      id: 2,
      title: 'Marry Green',
      parentId: 1
    },
    {
      id: 3,
      title: 'Mark Red',
      parentId: 1
    },
    {
      id: 4,
      title: 'Anna White',
      parentId: 3
    },
    {
      id: 5,
      title: 'Ellen Rose',
      parentId: 3
    },
    {
      id: 6,
      title: 'Daniel Black',
      parentId: 2
    },
    {
      id: 7,
      title: 'Paul Purple',
      parentId: 2
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
                subOptions={this.subOptions}
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
                  <li key={option.id}>
                    {escape(option.title)} ({escape(option.id.toString())})
                  </li>
                ))}
              </ul>
              <ul>
                {this.state.selectedSubOptions.map(option => (
                  <li key={option.id}>
                    {escape(option.title)} ({escape(option.id.toString())}, parent option:{' '}
                    {escape(option.parentId.toString())})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private onSelectionComplete(selectedMainOptions: IMainOption[], selectedSubOptions: ISuboption[]): void {
    this.setState({
      selectedMainOptions: [...selectedMainOptions],
      selectedSubOptions: [...selectedSubOptions]
    });
  }
}
