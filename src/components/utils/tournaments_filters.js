import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { DateTimePicker } from 'material-ui-pickers';
import { Typography } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './tournaments_filters.scss';

@inject('store')
@observer
class TournamentsFilters extends Component {
  render() {
    const { filterStore } = this.props.store;

    return (
      <div className={styles.container}>
        <Typography component="span" className={styles.label}>
          <FontAwesomeIcon className={styles.icon} icon="filter" fixedWidth />
          Filters
        </Typography>
        <DateTimePicker
          id="starts_at_after"
          className={styles.input}
          name="starts_at_after"
          label="Starting after"
          value={filterStore.starts_at_after}
          onChange={date => {
            filterStore.setFilter(
              'starts_at_after',
              date ? date.toISOString() : null
            );
            this.props.onFilter();
          }}
          margin="normal"
          ampm={false}
          leftArrowIcon={<FontAwesomeIcon icon="chevron-left" />}
          rightArrowIcon={<FontAwesomeIcon icon="chevron-right" />}
          dateRangeIcon={<FontAwesomeIcon icon="calendar-alt" />}
          timeIcon={<FontAwesomeIcon icon="clock" />}
          clearable
        />
      </div>
    );
  }
}

TournamentsFilters.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default TournamentsFilters;
