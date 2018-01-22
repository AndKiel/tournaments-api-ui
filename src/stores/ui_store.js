import { types } from 'mobx-state-tree';

const UIStore = types
  .model('UIStore', {
    alert_text: types.optional(types.string, ''),
    alert_type: types.optional(types.string, '')
  })
  .actions(self => {
    return {
      closeAlert() {
        self.alert_type = '';
        self.alert_text = '';
      },

      setAlert(type, text) {
        self.alert_type = type;
        self.alert_text = text;
        setTimeout(() => self.closeAlert(), 5000);
      }
    };
  });

export default UIStore;
