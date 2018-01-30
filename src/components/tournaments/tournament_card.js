import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from 'material-ui';
import CalendarIcon from './calendar_icon';
import TimeIcon from './time_icon';
import StatusIcon from './status_icon';
import routes from '../../utils/routes';
import styles from './tournament_card.scss';

@observer
class TournamentCard extends Component {
  render() {
    const {
      id,
      name,
      parsedStartsAt,
      competitors_limit,
      status
    } = this.props.tournament;

    return (
      <Card className={styles['tournament-card']}>
        <CardContent>
          <CalendarIcon date={parsedStartsAt} />
          <TimeIcon date={parsedStartsAt} />
        </CardContent>
        <CardContent className={styles['tournament-card-content']}>
          <Typography type="title">
            {name}
            <StatusIcon status={status} />
          </Typography>
          <Typography>Competitors limit: {competitors_limit}</Typography>
        </CardContent>
        <CardActions>
          <Button
            className={styles['action-details']}
            size="small"
            color="primary"
            component={Link}
            to={routes.tournament(id)}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default TournamentCard;
