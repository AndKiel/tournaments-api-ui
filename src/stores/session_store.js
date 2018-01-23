import { types, getEnv, flow } from 'mobx-state-tree';
import apiRoutes from '../utils/api_routes';

const SessionStore = types
  .model('SessionStore', {})
  .views(self => {
    const { apiClient } = getEnv(self);

    return {
      get isSignedIn() {
        return apiClient.hasToken();
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
      }),

      signOut: flow(function* signOut() {
        yield apiClient.revokeToken();
      })
    };
  });

export default SessionStore;
