import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Typography } from 'material-ui';
import TournamentsList from '../../components/tournaments/tournaments_list';

@inject('store')
@observer
class TournamentsPage extends Component {
  componentWillMount() {
    this.props.store.tournamentsStore.getTournaments();
  }

  @autobind
  onChangePage(event, page) {
    this.props.store.tournamentsStore.getTournaments(page + 1);
  }

  render() {
    return (
      <div>
        <Typography type="headline">Tournaments</Typography>
        <TournamentsList
          collection={this.props.store.tournamentsStore.collection}
          count={this.props.store.tournamentsStore.totalCount}
          page={this.props.store.tournamentsStore.page}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default TournamentsPage;
