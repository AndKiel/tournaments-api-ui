import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { IconButton, Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@inject('store')
@observer
class OrderButton extends Component {
  @autobind
  async order() {
    const { competitorsOrder } = this.props.store.uiStore;
    const tournament = this.props.store.tournamentsStore.item;
    if (competitorsOrder === 'name') {
      tournament.orderCompetitors('created_at');
      this.props.store.uiStore.setCompetitorsOrder('created_at');
    } else {
      tournament.orderCompetitors('name');
      this.props.store.uiStore.setCompetitorsOrder('name');
    }
  }

  render() {
    const { competitorsOrder } = this.props.store.uiStore;

    return (
      <div>
        <Tooltip
          title={`Order by ${
            competitorsOrder === 'created_at' ? 'name' : 'date'
          }`}
        >
          <IconButton onClick={this.order}>
            {competitorsOrder === 'created_at' && (
              <FontAwesomeIcon size="sm" icon="sort-alpha-down" fixedWidth />
            )}
            {competitorsOrder === 'name' && (
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon
                  icon="long-arrow-alt-down"
                  transform="shrink-3 left-3"
                />
                <FontAwesomeIcon
                  icon="calendar-alt"
                  transform="shrink-8 up-1 right-5"
                />
              </span>
            )}
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default OrderButton;
