import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../utils/routes';
import styles from './organiser_actions.scss';

@withRouter
@inject('store')
@observer
class OrganiserActions extends Component {
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
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully deleted a tournament.'
    );
  }

  render() {
    const { id, organiser_id } = this.props.tournament;

    if (
      this.props.store.sessionStore.isSignedIn &&
      this.props.store.userStore.user.id === organiser_id
    ) {
      return (
        <div className={styles.container}>
          <Tooltip title="Delete">
            <IconButton
              className={styles.delete}
              onClick={this.deleteTournament}
            >
              <FontAwesomeIcon size="sm" icon="trash-alt" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              className={styles.edit}
              component={Link}
              to={routes.editTournament(id)}
            >
              <FontAwesomeIcon size="sm" icon="edit" />
            </IconButton>
          </Tooltip>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OrganiserActions;
