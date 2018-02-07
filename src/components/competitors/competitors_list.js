import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Card, CardContent, List, Typography } from 'material-ui';
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
      <Card>
        <CardContent>
          <div className={styles.header}>
            <Typography type="title" className={styles.title}>
              {`Competitors (${tournament.competitorsCount}/${
                tournament.competitors_limit
              })`}
            </Typography>
            {this.props.store.sessionStore.isSignedIn &&
              tournament.status === 'created' && (
                <div>
                  <AddCompetitorButton />
                  <EnlistButton />
                  <ResignButton />
                </div>
              )}
          </div>
          <Typography paragraph>
            Confirmed: {tournament.confirmedCompetitorsCount}
          </Typography>
          <List>
            {tournament.competitors.map(competitor => {
              return <Competitor key={competitor.id} competitor={competitor} />;
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default CompetitorsList;
