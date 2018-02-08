import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { TableRow, TableCell } from 'material-ui';

@observer
class PlayerRow extends Component {
  render() {
    const { competitor_id, result_values } = this.props.player;

    return (
      <TableRow>
        <TableCell>{competitor_id.name}</TableCell>
        {result_values.map((value, index) => {
          return <TableCell key={index}>{value}</TableCell>;
        })}
      </TableRow>
    );
  }
}

export default PlayerRow;
