import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@inject('store')
@observer
class ResignButton extends Component {
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
        <Tooltip title="Resign">
          <IconButton onClick={this.resign}>
            <FontAwesomeIcon
              size="sm"
              icon={['far', 'calendar-minus']}
              fixedWidth
            />
          </IconButton>
        </Tooltip>
      );
    } else {
      return null;
    }
  }
}

export default ResignButton;
