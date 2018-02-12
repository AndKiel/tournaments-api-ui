import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';

@inject('store')
@observer
class AssignPlayersButton extends Component {
  @observable isDialogOpen = false;

  @autobind
  openDialog() {
    this.isDialogOpen = true;
  }

  @autobind
  closeDialog() {
    this.isDialogOpen = false;
  }

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
            <IconButton onClick={this.openDialog}>
              <FontAwesomeIcon size="sm" icon="users" fixedWidth />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            onClose={this.closeDialog}
            onConfirm={this.assignPlayers}
            open={this.isDialogOpen}
            title="Assign players to tables?"
            text="First round assignment is random. In the following rounds players are assigned to tables based on the results."
          />
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
