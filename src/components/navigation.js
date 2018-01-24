import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import routes from '../utils/routes';
import styles from './navigation.scss';

@withRouter
@inject('store')
@observer
class Navigation extends Component {
  @autobind
  async signOut() {
    try {
      await this.props.store.sessionStore.signOut();
      this.props.history.push(routes.signIn());
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
              <Tooltip title="Account">
                <IconButton
                  color="contrast"
                  component={Link}
                  to={routes.account()}
                >
                  <FontAwesomeIcon icon="user-circle" fixedWidth />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign out">
                <IconButton color="contrast" onClick={this.signOut}>
                  <FontAwesomeIcon icon="sign-out-alt" fixedWidth />
                </IconButton>
              </Tooltip>
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
