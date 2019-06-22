import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { inject, observer } from "mobx-react/index";
import autobind from "autobind-decorator";
import { DateTimePicker } from "material-ui-pickers";
import { Typography, TextField } from "material-ui";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import debounce from "lodash/debounce";
import styles from "./tournaments_filters.module.scss";

@translate()
@inject("store")
@observer
class TournamentsFilters extends Component {
  debouncedOnFilter = debounce(this.props.onFilter, 500);

  @autobind
  onWithNameChange(e) {
    const { filterStore } = this.props.store;
    filterStore.setFilter("with_name", e.currentTarget.value);
    this.debouncedOnFilter();
  }

  @autobind
  onStartsAtChange(date) {
    const { filterStore } = this.props.store;
    filterStore.setFilter("starts_at_after", date ? date.toISOString() : null);
    this.debouncedOnFilter();
  }

  @autobind
  clearFilter(name, value = null) {
    const { filterStore } = this.props.store;
    if (filterStore.isFilterEnabled(name)) {
      filterStore.setFilter(name, value);
      this.debouncedOnFilter();
    }
  }

  render() {
    const { t } = this.props;
    const { filterStore } = this.props.store;

    return (
      <div className={styles.wrapper}>
        <Typography component="span" className={styles.label}>
          <FontAwesomeIcon
            className={styles["filter-icon"]}
            icon="filter"
            fixedWidth
          />
          {t("components.tournaments.tournaments_filters.title")}
        </Typography>
        <span className={styles.container}>
          <TextField
            id="with_name"
            className={styles.input}
            name="with_name"
            label={t("forms.labels.filter.with_name")}
            value={filterStore.with_name}
            onChange={this.onWithNameChange}
            margin="normal"
          />
          <div
            className={styles.adornment}
            onClick={() => this.clearFilter("with_name", "")}
          >
            <FontAwesomeIcon icon="times-circle" fixedWidth />
          </div>
        </span>
        <span className={styles.container}>
          <DateTimePicker
            className={styles.input}
            id="starts_at_after"
            name="starts_at_after"
            label={t("forms.labels.filter.starts_at_after")}
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
          <div
            className={styles.adornment}
            onClick={() => this.clearFilter("starts_at_after")}
          >
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
