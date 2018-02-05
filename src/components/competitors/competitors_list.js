import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Card, CardContent, List, Typography } from 'material-ui';
import Actions from './actions';
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
              <span className={styles.title}>
                {`Competitors (${tournament.competitorsCount}/${
                  tournament.competitors_limit
                })`}
              </span>
            </Typography>
            {this.props.store.sessionStore.isSignedIn && <Actions />}
          </div>
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
