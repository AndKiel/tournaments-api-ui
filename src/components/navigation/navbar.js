import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from 'material-ui';
import DrawerMenu from './drawer_menu';
import UserMenu from './user_menu';
import routes from '../../utils/routes';
import styles from './navbar.scss';

@translate()
class Navbar extends Component {
  render() {
    const { t } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <Typography variant="title" color="inherit" style={{ flex: 1 }}>
            <Link className={styles.link} to={routes.tournaments()}>
              {t('pages.tournaments.title')}
            </Link>
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
