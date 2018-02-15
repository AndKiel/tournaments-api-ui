import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../utils/routes';
import styles from './drawer_menu.scss';

@translate()
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
      const { t } = this.props;

      return (
        <div>
          <Drawer anchor="left" open={this.isMenuOpen} onClose={this.closeMenu}>
            <List onClick={this.closeMenu} onKeyDown={this.closeMenu}>
              <ListItem component={Link} to={routes.tournaments()}>
                <ListItemText
                  primary={t(
                    'components.navigation.drawer_menu.all_tournaments'
                  )}
                />
              </ListItem>
              <ListItem component={Link} to={routes.organisedTournaments()}>
                <ListItemText
                  primary={t('pages.organised_tournaments.title')}
                />
              </ListItem>
              <ListItem component={Link} to={routes.enlistedTournaments()}>
                <ListItemText primary={t('pages.enlisted_tournaments.title')} />
              </ListItem>
            </List>
          </Drawer>
          <IconButton
            color="inherit"
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
