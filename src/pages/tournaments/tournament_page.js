import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Button, Grid } from 'material-ui';
import Loading from '../../components/utils/loading';
import TournamentCard from '../../components/tournaments/tournament_card';
import CompetitorsList from '../../components/competitors/competitors_list';
import RoundsList from '../../components/rounds/rounds_list';
import ResultsList from '../../components/results/results_list';
import styles from './tournament_page.scss';

@inject('store')
@observer
class TournamentPage extends Component {
  @observable activeContents = 0;

  componentWillMount() {
    this.props.store.tournamentsStore.getTournament(this.props.match.params.id);
  }

  @autobind
  toggleContents() {
    this.activeContents = this.activeContents ? 0 : 1;
  }

  render() {
    if (this.props.store.tournamentsStore.item) {
      const tournament = this.props.store.tournamentsStore.item;

      return (
        <Grid container>
          <Grid item xs={12} md={5} lg={4}>
            <TournamentCard tournament={tournament} withDescription />
            <CompetitorsList />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Button
              className={styles['toggle-button']}
              color="primary"
              variant="raised"
              onClick={this.toggleContents}
            >
              {this.activeContents === 0 && 'See results'}
              {this.activeContents === 1 && 'See rounds'}
            </Button>
            {this.activeContents === 0 && <RoundsList />}
            {this.activeContents === 1 && <ResultsList />}
          </Grid>
        </Grid>
      );
    } else {
      return <Loading />;
    }
  }
}

export default TournamentPage;
