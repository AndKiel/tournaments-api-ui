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
    return (
      <Grid container spacing={24}>
        {this.props.collection.map(t => {
          return (
            <Grid item xs={12} md={6} lg={4} xl={3} key={t.id}>
              <TournamentCard tournament={t} />
            </Grid>
          );
        })}
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={this.props.count}
                rowsPerPage={12}
                rowsPerPageOptions={[12]}
                page={this.props.page - 1}
                onChangePage={this.props.onChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    );
  }
}

export default TournamentsList;
