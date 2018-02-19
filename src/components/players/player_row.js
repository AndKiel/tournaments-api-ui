import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { TableRow, TableCell } from 'material-ui';
import EditResultsModal from '../modals/edit_results_modal';
import classNames from 'classnames';
import styles from './player_row.scss';

@inject('store')
@observer
class PlayerRow extends Component {
  @observable isModalOpen = false;

  @autobind
  openModal() {
    const tournament = this.props.store.tournamentsStore.item;
    if (tournament.isUserOrganiser && tournament.status === 'in_progress') {
      this.isModalOpen = true;
    }
  }

  @autobind
  closeModal() {
    this.isModalOpen = false;
  }

  render() {
    const { competitor_id, result_values } = this.props.player;
    const tournament = this.props.store.tournamentsStore.item;
    const competitorClasses = classNames({
      [styles.action]:
        tournament.isUserOrganiser && tournament.status === 'in_progress'
    });

    return (
      <TableRow>
        <TableCell
          className={competitorClasses}
          padding="dense"
          onClick={this.openModal}
        >
          {competitor_id.name}
        </TableCell>
        {result_values.map((value, index) => {
          return (
            <TableCell key={index} padding="dense" numeric>
              {value}
            </TableCell>
          );
        })}
        <EditResultsModal
          onClose={this.closeModal}
          open={this.isModalOpen}
          player={this.props.player}
        />
      </TableRow>
    );
  }
}

PlayerRow.propTypes = {
  player: PropTypes.object.isRequired
};

export default PlayerRow;
