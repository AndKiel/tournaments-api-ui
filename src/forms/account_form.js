import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from 'material-ui';

@inject('store')
@observer
class AccountForm extends Component {
  @observable
  formData = {
    user: {
      email: this.props.store.userStore.user.email,
      password: '',
      password_confirmation: ''
    }
  };
  @observable errors = {};

  @autobind
  async submitForm() {
    try {
      this.errors = {};
      await this.props.store.userStore.updateUser(this.formData);
      this.props.store.uiStore.setAlert(
        'success',
        'You have successfully updated your account.'
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.fields) {
        this.errors = error.response.data.fields;
      } else {
        throw error;
      }
    }
  }

  @autobind
  async onEnterKeyPressed(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      await this.submitForm();
    }
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography type="headline">Account</Typography>
          <TextField
            id="email"
            label="Email"
            value={this.formData.user.email}
            error={this.errors.email}
            helperText={this.errors.email ? this.errors.email.join(', ') : ''}
            onChange={e => (this.formData.user.email = e.target.value)}
            onKeyPress={this.onEnterKeyPressed}
            margin="normal"
            autoFocus
            required
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            value={this.formData.user.password}
            error={this.errors.password}
            helperText={
              this.errors.password ? this.errors.password.join(', ') : ''
            }
            onChange={e => (this.formData.user.password = e.target.value)}
            onKeyPress={this.onEnterKeyPressed}
            type="password"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            id="password_confirmation"
            label="Password confirmation"
            value={this.formData.user.password_confirmation}
            error={this.errors.password_confirmation}
            helperText={
              this.errors.password_confirmation
                ? this.errors.password_confirmation.join(', ')
                : ''
            }
            onChange={e =>
              (this.formData.user.password_confirmation = e.target.value)
            }
            onKeyPress={this.onEnterKeyPressed}
            type="password"
            margin="normal"
            required
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button color="primary" style={{ flex: 1 }} onClick={this.submitForm}>
            Update
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default AccountForm;
