import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from 'material-ui';

@inject('store')
@observer
class TournamentForm extends Component {
  @observable
  formData = {
    tournament: {
      competitors_limit: '',
      description: '',
      name: '',
      result_names: [],
      starts_at: ''
    }
  };
  @observable errors = {};

  @autobind
  async submitForm(e) {
    try {
      e.preventDefault();
      this.errors = {};
      await this.props.store.organisedTournamentsStore.createTournament(
        this.formData
      );
      this.props.store.uiStore.setAlert(
        'success',
        'You have successfully created a tournament.'
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.fields) {
        this.errors = error.response.data.fields;
      } else {
        throw error;
      }
    }
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.submitForm}>
          <CardContent>
            <Typography type="headline">New tournament</Typography>
            <TextField
              id="name"
              label="Name"
              value={this.formData.tournament.name}
              error={this.errors.name}
              helperText={this.errors.name ? this.errors.name.join(', ') : ''}
              onChange={e => (this.formData.tournament.name = e.target.value)}
              margin="normal"
              autoFocus
              required
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button color="primary" style={{ flex: 1 }} type="submit">
              Create
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

export default TournamentForm;
