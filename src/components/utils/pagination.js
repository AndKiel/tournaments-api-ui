import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { observer } from 'mobx-react/index';
import { Table, TableFooter, TableRow, TablePagination } from 'material-ui';

@translate()
@observer
class Pagination extends Component {
  render() {
    const { t, count, page, onChangePage } = this.props;

    return (
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              labelDisplayedRows={({ from, to, count }) =>
                t('components.utils.pagination.summary', { from, to, count })
              }
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

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};

export default Pagination;
