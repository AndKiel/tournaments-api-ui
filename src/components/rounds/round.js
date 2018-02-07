import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Typography } from 'material-ui';
import EditRoundButton from './buttons/edit_round_button';
import AssignPlayersButton from './buttons/assign_players_button';
import RemoveRoundButton from './buttons/remove_round_button';
import styles from './round.scss';

@inject('store')
@observer
class Round extends Component {
  render() {
    const round = this.props.round;

    return (
      <div className={styles.container}>
        <div className={styles.side}>
          <Typography align="center" type="subheading">
            Round {this.props.number}
          </Typography>
          <Typography align="center">
            {round.competitors_limit} competitors
          </Typography>
          <Typography align="center">on {round.tables_count} tables</Typography>
          <Typography align="center" component="span">
            <EditRoundButton round={round} />
            <AssignPlayersButton round={round} />
            <RemoveRoundButton round={round} />
          </Typography>
        </div>
        <div className={styles.main}>
          <Typography>Player-table assignment placeholder</Typography>
        </div>
      </div>
    );
  }
}

export default Round;
