import * as React from 'react';

import { ISuboptionsRendererProps } from './ISuboptionsRendererProps';
import ChildOptionsRenderer from '../childOptionsRenderer/ChildOptionsRenderer';
import { ISuboption } from '../../../../interfaces/ISuboption';

export default class SuboptionsRenderer extends React.Component<ISuboptionsRendererProps, {}> {
  constructor(props: ISuboptionsRendererProps) {
    super(props);
    this.state = {
      mainOptionsSuboptions: []
    };
  }

  public render(): React.ReactElement<ISuboptionsRendererProps> {
    return (
      <div>
        {this.props.selectedMainOptions.map(mainOption => (
          <ChildOptionsRenderer
            key={mainOption.key}
            mainOption={mainOption}
            relatedSuboptions={this.props.suboptionsMap.getChildren(mainOption.key)}
            onUnlimitedSuboptionChange={(isChecked: boolean, suboption: ISuboption) =>
              this.props.onUnlimitedSuboptionChange(isChecked, suboption)
            }
            onSingleSuboptionChange={(suboption: ISuboption) => this.props.onSingleSuboptionChange(suboption)}
          />
        ))}
      </div>
    );
  }
}
