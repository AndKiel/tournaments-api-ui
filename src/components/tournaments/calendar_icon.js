import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { Typography } from 'material-ui';
import moment from 'moment';
import styles from './calendar_icon.scss';

@observer
class CalendarIcon extends Component {
  render() {
    const date = moment(this.props.date);

    return (
      <div className={styles['calendar-icon']}>
        <Typography component="span" className={styles['calendar-icon-month']}>
          {date.format('MMM').toUpperCase()}
        </Typography>
        <Typography component="span" className={styles['calendar-icon-day']}>
          {date.format('D')}
          <Typography component="span" className={styles['calendar-icon-dow']}>
            {date.format('ddd')}
          </Typography>
        </Typography>
      </div>
    );
  }
}

export default CalendarIcon;
