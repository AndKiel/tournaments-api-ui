import { types, getEnv, flow } from 'mobx-state-tree';
import apiRoutes from '../utils/api_routes';

const Competitor = types
  .model('Competitor', {
    id: types.identifier(types.string),
    name: types.string,
    status: types.enumeration(['enlisted', 'confirmed']),
    user_id: types.maybe(types.string)
  })
  .actions(self => {
    const { apiClient } = getEnv(self);

    return {
      confirm: flow(function* confirm() {
        yield apiClient.post(apiRoutes.confirmCompetitor(self.id), {
          authenticate: true
        });
        self.status = 'confirmed';
      })
    };
  });

export default Competitor;
