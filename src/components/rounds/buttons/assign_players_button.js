import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@inject('store')
@observer
class AssignPlayersButton extends Component {
  @autobind
  async assignPlayers() {
    await this.props.round.assignPlayers();
    this.props.store.uiStore.setAlert(
      'Players have been successfully assigned to tables.'
    );
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.isUserOrganiser && tournament.status !== 'ended') {
      return (
        <Tooltip title="Assign players">
          <IconButton onClick={this.assignPlayers}>
            <FontAwesomeIcon size="sm" icon="users" />
          </IconButton>
        </Tooltip>
      );
    } else {
      return null;
    }
  }
}

export default AssignPlayersButton;
