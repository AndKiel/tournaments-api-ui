import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { inject, observer } from 'mobx-react/index';
import { Grid, Typography } from 'material-ui';
import AddCompetitorButton from './buttons/add_competitor_button';
import EnlistButton from './buttons/enlist_button';
import ResignButton from './buttons/resign_button';
import OrderButton from './buttons/order_button';
import Competitor from './competitor';
import styles from './competitors_list.module.scss';

@translate()
@inject('store')
@observer
class CompetitorsList extends Component {
  render() {
    const { t } = this.props;
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div className={styles.container}>
        <div className={styles.side}>
          {this.props.store.sessionStore.isSignedIn &&
            tournament.status === 'created' && (
              <div>
                <AddCompetitorButton />
                <EnlistButton />
                <ResignButton />
              </div>
            )}
          <OrderButton />
        </div>
        <div className={styles.main}>
          <Typography>
            {t('components.tournaments.tournament_card.competitors_limit', {
              count: tournament.competitors_limit
            })}
          </Typography>
          <Typography paragraph>
            {t(
              'components.competitors.competitors_list.confirmed_competitors',
              {
                number: tournament.confirmedCompetitorsCount,
                count: tournament.competitorsCount
              }
            )}
          </Typography>
          {tournament.isUserOrganiser &&
            tournament.status === 'created' && (
              <Typography paragraph>
                {t('components.competitors.competitors_list.help')}
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
