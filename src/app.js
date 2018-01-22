import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Navigation from './components/navigation';
import Alert from './components/alert';
import SignInPage from './pages/sign_in_page';
import SignUpPage from './pages/sign_up_page';
import ApiClient from './utils/api_client';
import AppStore from './stores/app_store';
import routes from './utils/routes';

const apiClient = new ApiClient();
const appStore = AppStore.create({}, { apiClient });

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <BrowserRouter>
          <div>
            <Navigation />
            <Route exact path={routes.signIn()} component={SignInPage} />
            <Route exact path={routes.signUp()} component={SignUpPage} />
            <Alert />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
