import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './buttons.scss';

@inject('store')
@observer
class RemoveRoundButton extends Component {
  @autobind
  async removeRound() {
    await this.props.store.tournamentsStore.item.removeRound(
      this.props.round.id
    );
    this.props.store.uiStore.setAlert('You have successfully removed a round.');
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.isUserOrganiser && tournament.status !== 'ended') {
      return (
        <Tooltip title="Remove">
          <IconButton className={styles.remove} onClick={this.removeRound}>
            <FontAwesomeIcon size="xs" icon="trash-alt" />
          </IconButton>
        </Tooltip>
      );
    } else {
      return null;
    }
  }
}

export default RemoveRoundButton;
