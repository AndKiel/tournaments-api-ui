import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Typography } from 'material-ui';
import TournamentsList from '../../components/tournaments/tournaments_list';

@inject('store')
@observer
class OrganisedTournamentsPage extends Component {
  componentWillMount() {
    this.props.store.organisedTournamentsStore.getTournaments();
  }

  @autobind
  onChangePage(event, page) {
    this.props.store.organisedTournamentsStore.getTournaments(page + 1);
  }

  render() {
    return (
      <div>
        <Typography type="headline">Organised tournaments</Typography>
        <TournamentsList
          collection={this.props.store.organisedTournamentsStore.collection}
          count={this.props.store.organisedTournamentsStore.totalCount}
          page={this.props.store.organisedTournamentsStore.page}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default OrganisedTournamentsPage;
