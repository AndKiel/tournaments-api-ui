import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Tooltip } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './status_icon.scss';

@observer
class StatusIcon extends Component {
  render() {
    switch (this.props.status) {
      case 'created':
        return (
          <Tooltip title="Created">
            <FontAwesomeIcon
              className={styles['status-icon']}
              icon="hourglass-start"
              size="xs"
              fixedWidth
            />
          </Tooltip>
        );
      case 'in_progress':
        return (
          <Tooltip title="In progress">
            <FontAwesomeIcon
              className={styles['status-icon']}
              icon="hourglass-half"
              size="xs"
              fixedWidth
            />
          </Tooltip>
        );
      default:
        return (
          <Tooltip title="Ended">
            <FontAwesomeIcon
              className={styles['status-icon']}
              icon="hourglass-end"
              size="xs"
              fixedWidth
            />
          </Tooltip>
        );
    }
  }
}

export default StatusIcon;
