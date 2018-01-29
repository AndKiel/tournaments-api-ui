import { Form } from 'mobx-react-form';

class TournamentForm extends Form {
  setup() {
    return {
      fields: ['tournament.name'],
      labels: {
        'tournament.name': 'Name'
      }
    };
  }

  hooks() {
    return {
      async onSubmit(form) {
        try {
          form.validate();
          await form.submit();
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.fields
          ) {
            for (let pair of Object.entries(error.response.data.fields)) {
              form.$(`tournament.${pair[0]}`).invalidate(pair[1].join(', '));
            }
          } else {
            throw error;
          }
        }
      }
    };
  }
}

export default TournamentForm;
