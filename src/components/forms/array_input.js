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

  @autobind
  async onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
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
        onKeyPress={this.onKeyPress}
        fullWidth
        {...rest}
      />
    );
  }
}

export default ArrayInput;
