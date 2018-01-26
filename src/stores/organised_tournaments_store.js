import { types, getEnv, flow } from 'mobx-state-tree';
import Tournament from '../models/tournament';
import apiRoutes from '../utils/api_routes';

const OrganisedTournamentsStore = types
  .model('OrganisedTournamentsStore', {
    collection: types.optional(types.array(Tournament), []),
    page: types.optional(types.number, 1),
    totalCount: types.optional(types.number, 0)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      createTournament: flow(function* createTournament(data) {
        return yield apiClient.post(apiRoutes.tournaments(), {
          authenticate: true,
          data: data
        });
      }),

      getTournaments: flow(function* getTournaments(page = 1) {
        self.page = page;
        const response = yield apiClient.get(apiRoutes.tournaments(), {
          authenticate: true,
          params: { page }
        });
        self.totalCount = response.data.meta.total_count;
        self.collection = response.data.tournaments;
      })
    };
  });

export default OrganisedTournamentsStore;
