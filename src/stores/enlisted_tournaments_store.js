import { types, getEnv, flow } from 'mobx-state-tree';
import Tournament from '../models/tournament';
import apiRoutes from '../utils/api_routes';

const EnlistedTournamentsStore = types
  .model('EnlistedTournamentsStore', {
    collection: types.optional(types.array(Tournament), []),
    page: types.optional(types.number, 1),
    totalCount: types.optional(types.number, 0)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      getTournaments: flow(function* getTournaments(page = 1) {
        self.page = page;
        const response = yield apiClient.get(apiRoutes.enlistedTournaments(), {
          authenticate: true,
          params: { page }
        });
        self.totalCount = response.data.meta.total_count;
        self.collection = response.data.tournaments;
      })
    };
  });

export default EnlistedTournamentsStore;
