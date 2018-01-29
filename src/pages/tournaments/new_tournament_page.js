import React, { Component } from 'react';
import { inject } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from 'material-ui';
import TournamentForm from '../../forms/tournament_form';
import TextInput from '../../components/forms/text_input';

@inject('store')
class NewTournamentPage extends Component {
  componentWillMount() {
    this.form = new TournamentForm();
  }

  @autobind
  async submitForm(e) {
    try {
      e.preventDefault();
      await this.form.validate();
      await this.props.store.organisedTournamentsStore.createTournament(
        this.form.values()
      );
      this.props.store.uiStore.setAlert(
        'success',
        'You have successfully created a tournament.'
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.fields) {
        for (let pair of Object.entries(error.response.data.fields)) {
          this.form.$(`tournament.${pair[0]}`).invalidate(pair[1].join(', '));
        }
      } else {
        throw error;
      }
    }
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={this.submitForm}>
              <CardContent>
                <Typography type="headline">New tournament</Typography>
                <TextInput
                  field={this.form.$('tournament.name')}
                  autoFocus
                  required
                />
              </CardContent>
              <CardActions>
                <Button color="primary" style={{ flex: 1 }} type="submit">
                  Create
                </Button>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default NewTournamentPage;
