import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    if (tournament.status === 'in_progress') {
      return (
        <div>
          <Tooltip title="Assign players to tables">
            <IconButton onClick={this.assignPlayers}>
              <FontAwesomeIcon size="sm" icon="users" fixedWidth />
            </IconButton>
          </Tooltip>
        </div>
      );
    } else {
      return null;
    }
  }
}

AssignPlayersButton.propTypes = {
  round: PropTypes.object.isRequired
};

export default AssignPlayersButton;
