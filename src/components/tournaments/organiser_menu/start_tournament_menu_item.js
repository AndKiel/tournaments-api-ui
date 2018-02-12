import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { ListItemIcon, ListItemText, MenuItem } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './icons.scss';

@inject('store')
@observer
class StartTournamentMenuItem extends Component {
  @autobind
  async startTournament() {
    try {
      await this.props.store.organisedTournamentsStore.startTournament(
        this.props.tournament.id
      );
      this.props.tournament.setStatus('in_progress');
      this.props.store.uiStore.setAlert(
        'You have successfully started a tournament.'
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
      return (
        <MenuItem onClick={this.startTournament}>
          <ListItemIcon>
            <FontAwesomeIcon
              className={styles['menu-icon']}
              icon="hourglass-half"
              fixedWidth
            />
          </ListItemIcon>
          <ListItemText primary="Start" />
        </MenuItem>
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
