import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';
import styles from './buttons.module.scss';

@translate()
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
    this.props.store.uiStore.setAlert(this.props.t('alerts.round.delete'));
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.status !== 'ended') {
      const { t } = this.props;

      return (
        <div>
          <Tooltip title={t('components.rounds.buttons.remove_round')}>
            <IconButton className={styles.remove} onClick={this.openDialog}>
              <FontAwesomeIcon size="xs" icon="trash-alt" fixedWidth />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            action="round.delete"
            onClose={this.closeDialog}
            onConfirm={this.removeRound}
            open={this.isDialogOpen}
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
