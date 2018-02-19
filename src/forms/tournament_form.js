import { Form } from 'mobx-react-form';

class TournamentForm extends Form {
  setup() {
    return {
      fields: [
        'tournament.competitors_limit',
        'tournament.description',
        'tournament.name',
        'tournament.result_names',
        'tournament.starts_at'
      ],
      initials: {
        'tournament.result_names': []
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
