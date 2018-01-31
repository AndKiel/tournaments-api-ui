import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Table, TableFooter, TableRow, TablePagination } from 'material-ui';

@observer
class Pagination extends Component {
  render() {
    const { count, page, onChangePage } = this.props;

    return (
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
    );
  }
}

export default Pagination;
