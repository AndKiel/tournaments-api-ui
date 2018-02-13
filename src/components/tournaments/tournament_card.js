import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { Card, CardContent, Typography } from 'material-ui';
import CalendarIcon from './icons/calendar_icon';
import TimeIcon from './icons/time_icon';
import StatusIcon from './icons/status_icon';
import OrganiserMenu from './organiser_menu';
import routes from '../../utils/routes';
import styles from './tournament_card.scss';
import classNames from 'classnames';

@withRouter
@observer
class TournamentCard extends Component {
  @autobind
  goToTournament() {
    this.props.history.push(routes.tournament(this.props.tournament.id));
  }

  render() {
    const {
      name,
      description,
      parsedStartsAt,
      competitors_limit,
      status
    } = this.props.tournament;

    const cardClasses = classNames(styles.card, {
      [styles.clickable]: this.props.clickable
    });

    return (
      <Card className={cardClasses} onClick={this.goToTournament}>
        <CardContent>
          <CalendarIcon date={parsedStartsAt} />
          <TimeIcon date={parsedStartsAt} />
        </CardContent>
        <CardContent className={styles.content}>
          <div className={styles.info}>
            <Typography variant="title" paragraph component="span">
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
          <OrganiserMenu tournament={this.props.tournament} />
        </CardContent>
      </Card>
    );
  }
}

TournamentCard.propTypes = {
  clickable: PropTypes.bool,
  tournament: PropTypes.object.isRequired,
  withDescription: PropTypes.bool,
  withLimit: PropTypes.bool
};

export default TournamentCard;
