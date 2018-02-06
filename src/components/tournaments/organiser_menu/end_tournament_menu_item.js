import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { ListItemIcon, ListItemText, MenuItem } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './icons.scss';

@inject('store')
@observer
class EndTournamentMenuItem extends Component {
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
        <MenuItem onClick={this.endTournament}>
          <ListItemIcon>
            <FontAwesomeIcon
              className={styles['menu-icon']}
              icon="hourglass-end"
              fixedWidth
            />
          </ListItemIcon>
          <ListItemText primary="End" />
        </MenuItem>
      );
    } else {
      return null;
    }
  }
}

export default EndTournamentMenuItem;
