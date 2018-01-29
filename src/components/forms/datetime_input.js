import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import { DateTimePicker } from 'material-ui-pickers';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

@observer
class DatetimeInput extends Component {
  render() {
    const { field, ...rest } = this.props;

    return (
      <DateTimePicker
        id={field.key}
        name={field.name}
        label={field.label}
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

export default DatetimeInput;
