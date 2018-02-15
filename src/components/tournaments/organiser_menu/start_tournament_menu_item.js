import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { ListItemIcon, ListItemText, MenuItem } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';
import styles from './icons.scss';

@translate()
@inject('store')
@observer
class StartTournamentMenuItem extends Component {
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
  async startTournament() {
    try {
      await this.props.store.organisedTournamentsStore.startTournament(
        this.props.tournament.id
      );
      this.props.tournament.setStatus('in_progress');
      this.props.store.uiStore.setAlert(
        this.props.t('alerts.tournament.start')
      );
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error_description
      ) {
        this.props.store.uiStore.setAlert(
          error.response.data.error_description,
          'error'
        );
      } else {
        throw error;
      }
    }
  }

  render() {
    if (this.props.tournament.status === 'created') {
      const { t } = this.props;

      return (
        <div>
          <MenuItem onClick={this.openDialog}>
            <ListItemIcon>
              <FontAwesomeIcon
                className={styles['menu-icon']}
                icon="hourglass-half"
                fixedWidth
              />
            </ListItemIcon>
            <ListItemText
              primary={t('components.tournaments.organiser_menu.start')}
            />
          </MenuItem>
          <ConfirmationDialog
            onClose={this.closeDialog}
            onConfirm={this.startTournament}
            open={this.isDialogOpen}
            title={t('dialogs.tournament.start.title')}
            text={t('dialogs.tournament.start.text')}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

StartTournamentMenuItem.propTypes = {
  tournament: PropTypes.object.isRequired
};

export default StartTournamentMenuItem;
