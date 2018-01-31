import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import {
  Grid,
  Table,
  TableFooter,
  TableRow,
  TablePagination
} from 'material-ui';
import TournamentCard from './tournament_card';

@observer
class TournamentsList extends Component {
  render() {
    const { collection, count, page, onChangePage } = this.props;

    return (
      <Grid container spacing={24}>
        {collection.map(t => {
          return (
            <Grid item xs={12} md={6} lg={4} xl={3} key={t.id}>
              <TournamentCard tournament={t} withLimit withActions />
            </Grid>
          );
        })}
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={count}
                rowsPerPage={12}
                rowsPerPageOptions={[12]}
                page={page - 1}
                onChangePage={onChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    );
  }
}

export default TournamentsList;
