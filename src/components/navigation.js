import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { AppBar, Button, Toolbar, Typography } from 'material-ui';
import { Link } from 'react-router-dom';
import routes from '../utils/routes';
import styles from './navigation.scss';

@inject('store')
@observer
class Navigation extends Component {
  @autobind
  async signOut() {
    try {
      await this.props.store.sessionStore.signOut();
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <AppBar position="static" className={styles.navbar}>
        <Toolbar>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            Tournaments
          </Typography>
          {this.props.store.sessionStore.isSignedIn ? (
            <div>
              <Button color="contrast">Account</Button>
              <Button color="contrast" onClick={this.signOut}>
                Sign out
              </Button>
            </div>
          ) : (
            <div>
              <Button color="contrast" component={Link} to={routes.signIn()}>
                Sign in
              </Button>
              <Button color="contrast" component={Link} to={routes.signUp()}>
                Sign up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navigation;
