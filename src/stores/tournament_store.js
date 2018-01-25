import { types, getEnv, flow } from 'mobx-state-tree';
import Tournament from '../models/tournament';
import apiRoutes from '../utils/api_routes';

const TournamentStore = types
  .model('TournamentStore', {
    collection: types.optional(types.array(Tournament), []),
    page: types.optional(types.number, 1),
    totalCount: types.optional(types.number, 0)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      getCollection: flow(function* getCollection(page = 1) {
        const response = yield apiClient.get(apiRoutes.tournaments(), {
          params: { page }
        });
        self.page = page;
        self.totalCount = response.data.meta.total_count;
        self.collection = response.data.tournaments;
      })
    };
  });

export default TournamentStore;
