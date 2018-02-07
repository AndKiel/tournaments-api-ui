import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { Typography } from 'material-ui';
import NewRoundButton from './buttons/new_round_button';
import Round from './round';

@inject('store')
@observer
class RoundsList extends Component {
  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div>
        <Typography component="span" type="title" paragraph>
          Rounds
          <NewRoundButton />
        </Typography>
        {tournament.rounds.map(round => {
          return <Round key={round.id} round={round} />;
        })}
      </div>
    );
  }
}

export default RoundsList;
