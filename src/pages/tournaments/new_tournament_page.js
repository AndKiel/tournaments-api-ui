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
import DatetimeInput from '../../components/forms/datetime_input';

@inject('store')
class NewTournamentPage extends Component {
  componentWillMount() {
    this.form = new TournamentForm();
    this.form.submit = this.submit;
  }

  @autobind
  async submit() {
    await this.props.store.organisedTournamentsStore.createTournament(
      this.form.values()
    );
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully created a tournament.'
    );
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <form onSubmit={this.form.onSubmit}>
              <CardContent>
                <Typography type="headline">New tournament</Typography>
                <TextInput
                  field={this.form.$('tournament.name')}
                  autoFocus
                  required
                />
                <TextInput
                  field={this.form.$('tournament.description')}
                  multiline
                  rows={5}
                />
                <DatetimeInput
                  field={this.form.$('tournament.starts_at')}
                  required
                />
                <TextInput
                  field={this.form.$('tournament.competitors_limit')}
                  type="number"
                  required
                />
                <TextInput field={this.form.$('tournament.result_names')} />
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
