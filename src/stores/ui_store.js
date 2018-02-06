import { types } from 'mobx-state-tree';

const UIStore = types
  .model('UIStore', {
    alertText: types.optional(types.string, ''),
    alertType: types.optional(types.string, ''),
    isAlertOpen: types.optional(types.boolean, false)
  })
  .actions(self => {
    return {
      closeAlert() {
        self.isAlertOpen = false;
      },

      setAlert(text, type = 'success') {
        self.alertText = text;
        self.alertType = type;
        self.isAlertOpen = true;
        setTimeout(() => self.closeAlert(), 5000);
      }
    };
  });

export default UIStore;
