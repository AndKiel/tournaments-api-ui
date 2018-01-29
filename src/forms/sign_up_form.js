import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
import routes from '../utils/routes';

@withRouter
@inject('store')
@observer
class SignUpForm extends Component {
  @observable
  formData = {
    user: {
      email: '',
      password: '',
      password_confirmation: ''
    }
  };
  @observable errors = {};

  @autobind
  async submitForm(e) {
    try {
      e.preventDefault();
      this.errors = {};
      await this.props.store.sessionStore.signUp(this.formData);
      this.props.history.push(routes.signIn());
      this.props.store.uiStore.setAlert(
        'success',
        'You have successfully signed up.'
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.fields) {
        this.errors = error.response.data.fields;
      } else {
        throw error;
      }
    }
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.submitForm}>
          <CardContent>
            <Typography type="headline">Sign up</Typography>
            <TextField
              id="email"
              label="Email"
              value={this.formData.user.email}
              error={this.errors.email}
              helperText={this.errors.email ? this.errors.email.join(', ') : ''}
              onChange={e => (this.formData.user.email = e.target.value)}
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
              type="password"
              margin="normal"
              required
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button color="primary" style={{ flex: 1 }} type="submit">
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

export default SignUpForm;
