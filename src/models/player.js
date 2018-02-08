import { types, getEnv, flow } from 'mobx-state-tree';
import Competitor from './competitor';
import apiRoutes from '../utils/api_routes';

const Player = types
  .model('Player', {
    id: types.identifier(types.string),
    competitor_id: types.reference(Competitor),
    result_values: types.array(types.number),
    table_number: types.number
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      update: flow(function* update(data) {
        const response = yield apiClient.patch(apiRoutes.player(self.id), {
          authenticate: true,
          data: data
        });
        Object.assign(self, response.data.player);
      })
    };
  });

export default Player;
