import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from 'material-ui';
import styles from './results_list.scss';

@inject('store')
@observer
class ResultsList extends Component {
  componentWillMount() {
    this.props.store.tournamentsStore.item.getResults();
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div className={styles.container}>
        <Typography type="title" paragraph>
          Results
        </Typography>
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
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{result.competitor_id.name}</TableCell>
                      {result.total.map((value, index) => {
                        return <TableCell key={index}>{value}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ResultsList;
