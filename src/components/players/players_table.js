import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from 'material-ui';
import PlayerRow from './player_row';

@inject('store')
@observer
class PlayersTable extends Component {
  render() {
    const tournament = this.props.store.tournamentsStore.item;
    const { number, players } = this.props;

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="dense">
                Table {String.fromCharCode(64 + parseInt(number, 10))}
              </TableCell>
              {tournament.result_names.map((name, index) => {
                return (
                  <TableCell key={index} padding="dense">
                    {name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(p => {
              return <PlayerRow key={p.id} player={p} />;
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

PlayersTable.propTypes = {
  number: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PlayersTable;
