import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxMultiSelector.module.scss';
import { ISpFxMultiSelectorProps } from './ISpFxMultiSelectorProps';
import { ISpFxMultiSelectorState } from './ISpFxMultiSelectorState';
import MultiSelector from '../../../commons/components/multiSelector/MultiSelector';
import { IRelationalOption } from '../../../interfaces/IRelationalOption';
import { SelectionAllowance } from '../../../enums/SelectionAllowance';

export default class SpFxMultiSelector extends React.Component<ISpFxMultiSelectorProps, ISpFxMultiSelectorState> {
  constructor(props: ISpFxMultiSelectorProps) {
    super(props);
    this.state = {
      optionsLevel1: [],
      optionsLevel2: [],
      optionsLevel3: [],
      selectedOptionsLevel1: [],
      selectedOptionsLevel2: [],
      selectedOptionsLevel3: []
    };
  }

  private optionsLevel1: IRelationalOption[] = [
    {
      key: 'Department-1',
      title: 'Department 1',
      selectionAllowance: SelectionAllowance.Unlimited
    },
    {
      key: 'Department-2',
      title: 'Department 2',
      selectionAllowance: SelectionAllowance.Unlimited
    },
    {
      key: 'Department-3',
      title: 'Department 3',
      selectionAllowance: SelectionAllowance.Unlimited
    }
  ];

  private optionsLevel2: IRelationalOption[] = [
    {
      key: 'TA',
      title: 'Team A',
      selectionAllowance: SelectionAllowance.Unlimited,
      parentKey: 'Department-1'
    },
    {
      key: 'TC',
      title: 'Team C',
      selectionAllowance: SelectionAllowance.Unlimited,
      parentKey: 'Department-2'
    },
    {
      key: 'TB',
      title: 'Team B',
      selectionAllowance: SelectionAllowance.Single,
      parentKey: 'Department-1'
    },
    {
      key: 'TE1',
      title: 'Team Empty 1',
      selectionAllowance: SelectionAllowance.Unlimited,
      parentKey: 'Department-3'
    },
    {
      key: 'TE2',
      title: 'Team Empty 2',
      selectionAllowance: SelectionAllowance.Unlimited,
      parentKey: 'Department-2'
    }
  ];

  private optionsLevel3: IRelationalOption[] = [
    {
      key: '1',
      title: 'Marry Green',
      parentKey: 'TA'
    },
    {
      key: '2',
      title: 'John Blue',
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
                optionsLevel1={this.state.optionsLevel1}
                optionsLevel2={this.state.optionsLevel2}
                optionsLevel3={this.state.optionsLevel3}
                onSelectionComplete={(
                  selectedOptionsLevel1: IRelationalOption[],
                  selectedOptionsLevel2: IRelationalOption[],
                  selectedOptionsLevel3: IRelationalOption[]
                ) => this.onSelectionComplete(selectedOptionsLevel1, selectedOptionsLevel2, selectedOptionsLevel3)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <h2>Selected</h2>
              <ul>
                {this.state.selectedOptionsLevel1.map(option => (
                  <li key={option.key}>
                    {escape(option.title)} ({escape(option.key)})
                  </li>
                ))}
              </ul>
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

  public componentDidMount(): void {
    this.simulateAsyncDataFetch();
  }

  private simulateAsyncDataFetch(): void {
    setTimeout(async () => {
      const [optionsLevel1, optionsLevel2, optionsLevel3] = await Promise.resolve([
        this.optionsLevel1,
        this.optionsLevel2,
        this.optionsLevel3
      ]);
      this.setState({
        optionsLevel1,
        optionsLevel2,
        optionsLevel3
      });
    }, 500);
  }

  private onSelectionComplete(
    selectedOptionsLevel1: IRelationalOption[],
    selectedOptionsLevel2: IRelationalOption[],
    selectedOptionsLevel3: IRelationalOption[]
  ): void {
    this.setState({
      selectedOptionsLevel1: [...selectedOptionsLevel1],
      selectedOptionsLevel2: [...selectedOptionsLevel2],
      selectedOptionsLevel3: [...selectedOptionsLevel3]
    });
  }
}
