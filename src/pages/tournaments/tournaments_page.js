import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Grid, Card, CardContent, Typography } from 'material-ui';
import TournamentsList from '../../components/tournaments/tournaments_list';

@inject('store')
@observer
class TournamentsPage extends Component {
  componentWillMount() {
    this.props.store.tournamentStore.getAllTournaments();
  }

  @autobind
  onChangePage(event, page) {
    this.props.store.tournamentStore.getAllTournaments(page + 1);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography type="headline">Tournaments</Typography>
              <TournamentsList onChangePage={this.onChangePage} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default TournamentsPage;
