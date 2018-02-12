import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/index';
import { Typography } from 'material-ui';
import styles from './calendar_icon.scss';

@observer
class CalendarIcon extends Component {
  render() {
    const { date } = this.props;

    return (
      <div className={styles.container}>
        <Typography component="span" className={styles.month}>
          {date.format('MMM').toUpperCase()}
        </Typography>
        <Typography component="span" className={styles.day}>
          {date.format('D')}
          <Typography component="span" className={styles.dow}>
            {date.format('ddd')}
          </Typography>
        </Typography>
      </div>
    );
  }
}

CalendarIcon.propTypes = {
  date: PropTypes.object.isRequired
};

export default CalendarIcon;
