import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography
} from 'material-ui';
import CalendarIcon from './icons/calendar_icon';
import TimeIcon from './icons/time_icon';
import StatusIcon from './icons/status_icon';
import OrganiserMenu from './organiser_menu';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../../utils/routes';
import styles from './tournament_card.scss';

@observer
class TournamentCard extends Component {
  render() {
    const {
      id,
      name,
      description,
      parsedStartsAt,
      competitors_limit,
      status
    } = this.props.tournament;

    return (
      <Card className={styles.card}>
        <CardContent>
          <CalendarIcon date={parsedStartsAt} />
          <TimeIcon date={parsedStartsAt} />
        </CardContent>
        <CardContent className={styles['card-content']}>
          <div className={styles.info}>
            <Typography type="title" paragraph component="span">
              {name}
              <StatusIcon status={status} />
            </Typography>
            {this.props.withLimit && (
              <Typography>Competitors limit: {competitors_limit}</Typography>
            )}
            {this.props.withDescription &&
              description.split('\n').map((p, idx) => {
                return (
                  <Typography key={`p${idx}`} paragraph={p.length === 0}>
                    {p}
                  </Typography>
                );
              })}
          </div>
          <div className={styles.actions}>
            <OrganiserMenu tournament={this.props.tournament} />
            {this.props.withActions && (
              <Tooltip title="Details">
                <IconButton
                  className={styles.details}
                  component={Link}
                  to={routes.tournament(id)}
                >
                  <FontAwesomeIcon icon="info-circle" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default TournamentCard;
