import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';
import styles from './buttons.scss';

@inject('store')
@observer
class RemoveRoundButton extends Component {
  @observable isDialogOpen = false;

  @autobind
  openDialog() {
    this.isDialogOpen = true;
  }

  @autobind
  closeDialog() {
    this.isDialogOpen = false;
  }

  @autobind
  async removeRound() {
    await this.props.store.tournamentsStore.item.removeRound(
      this.props.round.id
    );
    this.props.store.uiStore.setAlert('You have successfully removed a round.');
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.status !== 'ended') {
      return (
        <div>
          <Tooltip title="Remove">
            <IconButton className={styles.remove} onClick={this.openDialog}>
              <FontAwesomeIcon size="xs" icon="trash-alt" fixedWidth />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            onClose={this.closeDialog}
            onConfirm={this.removeRound}
            open={this.isDialogOpen}
            title="Remove this round?"
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

RemoveRoundButton.propTypes = {
  round: PropTypes.object.isRequired
};

export default RemoveRoundButton;
