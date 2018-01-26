import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Typography } from 'material-ui';
import TournamentsList from '../../components/tournaments/tournaments_list';

@inject('store')
@observer
class AttendedTournamentsPage extends Component {
  componentWillMount() {
    this.props.store.attendedTournamentsStore.getTournaments();
  }

  @autobind
  onChangePage(event, page) {
    this.props.store.attendedTournamentsStore.getTournaments(page + 1);
  }

  render() {
    return (
      <div>
        <Typography type="headline">Attended tournaments</Typography>
        <TournamentsList
          collection={this.props.store.attendedTournamentsStore.collection}
          count={this.props.store.attendedTournamentsStore.totalCount}
          page={this.props.store.attendedTournamentsStore.page}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default AttendedTournamentsPage;
