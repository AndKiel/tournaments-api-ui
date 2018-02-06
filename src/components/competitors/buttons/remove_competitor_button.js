import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@inject('store')
@observer
class RemoveCompetitorButton extends Component {
  @autobind
  async removeCompetitor() {
    await this.props.store.tournamentsStore.item.removeCompetitor(
      this.props.competitor.id
    );
    this.props.store.uiStore.setAlert(
      'You have seuccessfully removed a competitor from a tournament.'
    );
  }

  render() {
    if (this.props.competitor.user_id === null) {
      return (
        <Tooltip title="Remove competitor">
          <IconButton onClick={this.removeCompetitor}>
            <FontAwesomeIcon size="xs" icon="user-times" />
          </IconButton>
        </Tooltip>
      );
    } else {
      return null;
    }
  }
}

export default RemoveCompetitorButton;
