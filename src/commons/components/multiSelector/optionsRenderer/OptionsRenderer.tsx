import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';

import { IOptionsRendererProps } from './IOptionsRendererProps';
import { SelectionAllowance } from '../../../../enums/SelectionAllowance';
import MultiOptionsEditor from '../../multiOptionsEditor/MultiOptionsEditor';
import OptionsBoxEditor from '../../optionsBoxEditor/OptionsBoxEditor';

export default class OptionsRenderer extends React.Component<IOptionsRendererProps, {}> {
  public render(): React.ReactElement<IOptionsRendererProps> {
    if (this.props.suboptions.length === 0) {
      return null;
    }

    const { title, selectionAllowance } = this.props.parentOption;

    return (
      <div>
        <div>{escape(title)}</div>
        {selectionAllowance === SelectionAllowance.Unlimited ? (
          <MultiOptionsEditor options={this.props.suboptions} onChange={this.props.onUnlimitedOptionChange} />
        ) : (
          <OptionsBoxEditor options={this.props.suboptions} onChange={this.props.onSingleOptionChange} />
        )}
      </div>
    );
  }
}
