import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './status_icon.scss';

@observer
class StatusIcon extends Component {
  componentWillMount() {
    switch (this.props.status) {
      case 'created':
        this.title = 'Created';
        this.icon = 'hourglass-start';
        break;
      case 'in_progress':
        this.title = 'In progress';
        this.icon = 'hourglass-half';
        break;
      case 'ended':
        this.title = 'Ended';
        this.icon = 'hourglass-end';
    }
  }

  render() {
    return (
      <Tooltip title={this.title}>
        <FontAwesomeIcon
          className={styles['status-icon']}
          icon={this.icon}
          size="xs"
          fixedWidth
        />
      </Tooltip>
    );
  }
}

export default StatusIcon;
