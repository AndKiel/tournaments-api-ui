import { types, getEnv, flow } from "mobx-state-tree";
import Player from "./player";
import apiRoutes from "../utils/api_routes";

const Round = types
  .model("Round", {
    id: types.identifier(types.string),
    competitors_limit: types.number,
    created_at: types.string,
    tables_count: types.number,
    players: types.optional(types.array(Player), [])
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      update: flow(function* update(data) {
        const response = yield apiClient.patch(apiRoutes.round(self.id), {
          authenticate: true,
          data: data
        });
        Object.assign(self, response.data.round);
      }),

      assignPlayers: flow(function* assignPlayers() {
        const response = yield apiClient.post(apiRoutes.players(), {
          authenticate: true,
          params: {
            round_id: self.id
          }
        });
        self.players = response.data.players;
      })
    };
  });

export default Round;
