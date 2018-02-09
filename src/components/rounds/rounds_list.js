import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import NewRoundButton from './buttons/new_round_button';
import Round from './round';
import styles from './rounds_list.scss';

@inject('store')
@observer
class RoundsList extends Component {
  render() {
    const rounds = this.props.store.tournamentsStore.item.rounds;

    return (
      <div className={styles.container}>
        <div className={styles.side}>
          <NewRoundButton />
        </div>
        <div className={styles.main}>
          {rounds.map((round, idx) => {
            return <Round key={round.id} number={idx + 1} round={round} />;
          })}
        </div>
      </div>
    );
  }
}

export default RoundsList;
