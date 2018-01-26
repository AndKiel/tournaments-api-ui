import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Typography } from 'material-ui';
import TournamentsList from '../../components/tournaments/tournaments_list';

@inject('store')
@observer
class EnlistedTournamentsPage extends Component {
  componentWillMount() {
    this.props.store.enlistedTournamentsStore.getTournaments();
  }

  @autobind
  onChangePage(event, page) {
    this.props.store.enlistedTournamentsStore.getTournaments(page + 1);
  }

  render() {
    return (
      <div>
        <Typography type="headline">Enlisted tournaments</Typography>
        <TournamentsList
          collection={this.props.store.enlistedTournamentsStore.collection}
          count={this.props.store.enlistedTournamentsStore.totalCount}
          page={this.props.store.enlistedTournamentsStore.page}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default EnlistedTournamentsPage;
