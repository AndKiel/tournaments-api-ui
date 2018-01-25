import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
  Typography
} from 'material-ui';

@inject('store')
@observer
class TournamentsList extends Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Starts at</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">Competitors limit</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">Status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.store.tournamentStore.collection.map(t => {
            return (
              <TableRow key={t.id}>
                <TableCell>
                  <Typography>{t.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{t.starts_at}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center">{t.competitors_limit}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center">{t.status}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={4}
              count={this.props.store.tournamentStore.totalCount}
              rowsPerPage={25}
              rowsPerPageOptions={[25]}
              page={this.props.store.tournamentStore.page - 1}
              onChangePage={this.props.onChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

export default TournamentsList;
