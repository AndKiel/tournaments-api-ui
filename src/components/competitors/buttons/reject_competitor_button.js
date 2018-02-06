import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@inject('store')
@observer
class RejectCompetitorButton extends Component {
  @autobind
  async rejectCompetitor() {
    await this.props.competitor.reject();
    this.props.store.uiStore.setAlert(
      'You have successfully rejected a competitor.'
    );
  }

  render() {
    if (this.props.competitor.status === 'confirmed') {
      return (
        <Tooltip title="Reject">
          <IconButton onClick={this.rejectCompetitor}>
            <FontAwesomeIcon size="xs" icon="times" />
          </IconButton>
        </Tooltip>
      );
    } else {
      return null;
    }
  }
}

export default RejectCompetitorButton;
