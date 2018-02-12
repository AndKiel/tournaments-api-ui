import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ConfirmationDialog from '../../utils/confirmation_dialog';

@inject('store')
@observer
class ResignButton extends Component {
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
  async resign() {
    const tournament = this.props.store.tournamentsStore.item;
    await tournament.resign();
    this.props.store.uiStore.setAlert(
      'You have successfully resigned from a tournament.'
    );
  }

  render() {
    const tournament = this.props.store.tournamentsStore.item;

    if (tournament.isUserEnlisted) {
      return (
        <div>
          <Tooltip title="Resign">
            <IconButton onClick={this.openDialog}>
              <FontAwesomeIcon
                size="sm"
                icon={['far', 'calendar-minus']}
                fixedWidth
              />
            </IconButton>
          </Tooltip>
          <ConfirmationDialog
            onClose={this.closeDialog}
            onConfirm={this.resign}
            open={this.isDialogOpen}
            title="Resign from this tournament?"
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ResignButton;
