import { types } from 'mobx-state-tree';
import Player from './player';

const Round = types.model('Round', {
  id: types.identifier(types.string),
  competitors_limit: types.number,
  created_at: types.string,
  tables_count: types.number,
  players: types.maybe(types.array(Player))
});

export default Round;
