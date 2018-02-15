import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import AddCompetitorModal from '../../modals/add_competitor_modal';

@inject('store')
@observer
class AddCompetitorButton extends Component {
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

    if (tournament.isUserOrganiser) {
      return (
        <div>
          <Tooltip title="Add competitor">
            <IconButton onClick={this.openModal}>
              <FontAwesomeIcon size="sm" icon="user-plus" fixedWidth />
            </IconButton>
          </Tooltip>
          <AddCompetitorModal
            open={this.isModalOpen}
            onClose={this.closeModal}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AddCompetitorButton;
