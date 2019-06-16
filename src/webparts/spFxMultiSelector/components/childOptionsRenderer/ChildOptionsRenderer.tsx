import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { IChildOptionsRendererProps } from './IChildOptionsRendererProps';
import { SelectionAllowance } from '../../../../enums/SelectionAllowance';
import MultiOptionsEditor from '../multiOptionsEditor/MultiOptionsEditor';
import OptionsEditor from '../optionsEditor/OptionsEditor';

export default class ChildOptionsRenderer extends React.Component<IChildOptionsRendererProps, {}> {
  public render(): React.ReactElement<IChildOptionsRendererProps> {
    if (this.props.relatedSuboptions.length === 0) {
      return null;
    }

    const { title, selectionAllowance } = this.props.mainOption;

    return (
      <div>
        <div>{escape(title)}</div>
        {selectionAllowance === SelectionAllowance.Unlimited ? (
          <MultiOptionsEditor options={this.props.relatedSuboptions} onChange={this.props.onUnlimitedSuboptionChange} />
        ) : (
          <OptionsEditor options={this.props.relatedSuboptions} onChange={this.props.onSingleSuboptionChange} />
        )}
      </div>
    );
  }
}
