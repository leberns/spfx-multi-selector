import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { IOptionsRendererProps } from './IOptionsRendererProps';
import { SelectionAllowance } from '../../../../enums/SelectionAllowance';
import MultiOptionsEditor from '../../multiOptionsEditor/MultiOptionsEditor';
import OptionsBoxEditor from '../../optionsBoxEditor/OptionsBoxEditor';

export default class OptionsRenderer extends React.Component<IOptionsRendererProps, {}> {
  public render(): React.ReactElement<IOptionsRendererProps> {
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
