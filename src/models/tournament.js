import { types, getEnv, getRoot, flow } from 'mobx-state-tree';
import Competitor from './competitor';
import Round from './round';
import moment from 'moment';
import apiRoutes from '../utils/api_routes';

const Tournament = types
  .model('Tournament', {
    id: types.identifier(types.string),
    competitors_limit: types.number,
    description: types.string,
    name: types.string,
    organiser_id: types.string,
    result_names: types.array(types.string),
    starts_at: types.string,
    status: types.enumeration(['created', 'in_progress', 'ended']),
    competitors: types.maybe(types.array(Competitor)),
    rounds: types.maybe(types.array(Round))
  })
  .views(self => {
    return {
      get parsedStartsAt() {
        return moment(self.starts_at);
      },

      get competitorsCount() {
        return self.competitors.length;
      },

      get isUserEnlisted() {
        const currentUserId = getRoot(self).userStore.user.id;
        return self.competitors
          .map(c => {
            return c.user_id;
          })
          .includes(currentUserId);
      }
    };
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      setStatus(status) {
        self.status = status;
      },

      enlist: flow(function* enlist(data) {
        const response = yield apiClient.post(apiRoutes.competitor(), {
          authenticate: true,
          params: {
            tournament_id: self.id
          },
          data: data
        });
        self.competitors.push(response.data.competitor);
      }),

      resign: flow(function* resign() {
        yield apiClient.delete(apiRoutes.competitor(), {
          authenticate: true,
          params: {
            tournament_id: self.id
          }
        });
        const user_id = getRoot(self).userStore.user.id;
        const index = self.competitors.findIndex(c => {
          return c.user_id === user_id;
        });
        self.competitors.splice(index, 1);
      })
    };
  });

export default Tournament;
