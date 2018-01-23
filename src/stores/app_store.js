import { types } from 'mobx-state-tree';
import SessionStore from './session_store';
import UIStore from './ui_store';
import UserStore from './user_store';

const AppStore = types.model('AppStore', {
  sessionStore: types.optional(SessionStore, {}),
  uiStore: types.optional(UIStore, {}),
  userStore: types.optional(UserStore, {})
});

export default AppStore;
