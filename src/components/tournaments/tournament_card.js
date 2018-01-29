import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Card, CardContent, Typography } from 'material-ui';
import CalendarIcon from './calendar_icon';
import styles from './tournament_card.scss';

@observer
class TournamentCard extends Component {
  render() {
    const {
      name,
      parsedStartsAt,
      competitors_limit,
      status
    } = this.props.tournament;

    return (
      <Card className={styles['tournament-card']}>
        <CardContent>
          <CalendarIcon date={parsedStartsAt} />
        </CardContent>
        <CardContent>
          <Typography type="title">{name}</Typography>
          <Typography>Starts at {parsedStartsAt.format('HH:mm')}</Typography>
          <Typography>Competitors limit: {competitors_limit}</Typography>
          <Typography>Status: {status}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default TournamentCard;
