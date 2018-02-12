import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { ListItemIcon, ListItemText, MenuItem } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';
import styles from './icons.scss';

@inject('store')
@observer
class EndTournamentMenuItem extends Component {
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
  async endTournament() {
    await this.props.store.organisedTournamentsStore.endTournament(
      this.props.tournament.id
    );
    this.props.tournament.setStatus('ended');
    this.props.store.uiStore.setAlert(
      'You have successfully ended a tournament.'
    );
  }

  render() {
    if (this.props.tournament.status === 'in_progress') {
      return (
        <div>
          <MenuItem onClick={this.openDialog}>
            <ListItemIcon>
              <FontAwesomeIcon
                className={styles['menu-icon']}
                icon="hourglass-end"
                fixedWidth
              />
            </ListItemIcon>
            <ListItemText primary="End" />
          </MenuItem>
          <ConfirmationDialog
            onClose={this.closeDialog}
            onConfirm={this.endTournament}
            open={this.isDialogOpen}
            title="End this tournament?"
            text="It will no longer be possible to add, edit or remove rounds, assign players to tables and update table results."
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

EndTournamentMenuItem.propTypes = {
  tournament: PropTypes.object.isRequired
};

export default EndTournamentMenuItem;
