import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import {
  Grid,
  Card,
  CardContent,
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
class TournamentsPage extends Component {
  componentWillMount() {
    this.props.store.tournamentStore.getCollection();
  }

  @autobind
  onChangePage(event, page) {
    this.props.store.tournamentStore.getCollection(page + 1);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography type="headline">Tournaments</Typography>
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
                      <TableRow>
                        <TableCell>
                          <Typography>{t.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{t.starts_at}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography align="center">
                            {t.competitors_limit}
                          </Typography>
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
                      count={this.props.store.tournamentStore.collection.length}
                      rowsPerPage={25}
                      rowsPerPageOptions={[25]}
                      page={this.props.store.tournamentStore.page - 1}
                      onChangePage={this.onChangePage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default TournamentsPage;
