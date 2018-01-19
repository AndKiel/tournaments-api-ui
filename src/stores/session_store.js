import { types, getEnv, flow } from 'mobx-state-tree';
import apiRoutes from '../utils/api_routes';

const SessionStore = types
  .model('SessionStore', {
    isSignedIn: types.optional(types.boolean, false)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      signUp: flow(function* signUp(email, password, password_confirmation) {
        yield apiClient.post(apiRoutes.signUpUsers(), {
          email: email,
          password: password,
          password_confirmation: password_confirmation
        });
      }),

      signIn: flow(function* signIn(email, password) {
        yield apiClient.requestToken(email, password);
        self.isSignedIn = true;
      }),

      signOut: flow(function* signOut() {
        yield apiClient.revokeToken();
        self.isSignedIn = false;
      })
    };
  });

export default SessionStore;
