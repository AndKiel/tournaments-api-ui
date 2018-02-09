import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Grid, Typography } from 'material-ui';
import AddCompetitorButton from './buttons/add_competitor_button';
import EnlistButton from './buttons/enlist_button';
import ResignButton from './buttons/resign_button';
import Competitor from './competitor';
import styles from './competitors_list.scss';

@inject('store')
@observer
class CompetitorsList extends Component {
  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div className={styles.container}>
        {this.props.store.sessionStore.isSignedIn &&
          tournament.status === 'created' && (
            <div className={styles.side}>
              <AddCompetitorButton />
              <EnlistButton />
              <ResignButton />
            </div>
          )}
        <div className={styles.main}>
          <Typography>
            Competitors limit: {tournament.competitors_limit}
          </Typography>
          <Typography paragraph>
            Confirmed {tournament.confirmedCompetitorsCount} out of{' '}
            {tournament.competitorsCount} competitors
          </Typography>
          {tournament.isUserOrganiser &&
            tournament.status === 'created' && (
              <Typography paragraph>
                Click on a name to confirm or reject a competitor. Only
                confirmed competitors can be assigned to tables in rounds.
              </Typography>
            )}
          <Grid className={styles.grid} container>
            {tournament.competitors.map(competitor => {
              return <Competitor key={competitor.id} competitor={competitor} />;
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default CompetitorsList;
