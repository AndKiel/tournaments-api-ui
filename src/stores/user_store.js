import { types, getEnv, flow } from 'mobx-state-tree';
import User from '../models/user';
import apiRoutes from '../utils/api_routes';

const UserStore = types
  .model('UserStore', {
    user: types.maybe(User)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      getUser: flow(function* getUser() {
        const response = yield apiClient.get(apiRoutes.user(), {
          authenticate: true
        });
        self.user = response.data.user;
      }),

      updateUser: flow(function* updateUser(data) {
        const response = yield apiClient.patch(apiRoutes.user(), {
          authenticate: true,
          data: data
        });
        self.user = response.data.user;
      }),

      nullifyUser() {
        self.user = null;
      }
    };
  });

export default UserStore;
