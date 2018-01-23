import { types, getEnv } from 'mobx-state-tree';
import apiRoutes from '../utils/api_routes';

const SessionStore = types
  .model('SessionStore', {
    isSignedIn: types.optional(types.boolean, false)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      async signUp(data) {
        return await apiClient.post(apiRoutes.signUpUsers(), { data: data });
      },

      async signIn({ email, password }) {
        await apiClient.requestToken(email, password);
        self.markAsSignedIn();
      },

      async signOut() {
        await apiClient.revokeToken();
        self.markAsSignedOud();
      },

      markAsSignedIn() {
        self.isSignedIn = true;
      },

      markAsSignedOut() {
        self.isSignedIn = false;
      }
    };
  });

export default SessionStore;
