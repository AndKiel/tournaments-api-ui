import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { inject, observer } from 'mobx-react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography
} from 'material-ui';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      password_confirmation: '',
      errors: {}
    });

    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm() {
    try {
      this.errors = {};
      await this.props.store.sessionStore.signUp(
        this.email,
        this.password,
        this.password_confirmation
      );
      // TODO: success alert
    } catch (error) {
      if (error.response && error.response.data && error.response.data.fields) {
        this.errors = error.response.data.fields;
      }
    }
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography type="headline">Sign Up</Typography>
              <TextField
                id="email"
                label="Email"
                value={this.email}
                error={this.errors.email}
                helperText={
                  this.errors.email ? this.errors.email.join(', ') : ''
                }
                onChange={e => (this.email = e.target.value)}
                margin="normal"
                autoFocus
                required
                fullWidth
              />
              <TextField
                id="password"
                label="Password"
                value={this.password}
                error={this.errors.password}
                helperText={
                  this.errors.password ? this.errors.password.join(', ') : ''
                }
                onChange={e => (this.password = e.target.value)}
                type="password"
                margin="normal"
                required
                fullWidth
              />
              <TextField
                id="password_confirmation"
                label="Password confirmation"
                value={this.password_confirmation}
                error={this.errors.password_confirmation}
                helperText={
                  this.errors.password_confirmation
                    ? this.errors.password_confirmation.join(', ')
                    : ''
                }
                onChange={e => (this.password_confirmation = e.target.value)}
                type="password"
                margin="normal"
                required
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                style={{ flex: 1 }}
                onClick={this.submitForm}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default inject('store')(observer(SignUpPage));
