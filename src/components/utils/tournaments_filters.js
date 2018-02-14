import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import { DateTimePicker } from 'material-ui-pickers';
import { Typography } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './tournaments_filters.scss';

@inject('store')
@observer
class TournamentsFilters extends Component {
  @autobind
  onStartsAtChange(date) {
    const { filterStore } = this.props.store;
    filterStore.setFilter('starts_at_after', date ? date.toISOString() : null);
    this.props.onFilter();
  }

  @autobind
  clearStartsAtAfter() {
    const { filterStore } = this.props.store;
    if (filterStore.isStartsAtAfterEnabled) {
      filterStore.setFilter('starts_at_after');
      this.props.onFilter();
    }
  }

  render() {
    const { filterStore } = this.props.store;

    return (
      <div className={styles.wrapper}>
        <Typography component="span" className={styles.label}>
          <FontAwesomeIcon
            className={styles['filter-icon']}
            icon="filter"
            fixedWidth
          />
          Filters
        </Typography>
        <span className={styles.container}>
          <DateTimePicker
            className={styles.input}
            id="starts_at_after"
            name="starts_at_after"
            label="Starting after"
            value={filterStore.starts_at_after}
            onChange={this.onStartsAtChange}
            margin="normal"
            ampm={false}
            leftArrowIcon={<FontAwesomeIcon icon="chevron-left" />}
            rightArrowIcon={<FontAwesomeIcon icon="chevron-right" />}
            dateRangeIcon={<FontAwesomeIcon icon="calendar-alt" />}
            timeIcon={<FontAwesomeIcon icon="clock" />}
            clearable
          />
          <div className={styles.adornment} onClick={this.clearStartsAtAfter}>
            <FontAwesomeIcon icon="times-circle" fixedWidth />
          </div>
        </span>
      </div>
    );
  }
}

TournamentsFilters.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default TournamentsFilters;
