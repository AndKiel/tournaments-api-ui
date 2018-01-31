import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../utils/routes';
import styles from './organiser_actions.scss';

@withRouter
@inject('store')
@observer
class OrganiserActions extends Component {
  @observable anchorEl = null;

  @autobind
  openMenu(e) {
    this.anchorEl = e.currentTarget;
  }
  @autobind
  closeMenu() {
    this.anchorEl = null;
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
          <IconButton className={styles.icon} onClick={this.openMenu}>
            <FontAwesomeIcon size="sm" icon="ellipsis-v" />
          </IconButton>
          <Menu
            anchorEl={this.anchorEl}
            open={Boolean(this.anchorEl)}
            onClose={this.closeMenu}
          >
            <MenuItem component={Link} to={routes.editTournament(id)}>
              <ListItemIcon>
                <FontAwesomeIcon className={styles['menu-icon']} icon="edit" />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
            <MenuItem onClick={this.deleteTournament}>
              <ListItemIcon>
                <FontAwesomeIcon
                  className={styles['menu-icon']}
                  icon="trash-alt"
                />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </MenuItem>
          </Menu>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default OrganiserActions;
