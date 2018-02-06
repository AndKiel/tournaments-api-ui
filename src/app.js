import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Navbar from './components/navigation/navbar';
import Alert from './components/alert';
import Loading from './components/loading';
import ApiClient from './utils/api_client';
import AppStore from './stores/app_store';
import AppSwitch from './app_switch';

// eslint-disable-next-line
import styles from './app.scss';

import fontawesome from '@fortawesome/fontawesome';
import {
  faBars,
  faCalendarAlt,
  faCalendarPlus,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClock,
  faEdit,
  faEllipsisV,
  faHourglassStart,
  faHourglassHalf,
  faHourglassEnd,
  faInfoCircle,
  faSignOutAlt,
  faSpinner,
  faTimes,
  faTrashAlt,
  faUserCircle,
  faUserPlus,
  faUserTimes
} from '@fortawesome/fontawesome-free-solid';
import {
  faCalendarMinus as farCalendarMinus,
  faCalendarPlus as farCalendarPlus,
  faClock as farClock
} from '@fortawesome/fontawesome-free-regular';
fontawesome.library.add(
  faBars,
  faCalendarAlt,
  faCalendarPlus,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClock,
  faEdit,
  faEllipsisV,
  faHourglassStart,
  faHourglassHalf,
  faHourglassEnd,
  faInfoCircle,
  faSignOutAlt,
  faSpinner,
  faTimes,
  faTrashAlt,
  faUserCircle,
  faUserPlus,
  faUserTimes,
  farCalendarMinus,
  farCalendarPlus,
  farClock
);

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
            <Navbar />
            <main>
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
    );
  }
}

export default App;
