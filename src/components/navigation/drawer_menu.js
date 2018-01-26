import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../utils/routes';
import styles from './drawer_menu.scss';

@inject('store')
@observer
class DrawerMenu extends Component {
  @observable isMenuOpen = false;

  @autobind
  openMenu() {
    this.isMenuOpen = true;
  }
  @autobind
  closeMenu() {
    this.isMenuOpen = false;
  }

  render() {
    if (this.props.store.sessionStore.isSignedIn) {
      return (
        <div>
          <Drawer anchor="top" open={this.isMenuOpen} onClose={this.closeMenu}>
            <List onClick={this.closeMenu} onKeyDown={this.closeMenu}>
              <ListItem component={Link} to={routes.tournaments()}>
                <ListItemText primary="All tournaments" />
              </ListItem>
              <ListItem component={Link} to={routes.organisedTournaments()}>
                <ListItemText primary="Organised tournaments" />
              </ListItem>
              <ListItem component={Link} to={routes.enlistedTournaments()}>
                <ListItemText primary="Enlisted tournaments" />
              </ListItem>
            </List>
          </Drawer>
          <IconButton
            color="contrast"
            className={styles['bars-icon']}
            onClick={this.openMenu}
          >
            <FontAwesomeIcon icon="bars" fixedWidth />
          </IconButton>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DrawerMenu;
