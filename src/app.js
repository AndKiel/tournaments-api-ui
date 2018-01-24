import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Navigation from './components/navigation';
import Alert from './components/alert';
import SignInPage from './pages/sign_in_page';
import SignUpPage from './pages/sign_up_page';
import AccountPage from './pages/account_page';
import ApiClient from './utils/api_client';
import AppStore from './stores/app_store';
import AuthenticatedRoute from './utils/authenticated_route';
import routes from './utils/routes';

const apiClient = new ApiClient();
const appStore = AppStore.create({}, { apiClient });

@observer
class App extends Component {
  componentWillMount() {
    appStore.sessionStore.setup();
  }

  render() {
    return (
      <Provider store={appStore}>
        <BrowserRouter>
          <div>
            <Navigation />
            {appStore.sessionStore.state !== 'ready' ? (
              'Loading'
            ) : (
              <Switch>
                <Route exact path={routes.root()} />
                <Route path={routes.signIn()} component={SignInPage} />
                <Route path={routes.signUp()} component={SignUpPage} />
                <AuthenticatedRoute
                  path={routes.account()}
                  component={AccountPage}
                  store={appStore}
                />
                {/*TODO: 404*/}
              </Switch>
            )}
            <Alert />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
