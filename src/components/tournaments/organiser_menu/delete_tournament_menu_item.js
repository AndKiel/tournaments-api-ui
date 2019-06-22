import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { ListItemIcon, ListItemText, MenuItem } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../../utils/routes';
import ConfirmationDialog from '../../utils/confirmation_dialog';
import styles from './icons.module.scss';

@translate()
@withRouter
@inject('store')
@observer
class DeleteTournamentMenuItem extends Component {
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
  async deleteTournament() {
    await this.props.store.organisedTournamentsStore.deleteTournament(
      this.props.tournament.id
    );
    if (this.props.location.pathname === routes.organisedTournaments()) {
      const organisedTournamentsStore = this.props.store
        .organisedTournamentsStore;
      organisedTournamentsStore.getTournaments(organisedTournamentsStore.page);
    } else {
      this.props.history.push(routes.organisedTournaments());
    }
    this.props.store.uiStore.setAlert(this.props.t('alerts.tournament.delete'));
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <MenuItem onClick={this.openDialog}>
          <ListItemIcon className={styles.delete}>
            <FontAwesomeIcon
              className={styles['menu-icon']}
              icon="trash-alt"
              fixedWidth
            />
          </ListItemIcon>
          <ListItemText primary={t('common.buttons.delete')} />
        </MenuItem>
        <ConfirmationDialog
          action="tournament.delete"
          onClose={this.closeDialog}
          onConfirm={this.deleteTournament}
          open={this.isDialogOpen}
        />
      </div>
    );
  }
}

DeleteTournamentMenuItem.propTypes = {
  tournament: PropTypes.object.isRequired
};

export default DeleteTournamentMenuItem;
