import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISuboptionsRendererProps } from './ISuboptionsRendererProps';
import { SelectionAllowance } from '../../../../enums/SelectionAllowance';
import MultiOptionsEditor from '../../multiOptionsEditor/MultiOptionsEditor';
import OptionsBoxEditor from '../../optionsBoxEditor/OptionsBoxEditor';

export default class SuboptionsRenderer extends React.Component<ISuboptionsRendererProps, {}> {
  public render(): React.ReactElement<ISuboptionsRendererProps> {
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
          <OptionsBoxEditor options={this.props.relatedSuboptions} onChange={this.props.onSingleSuboptionChange} />
        )}
      </div>
    );
  }
}
