import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import EditResultsModal from '../modals/edit_results_modal';
import styles from './edit_results_button.scss';

@inject('store')
@observer
class EditResultsButton extends Component {
  @observable isModalOpen = false;

  @autobind
  openModal() {
    this.isModalOpen = true;
  }

  @autobind
  closeModal() {
    this.isModalOpen = false;
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.isUserOrganiser && tournament.status !== 'ended') {
      return (
        <span className={styles.container}>
          <Tooltip title="Edit results">
            <IconButton className={styles.button} onClick={this.openModal}>
              <FontAwesomeIcon size="xs" icon="edit" />
            </IconButton>
          </Tooltip>
          <EditResultsModal
            player={this.props.player}
            open={this.isModalOpen}
            onClose={this.closeModal}
          />
        </span>
      );
    } else {
      return null;
    }
  }
}

export default EditResultsButton;
