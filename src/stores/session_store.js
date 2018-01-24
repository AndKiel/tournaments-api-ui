import { types, getEnv, getRoot, flow } from 'mobx-state-tree';
import apiRoutes from '../utils/api_routes';

const SessionStore = types
  .model('SessionStore', {})
  .views(self => {
    const { apiClient } = getEnv(self);

    return {
      get isSignedIn() {
        return apiClient.hasToken() && getRoot(self).userStore.user;
      }
    };
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      signUp: flow(function* signUp(data) {
        return yield apiClient.post(apiRoutes.signUpUsers(), { data: data });
      }),

      signIn: flow(function* signIn({ email, password }) {
        yield apiClient.requestToken(email, password);
        getRoot(self).userStore.getUser();
      }),

      signOut: flow(function* signOut() {
        yield apiClient.revokeToken();
        getRoot(self).userStore.nullifyUser();
      })
    };
  });

export default SessionStore;
