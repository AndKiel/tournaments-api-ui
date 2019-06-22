import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { observer } from "mobx-react/index";
import { TextField } from "material-ui";

@translate()
@observer
class TextInput extends Component {
  render() {
    const { t, field, ...rest } = this.props;

    return (
      <TextField
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
      />
    );
  }
}

TextInput.propTypes = {
  field: PropTypes.object.isRequired
};

export default TextInput;
