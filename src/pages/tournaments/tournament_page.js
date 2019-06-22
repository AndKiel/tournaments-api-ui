import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Grid, Tabs, Tab } from 'material-ui';
import Loading from '../../components/utils/loading';
import TournamentCard from '../../components/tournaments/tournament_card';
import CompetitorsList from '../../components/competitors/competitors_list';
import RoundsList from '../../components/rounds/rounds_list';
import ResultsList from '../../components/results/results_list';
import styles from './tournament_page.module.scss';

@translate()
@inject('store')
@observer
class TournamentPage extends Component {
  @observable activeTab = 0;

  componentWillMount() {
    this.setup();
  }

  @autobind
  async setup() {
    await this.props.store.tournamentsStore.getTournament(
      this.props.match.params.id
    );
    switch (this.props.store.tournamentsStore.item.status) {
      case 'in_progress':
        this.activeTab = 1;
        break;
      case 'ended':
        this.activeTab = 2;
        break;
      default:
      // nothing
    }
  }

  @autobind
  changeTab(e, value) {
    this.activeTab = value;
  }

  render() {
    if (this.props.store.tournamentsStore.item) {
      const { t } = this.props;
      const tournament = this.props.store.tournamentsStore.item;

      return (
        <Grid container>
          <Grid item xs={12} md={5} lg={4}>
            <TournamentCard tournament={tournament} withDescription />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <div className={styles.tabs}>
              <Tabs
                value={this.activeTab}
                onChange={this.changeTab}
                centered
                fullWidth
              >
                <Tab
                  label={t('pages.tournament.tabs.competitors')}
                  disableRipple
                />
                <Tab label={t('pages.tournament.tabs.rounds')} disableRipple />
                <Tab label={t('pages.tournament.tabs.results')} disableRipple />
              </Tabs>
            </div>
            <div className={styles.contents}>
              {this.activeTab === 0 && <CompetitorsList />}
              {this.activeTab === 1 && <RoundsList />}
              {this.activeTab === 2 && <ResultsList />}
            </div>
          </Grid>
        </Grid>
      );
    } else {
      return <Loading />;
    }
  }
}

export default TournamentPage;
