import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from 'material-ui';
import DrawerMenu from './drawer_menu';
import UserMenu from './user_menu';
import routes from '../../utils/routes';
import styles from './navbar.scss';

class Navbar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <DrawerMenu />
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            <Link className={styles.link} to={routes.tournaments()}>
              Tournaments
            </Link>
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
