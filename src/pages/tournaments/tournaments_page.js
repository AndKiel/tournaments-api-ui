import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Typography } from 'material-ui';
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
      <div>
        <Typography type="headline">Tournaments</Typography>
        <TournamentsList onChangePage={this.onChangePage} />
      </div>
    );
  }
}

export default TournamentsPage;
