import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import NewRoundModal from '../modals/new_round_modal';

@inject('store')
@observer
class NewRoundButton extends Component {
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
        <span>
          <Tooltip title="New round">
            <IconButton color="primary" onClick={this.openModal}>
              <FontAwesomeIcon size="sm" icon="plus-circle" fixedWidth />
            </IconButton>
          </Tooltip>
          <NewRoundModal open={this.isModalOpen} onClose={this.closeModal} />
        </span>
      );
    } else {
      return null;
    }
  }
}

export default NewRoundButton;
