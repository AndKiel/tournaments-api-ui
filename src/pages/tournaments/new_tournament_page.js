import React, { Component } from 'react';
import { Grid } from 'material-ui';
import TournamentForm from '../../forms/tournament_form';

class NewTournamentPage extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TournamentForm />
        </Grid>
      </Grid>
    );
  }
}

export default NewTournamentPage;
