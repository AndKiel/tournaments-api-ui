import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Navigation from './components/navigation';
import Home from './pages/home';
import ApiClient from './utils/api_client';
import AppStore from './stores/app_store';

const apiClient = new ApiClient();
const appStore = AppStore.create({}, { apiClient });

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <div>
          <Navigation />
          <BrowserRouter>
            <Route exact path="/" component={Home} />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
