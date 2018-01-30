import React, { Component } from 'react';
import { observer } from 'mobx-react/index';
import autobind from 'autobind-decorator';
import ChipInput from 'material-ui-chip-input';

@observer
class ArrayInput extends Component {
  @autobind
  onAdd(chip) {
    this.props.field.value.push(chip);
  }

  @autobind
  onDel(chip) {
    const index = this.props.field.value.indexOf(chip);
    this.props.field.value.splice(index, 1);
  }

  render() {
    const { field, ...rest } = this.props;

    return (
      <ChipInput
        id={field.key}
        name={field.name}
        label={field.label}
        value={field.value}
        error={field.hasError}
        helperText={field.error}
        onAdd={this.onAdd}
        onDelete={this.onDel}
        fullWidth
        {...rest}
      />
    );
  }
}

export default ArrayInput;
