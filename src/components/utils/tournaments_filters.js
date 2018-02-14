import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/index';
import { DateTimePicker } from 'material-ui-pickers';
import { Button, Switch } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import moment from 'moment';
import styles from './tournaments_filters.scss';

@inject('store')
@observer
class TournamentsFilters extends Component {
  render() {
    const { filterStore } = this.props.store;

    return (
      <div className={styles.container}>
        <Switch
          checked={filterStore.isStartsAtAfterEnabled}
          onChange={() => {
            filterStore.toggleFilter('starts_at_after', moment().toISOString());
          }}
        />
        <DateTimePicker
          id="starts_at_after"
          className={styles.input}
          name="starts_at_after"
          label="Starts at after"
          disabled={!filterStore.isStartsAtAfterEnabled}
          value={filterStore.starts_at_after}
          onChange={date =>
            filterStore.setFilter('starts_at_after', date.toISOString())
          }
          margin="normal"
          ampm={false}
          leftArrowIcon={<FontAwesomeIcon icon="chevron-left" />}
          rightArrowIcon={<FontAwesomeIcon icon="chevron-right" />}
          dateRangeIcon={<FontAwesomeIcon icon="calendar-alt" />}
          timeIcon={<FontAwesomeIcon icon="clock" />}
        />
        <Button size="small" onClick={this.props.onFilter}>
          <FontAwesomeIcon className={styles.icon} icon="filter" fixedWidth />
          Filter
        </Button>
      </div>
    );
  }
}

TournamentsFilters.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default TournamentsFilters;
