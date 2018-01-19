import { types } from 'mobx-state-tree';
import SessionStore from './session_store';

const AppStore = types.model('AppStore', {
  sessionStore: types.optional(SessionStore, {})
});

export default AppStore;
