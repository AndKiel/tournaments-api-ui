import { types } from 'mobx-state-tree';

const FilterStore = types
  .model('FilterStore', {
    starts_at_after: types.maybe(types.string)
  })
  .views(self => {
    return {
      get isStartsAtAfterEnabled() {
        return !!self.starts_at_after;
      }
    };
  })
  .actions(self => {
    return {
      setFilter(name, value = null) {
        self[name] = value;
      }
    };
  });

export default FilterStore;
