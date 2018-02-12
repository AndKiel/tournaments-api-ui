import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/index';
import { Typography } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './time_icon.scss';

@observer
class TimeIcon extends Component {
  render() {
    const { date } = this.props;

    return (
      <Typography component="span" align="center" className={styles.container}>
        <FontAwesomeIcon icon={['far', 'clock']} />
        <Typography component="span" className={styles.time}>
          {date.format('HH:mm')}
        </Typography>
      </Typography>
    );
  }
}

TimeIcon.propTypes = {
  date: PropTypes.object.isRequired
};

export default TimeIcon;
