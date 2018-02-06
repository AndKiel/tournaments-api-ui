import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@inject('store')
@observer
class ConfirmCompetitorButton extends Component {
  @autobind
  async confirmCompetitor() {
    await this.props.competitor.confirm();
    this.props.store.uiStore.setAlert(
      'You have successfully confirmed a competitor.'
    );
  }

  render() {
    if (this.props.competitor.status === 'enlisted') {
      return (
        <Tooltip title="Confirm">
          <IconButton onClick={this.confirmCompetitor}>
            <FontAwesomeIcon size="xs" icon="check" />
          </IconButton>
        </Tooltip>
      );
    } else {
      return null;
    }
  }
}

export default ConfirmCompetitorButton;
