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
  async submitForm() {
    try {
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

  @autobind
  async onEnterKeyPressed(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      await this.submitForm();
    }
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography type="headline">New tournament</Typography>
          <TextField
            id="name"
            label="Name"
            value={this.formData.tournament.name}
            error={this.errors.name}
            helperText={this.errors.name ? this.errors.name.join(', ') : ''}
            onChange={e => (this.formData.tournament.name = e.target.value)}
            onKeyPress={this.onEnterKeyPressed}
            margin="normal"
            autoFocus
            required
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button color="primary" style={{ flex: 1 }} onClick={this.submitForm}>
            Create
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default TournamentForm;
