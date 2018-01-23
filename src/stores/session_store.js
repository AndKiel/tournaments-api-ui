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
        this.isSignedIn = true;
      },

      async signOut() {
        await apiClient.revokeToken();
        this.isSignedIn = false;
      }
    };
  });

export default SessionStore;
