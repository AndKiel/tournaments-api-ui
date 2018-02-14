import { types, getEnv, getRoot, flow } from 'mobx-state-tree';
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
        const filters = getRoot(self).filterStore;
        const response = yield apiClient.get(apiRoutes.tournaments(), {
          authenticate: true,
          params: { page, filters }
        });
        self.totalCount = response.data.meta.total_count;
        self.collection = response.data.tournaments;
      }),

      startTournament: flow(function* startTournament(id) {
        return yield apiClient.post(apiRoutes.startTournament(id), {
          authenticate: true
        });
      }),

      endTournament: flow(function* endTournament(id) {
        return yield apiClient.post(apiRoutes.endTournament(id), {
          authenticate: true
        });
      }),

      updateTournament: flow(function* updateTournament(id, data) {
        return yield apiClient.patch(apiRoutes.tournament(id), {
          authenticate: true,
          data: data
        });
      }),

      deleteTournament: flow(function* deleteTournament(id) {
        yield apiClient.delete(apiRoutes.tournament(id), {
          authenticate: true
        });
      })
    };
  });

export default OrganisedTournamentsStore;
