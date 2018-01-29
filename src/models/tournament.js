import { types } from 'mobx-state-tree';
import Competitor from './competitor';
import Round from './round';
import moment from 'moment';

const Tournament = types
  .model('Tournament', {
    id: types.identifier(types.string),
    competitors_limit: types.number,
    description: types.string,
    name: types.string,
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
      }
    };
  });

export default Tournament;
