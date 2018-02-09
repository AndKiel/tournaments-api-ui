import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { TableRow, TableCell } from 'material-ui';
import EditResultsButton from './buttons/edit_results_button';

@observer
class PlayerRow extends Component {
  render() {
    const { competitor_id, result_values } = this.props.player;

    return (
      <TableRow>
        <TableCell padding="dense">
          <EditResultsButton player={this.props.player} />
          {competitor_id.name}
        </TableCell>
        {result_values.map((value, index) => {
          return (
            <TableCell key={index} padding="dense" numeric>
              {value}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }
}

export default PlayerRow;
