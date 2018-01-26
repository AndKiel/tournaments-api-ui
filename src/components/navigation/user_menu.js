import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import { Button, IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../utils/routes';

@withRouter
@inject('store')
@observer
class UserMenu extends Component {
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
    if (this.props.store.sessionStore.isSignedIn) {
      return (
        <div>
          <Tooltip title="New tournament">
            <IconButton
              color="contrast"
              component={Link}
              to={routes.newTournament()}
            >
              <FontAwesomeIcon icon="calendar-plus" fixedWidth />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton color="contrast" component={Link} to={routes.account()}>
              <FontAwesomeIcon icon="user-circle" fixedWidth />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign out">
            <IconButton color="contrast" onClick={this.signOut}>
              <FontAwesomeIcon icon="sign-out-alt" fixedWidth />
            </IconButton>
          </Tooltip>
        </div>
      );
    } else {
      return (
        <div>
          <Button color="contrast" component={Link} to={routes.signIn()}>
            Sign in
          </Button>
          <Button color="contrast" component={Link} to={routes.signUp()}>
            Sign up
          </Button>
        </div>
      );
    }
  }
}

export default UserMenu;
