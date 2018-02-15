import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Link } from 'react-router-dom';
import { Button, IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../utils/routes';

@translate()
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
    const { t } = this.props;

    if (this.props.store.sessionStore.isSignedIn) {
      return (
        <div>
          <Tooltip title={t('pages.new_tournament.title')}>
            <IconButton
              color="inherit"
              component={Link}
              to={routes.newTournament()}
            >
              <FontAwesomeIcon icon="calendar-plus" fixedWidth />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('pages.account.title')}>
            <IconButton color="inherit" component={Link} to={routes.account()}>
              <FontAwesomeIcon icon="user-circle" fixedWidth />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('components.navigation.user_menu.sign_out')}>
            <IconButton color="inherit" onClick={this.signOut}>
              <FontAwesomeIcon icon="sign-out-alt" fixedWidth />
            </IconButton>
          </Tooltip>
        </div>
      );
    } else {
      return (
        <div>
          <Button color="inherit" component={Link} to={routes.signIn()}>
            {t('pages.sign_in.title')}
          </Button>
          <Button color="inherit" component={Link} to={routes.signUp()}>
            {t('pages.sign_up.title')}
          </Button>
        </div>
      );
    }
  }
}

export default UserMenu;
