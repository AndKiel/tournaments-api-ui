import App from './app';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from "mobx-react";
import ApiClient from './utils/api_client';
import AppStore from './stores/app_store';

const apiClient = new ApiClient();
const appStore = AppStore.create({}, { apiClient });

hydrate(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
