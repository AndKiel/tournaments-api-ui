import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import EnlistModal from './enlist_modal';

@inject('store')
@observer
class Actions extends Component {
  @observable isModalOpen = false;

  @autobind
  openModal() {
    this.isModalOpen = true;
  }

  @autobind
  closeModal() {
    this.isModalOpen = false;
  }

  @autobind
  async resign() {
    const tournament = this.props.store.tournamentsStore.item;
    await tournament.resign();
    this.props.store.uiStore.setAlert(
      'success',
      'You have successfully resigned from a tournament.'
    );
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    return (
      <div>
        {!tournament.isUserEnlisted && (
          <div>
            <Tooltip title="Enlist">
              <IconButton onClick={this.openModal}>
                <FontAwesomeIcon size="sm" icon={['far', 'calendar-plus']} />
              </IconButton>
            </Tooltip>
            <EnlistModal open={this.isModalOpen} onClose={this.closeModal} />
          </div>
        )}
        {tournament.isUserEnlisted && (
          <Tooltip title="Resign">
            <IconButton onClick={this.resign}>
              <FontAwesomeIcon size="sm" icon={['far', 'calendar-minus']} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default Actions;
