import { types } from 'mobx-state-tree';

const UIStore = types
  .model('UIStore', {
    alertText: types.optional(types.string, ''),
    alertType: types.optional(types.string, '')
  })
  .actions(self => {
    return {
      closeAlert() {
        self.alertType = '';
        self.alertText = '';
      },

      setAlert(type, text) {
        self.alertType = type;
        self.alertText = text;
        setTimeout(() => self.closeAlert(), 5000);
      }
    };
  });

export default UIStore;
