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

    const getTournaments = flow(function* getTournaments(url, opts) {
      const response = yield apiClient.get(url, opts);
      const { params: { page } } = opts;
      self.page = page;
      self.totalCount = response.data.meta.total_count;
      self.collection = response.data.tournaments;
    });

    return {
      getAllTournaments: flow(function* getAllTournaments(page = 1) {
        yield getTournaments(apiRoutes.tournaments(), {
          params: { page }
        });
      }),

      getOrganisedTournaments: flow(function* getOrganisedTournaments(
        page = 1
      ) {
        yield getTournaments(apiRoutes.tournaments(), {
          authenticate: true,
          params: { page }
        });
      }),

      getAttendedTournaments: flow(function* getAttendedTournaments(page = 1) {
        yield getTournaments(apiRoutes.enlistedTournaments(), {
          authenticate: true,
          params: { page }
        });
      })
    };
  });

export default TournamentStore;
