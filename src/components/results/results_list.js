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
                <TableCell>#</TableCell>
                <TableCell>Competitor</TableCell>
                {tournament.result_names.map((name, index) => {
                  return <TableCell key={index}>{name}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tournament.results.map((result, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell numeric>{idx + 1}</TableCell>
                    <TableCell>{result.competitor_id.name}</TableCell>
                    {result.total.map((value, index) => {
                      return (
                        <TableCell key={index} numeric>
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
