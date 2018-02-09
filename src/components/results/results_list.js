import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from 'material-ui';

@inject('store')
@observer
class ResultsList extends Component {
  componentWillMount() {
    this.props.store.tournamentsStore.item.getResults();
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <Grid container>
        <Grid item>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="dense" numeric>
                  #
                </TableCell>
                <TableCell padding="dense">Competitor</TableCell>
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
              {tournament.results.map((result, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell padding="dense" numeric>
                      {idx + 1}
                    </TableCell>
                    <TableCell padding="dense">
                      {result.competitor_id.name}
                    </TableCell>
                    {result.total.map((value, index) => {
                      return (
                        <TableCell key={index} padding="dense" numeric>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

export default ResultsList;
