import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import EnlistModal from '../../modals/enlist_modal';

@inject('store')
@observer
class EnlistButton extends Component {
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

    if (!tournament.isUserEnlisted) {
      return (
        <div>
          <Tooltip title="Enlist">
            <IconButton onClick={this.openModal}>
              <FontAwesomeIcon
                size="sm"
                icon={['far', 'calendar-plus']}
                fixedWidth
              />
            </IconButton>
          </Tooltip>
          <EnlistModal open={this.isModalOpen} onClose={this.closeModal} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default EnlistButton;
