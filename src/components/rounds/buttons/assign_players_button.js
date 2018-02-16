import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';

@translate()
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
      this.props.t('alerts.round.assign_players')
    );
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.status === 'in_progress') {
      const { t } = this.props;

      return (
        <div>
          <Tooltip title={t('components.rounds.buttons.assign_players')}>
            <IconButton onClick={this.openDialog}>
              <FontAwesomeIcon size="sm" icon="users" fixedWidth />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            action="round.assign_players"
            onClose={this.closeDialog}
            onConfirm={this.assignPlayers}
            open={this.isDialogOpen}
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
