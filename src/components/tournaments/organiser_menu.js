import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Menu } from 'material-ui';
import DeleteTournmentMenuItem from './organiser_menu/delete_tournament_menu_item';
import EditTournamentMenuItem from './organiser_menu/edit_tournament_menu_item';
import EndTournamentMenuItem from './organiser_menu/end_tournament_menu_item';
import StartTournamentMenuItem from './organiser_menu/start_tournament_menu_item';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './organiser_menu.scss';

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

  render() {
    if (this.props.tournament.isUserOrganiser) {
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
            <StartTournamentMenuItem tournament={this.props.tournament} />
            <EndTournamentMenuItem tournament={this.props.tournament} />
            <EditTournamentMenuItem tournament={this.props.tournament} />
            <DeleteTournmentMenuItem tournament={this.props.tournament} />
          </Menu>
        </div>
      );
    } else {
      return null;
    }
  }
}

OrganiserActions.propTypes = {
  tournament: PropTypes.object.isRequired
};

export default OrganiserActions;
