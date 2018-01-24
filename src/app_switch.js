import React, { Component } from 'react';
import { inject } from 'mobx-react/index';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './utils/authenticated_route';

import SignInPage from './pages/sign_in_page';
import SignUpPage from './pages/sign_up_page';
import AccountPage from './pages/account_page';
import NotFoundPage from './pages/not_found_page';

import routes from './utils/routes';

@inject('store')
class AppSwitch extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={routes.root()} />
        <Route path={routes.signIn()} component={SignInPage} />
        <Route path={routes.signUp()} component={SignUpPage} />
        <AuthenticatedRoute
          path={routes.account()}
          component={AccountPage}
          store={this.props.store}
        />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default AppSwitch;