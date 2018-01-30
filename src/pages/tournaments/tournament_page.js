import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography
} from 'material-ui';
import Loading from '../../components/loading';
import CalendarIcon from '../../components/tournaments/calendar_icon';
import TimeIcon from '../../components/tournaments/time_icon';
import CompetitorsList from '../../components/competitors/competitors_list';
import RoundsList from '../../components/rounds/rounds_list';
import ResultsList from '../../components/results/results_list';
import styles from './tournament_page.scss';

@inject('store')
@observer
class TournamentPage extends Component {
  @observable activeTab = 0;

  componentWillMount() {
    this.props.store.tournamentsStore.getTournament(this.props.match.params.id);
  }

  @autobind
  onTabChange(e, value) {
    this.activeTab = value;
  }

  render() {
    if (this.props.store.tournamentsStore.item) {
      const tournament = this.props.store.tournamentsStore.item;

      return (
        <Grid container>
          <Grid item xs={12} md={5} lg={4}>
            <Card className={styles.details}>
              <CardContent>
                <CalendarIcon date={tournament.parsedStartsAt} />
                <TimeIcon date={tournament.parsedStartsAt} />
              </CardContent>
              <CardContent className={styles.content}>
                <Typography type="headline">{tournament.name}</Typography>
                <Typography>Status: {tournament.status}</Typography>
                {tournament.description.split('\n').map(p => {
                  return <Typography>{p}</Typography>;
                })}
              </CardContent>
            </Card>
            <CompetitorsList />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Paper>
              <Tabs
                value={this.activeTab}
                onChange={this.onTabChange}
                textColor="primary"
                centered
              >
                <Tab label="Rounds" />
                <Tab label="Results" />
              </Tabs>
            </Paper>
            <Card>
              <CardContent>
                {this.activeTab === 0 && <RoundsList />}
                {this.activeTab === 1 && <ResultsList />}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      return <Loading />;
    }
  }
}

export default TournamentPage;
