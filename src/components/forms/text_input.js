import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/index';
import { TextField } from 'material-ui';

@observer
class TextInput extends Component {
  render() {
    const { field, ...rest } = this.props;

    return (
      <TextField
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
      />
    );
  }
}

TextInput.propTypes = {
  field: PropTypes.object.isRequired
};

export default TextInput;
