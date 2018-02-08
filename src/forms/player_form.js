import { Form } from 'mobx-react-form';

class PlayerForm extends Form {
  setup() {
    return {
      fields: ['player.result_values[]'],
      labels: {
        'player.result_values': 'Result values'
      },
      values: {
        player: {
          result_values: []
        }
      }
    };
  }

  hooks() {
    return {
      async onSubmit(form) {
        try {
          form.validate();
          await form.submitImpl();
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.fields
          ) {
            for (let pair of Object.entries(error.response.data.fields)) {
              form.$(`player.${pair[0]}`).invalidate(pair[1].join(', '));
            }
          } else {
            throw error;
          }
        }
      }
    };
  }
}

export default PlayerForm;
