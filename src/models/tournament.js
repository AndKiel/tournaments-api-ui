import { types, getEnv, getRoot, flow } from 'mobx-state-tree';
import Competitor from './competitor';
import Round from './round';
import Result from './result';
import moment from 'moment';
import apiRoutes from '../utils/api_routes';
import orderBy from 'lodash/orderBy';

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
    competitors: types.optional(types.array(Competitor), []),
    rounds: types.optional(types.array(Round), []),
    results: types.optional(types.array(Result), [])
  })
  .views(self => {
    const { sessionStore, userStore } = getRoot(self);

    return {
      get parsedStartsAt() {
        return moment(self.starts_at);
      },

      get competitorsCount() {
        return self.competitors.length;
      },

      get confirmedCompetitorsCount() {
        return self.competitors.filter(c => {
          return c.status === 'confirmed';
        }).length;
      },

      get isUserOrganiser() {
        return (
          sessionStore.isSignedIn && self.organiser_id === userStore.user.id
        );
      },

      get isUserEnlisted() {
        return (
          sessionStore.isSignedIn &&
          self.competitors
            .map(c => {
              return c.user_id;
            })
            .includes(userStore.user.id)
        );
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
      }),

      addCompetitor: flow(function* addCompetitor(data) {
        const response = yield apiClient.post(apiRoutes.addCompetitor(), {
          authenticate: true,
          params: {
            tournament_id: self.id
          },
          data: data
        });
        self.competitors.push(response.data.competitor);
        self.orderCompetitors();
      }),

      removeCompetitor: flow(function* removeCompetitor(id) {
        yield apiClient.delete(apiRoutes.removeCompetitor(id), {
          authenticate: true
        });
        const index = self.competitors.findIndex(c => {
          return c.id === id;
        });
        self.competitors.splice(index, 1);
      }),

      orderCompetitors(order = getRoot(self).uiStore.competitorsOrder) {
        self.competitors = orderBy(self.competitors, order);
      },

      addRound: flow(function* addRound(data) {
        const response = yield apiClient.post(apiRoutes.rounds(), {
          authenticate: true,
          params: {
            tournament_id: self.id
          },
          data: data
        });
        self.rounds.push(response.data.round);
      }),

      removeRound: flow(function* removeRound(id) {
        yield apiClient.delete(apiRoutes.round(id), {
          authenticate: true
        });
        const index = self.rounds.findIndex(r => {
          return r.id === id;
        });
        self.rounds.splice(index, 1);
      }),

      getResults: flow(function* getResults() {
        const response = yield apiClient.get(apiRoutes.results(), {
          params: {
            tournament_id: self.id
          }
        });
        self.results = response.data.results;
      })
    };
  });

export default Tournament;
