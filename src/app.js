import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';

import Navbar from './components/navigation/navbar';
import Alert from './components/utils/alert';
import Loading from './components/utils/loading';
import ApiClient from './utils/api_client';
import AppStore from './stores/app_store';
import AppSwitch from './app_switch';

import i18n from './i18n';
import styles from './app.scss';
import './fontawesome';

const apiClient = new ApiClient();
const appStore = AppStore.create({}, { apiClient });

@observer
class App extends Component {
  componentWillMount() {
    appStore.sessionStore.setup();
  }

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={appStore}>
          <BrowserRouter>
            <div>
              <Navbar />
              <main className={styles.main}>
                {appStore.sessionStore.state !== 'ready' ? (
                  <Loading />
                ) : (
                  <AppSwitch />
                )}
                <Alert />
              </main>
            </div>
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;
