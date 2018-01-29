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
}

export default TournamentForm;
