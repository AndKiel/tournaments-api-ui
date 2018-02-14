import { types } from 'mobx-state-tree';
import moment from 'moment';

const FilterStore = types
  .model('FilterStore', {
    starts_at_after: types.optional(
      types.maybe(types.string),
      moment().toISOString()
    ),
    with_name: types.optional(types.maybe(types.string), '')
  })
  .actions(self => {
    return {
      setFilter(name, value = null) {
        self[name] = value;
      },

      isFilterEnabled(name) {
        return !!self[name];
      }
    };
  });

export default FilterStore;
