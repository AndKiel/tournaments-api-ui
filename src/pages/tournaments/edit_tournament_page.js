import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from 'material-ui';
import Loading from '../../components/utils/loading';
import TournamentForm from '../../forms/tournament_form';
import TextInput from '../../components/forms/text_input';
import DatetimeInput from '../../components/forms/datetime_input';
import ArrayInput from '../../components/forms/array_input';
import routes from '../../utils/routes';

@withRouter
@inject('store')
@observer
class EditTournamentPage extends Component {
  componentWillMount() {
    this.setup();
  }

  @autobind
  async setup() {
    this.form = new TournamentForm();
    this.form.submitImpl = this.submitImpl;
    await this.props.store.tournamentsStore.getTournament(
      this.props.match.params.id
    );
    this.form.set({ tournament: this.props.store.tournamentsStore.item });
  }

  @autobind
  async submitImpl() {
    const response = await this.props.store.organisedTournamentsStore.updateTournament(
      this.props.match.params.id,
      this.form.values()
    );
    this.props.history.push(routes.tournament(response.data.tournament.id));
    this.props.store.uiStore.setAlert(
      'You have successfully updated a tournament.'
    );
  }

  render() {
    if (this.props.store.tournamentsStore.item) {
      return (
        <Grid container justify="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <form onSubmit={this.form.onSubmit}>
                <CardContent>
                  <Typography variant="headline">Edit tournament</Typography>
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
                  <ArrayInput field={this.form.$('tournament.result_names')} />
                </CardContent>
                <CardActions>
                  <Button color="primary" style={{ flex: 1 }} type="submit">
                    Update
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      return <Loading />;
    }
  }
}

export default EditTournamentPage;
