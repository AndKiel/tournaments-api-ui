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
import CalendarIcon from './calendar_icon';
import TimeIcon from './time_icon';
import StatusIcon from './status_icon';
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
            <Typography type="title">
              {name}
              <StatusIcon status={status} />
            </Typography>
            {this.props.withLimit && (
              <Typography>Competitors limit: {competitors_limit}</Typography>
            )}
            {this.props.withDescription &&
              description.split('\n').map((p, idx) => {
                return <Typography key={`p${idx}`}>{p}</Typography>;
              })}
          </div>
          <div className={styles.actions}>
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
