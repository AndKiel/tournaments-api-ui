import { Form } from 'mobx-react-form';
import moment from 'moment';

class TournamentForm extends Form {
  setup() {
    return {
      fields: [
        'tournament.competitors_limit',
        'tournament.description',
        'tournament.name',
        'tournament.result_names[]',
        'tournament.starts_at'
      ],
      labels: {
        'tournament.competitors_limit': 'Competitors limit',
        'tournament.description': 'Description',
        'tournament.name': 'Name',
        'tournament.result_names': 'Result names',
        'tournament.starts_at': 'Starts at'
      },
      initials: {
        'tournament.starts_at': moment(),
        'tournament.result_names': ['Win', 'Points']
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
