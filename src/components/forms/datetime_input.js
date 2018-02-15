import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { observer } from 'mobx-react/index';
import { DateTimePicker } from 'material-ui-pickers';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@translate()
@observer
class DatetimeInput extends Component {
  render() {
    const { t, field, ...rest } = this.props;

    return (
      <DateTimePicker
        id={field.key}
        name={field.name}
        label={t(`forms.labels.${field.path}`)}
        value={field.value}
        error={field.hasError}
        helperText={field.error}
        onChange={field.onChange}
        margin="normal"
        fullWidth
        {...rest}
        ampm={false}
        disablePast={true}
        leftArrowIcon={<FontAwesomeIcon icon="chevron-left" />}
        rightArrowIcon={<FontAwesomeIcon icon="chevron-right" />}
        dateRangeIcon={<FontAwesomeIcon icon="calendar-alt" />}
        timeIcon={<FontAwesomeIcon icon="clock" />}
      />
    );
  }
}

DatetimeInput.propTypes = {
  field: PropTypes.object.isRequired
};

export default DatetimeInput;
