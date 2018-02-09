import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import { IconButton, Typography } from 'material-ui';
import NewRoundButton from './buttons/new_round_button';
import EditRoundButton from './buttons/edit_round_button';
import AssignPlayersButton from './buttons/assign_players_button';
import RemoveRoundButton from './buttons/remove_round_button';
import Round from './round';
import styles from './rounds_list.scss';

@inject('store')
@observer
class RoundsList extends Component {
  @observable currentRound = 0;

  render() {
    const rounds = this.props.store.tournamentsStore.item.rounds;
    const round = rounds[this.currentRound];

    return (
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div>
            <NewRoundButton />
          </div>
          {round && (
            <div>
              <EditRoundButton round={round} />
              <AssignPlayersButton round={round} />
              <RemoveRoundButton round={round} />
            </div>
          )}
        </div>
        <div className={styles.navigation}>
          {rounds.map((r, idx) => {
            const isCurrent = this.currentRound === idx;

            return (
              <IconButton
                key={idx}
                className={`${styles.button} ${isCurrent ? styles.active : ''}`}
                disabled={isCurrent}
                disableRipple
                onClick={() => {
                  this.currentRound = idx;
                }}
              >
                <Typography>{idx + 1}</Typography>
              </IconButton>
            );
          })}
        </div>
        <div>{round && <Round round={round} />}</div>
      </div>
    );
  }
}

export default RoundsList;
