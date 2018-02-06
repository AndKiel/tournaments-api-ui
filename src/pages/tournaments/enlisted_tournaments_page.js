import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Grid, Typography } from 'material-ui';
import TournamentCard from '../../components/tournaments/tournament_card';
import Pagination from '../../components/utils/pagination';

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
    const {
      collection,
      totalCount,
      page
    } = this.props.store.enlistedTournamentsStore;

    return (
      <div>
        <Typography type="headline">Enlisted tournaments</Typography>
        <Grid container spacing={24}>
          {collection.map(t => {
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={t.id}>
                <TournamentCard tournament={t} withLimit withActions />
              </Grid>
            );
          })}
          <Pagination
            count={totalCount}
            page={page}
            onChangePage={this.onChangePage}
          />
        </Grid>
      </div>
    );
  }
}

export default EnlistedTournamentsPage;
