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
      setFilter(name, value) {
        self[name] = value;
      },

      isFilterEnabled(name) {
        return !!self[name];
      },

      toggleFilter(name, value) {
        self.isFilterEnabled(name)
          ? self.setFilter(name, null)
          : self.setFilter(name, value);
      }
    };
  });

export default FilterStore;
