import { types, getEnv, flow } from 'mobx-state-tree';
import apiRoutes from '../utils/api_routes';

const SessionStore = types
  .model('SessionStore', {
    isSignedIn: types.optional(types.boolean, false)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      async signUp(email, password, password_confirmation) {
        return await apiClient.post(apiRoutes.signUpUsers(), {
          data: {
            user: { email, password, password_confirmation }
          }
        });
      },

      async signIn(email, password) {
        return await apiClient.requestToken(email, password);
      },

      async signOut() {
        return await apiClient.revokeToken();
      }
    };
  });

export default SessionStore;
