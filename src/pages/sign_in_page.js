import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography
} from 'material-ui';

@inject('store')
@observer
class SignInPage extends Component {
  @observable
  formData = {
    email: '',
    password: ''
  };
  @observable error = null;

  @autobind
  async submitForm() {
    try {
      this.error = null;
      await this.props.store.sessionStore.signIn(this.formData);
      this.props.store.uiStore.setAlert(
        'success',
        'You have successfully signed in.'
      );
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error_description
      ) {
        this.error = error.response.data.error_description;
      } else {
        throw error;
      }
    }
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography type="headline">Sign in</Typography>
              <TextField
                id="email"
                label="Email"
                value={this.formData.email}
                error={!!this.error}
                onChange={e => (this.formData.email = e.target.value)}
                margin="normal"
                autoFocus
                required
                fullWidth
              />
              <TextField
                id="password"
                label="Password"
                value={this.formData.password}
                error={!!this.error}
                helperText={this.error}
                onChange={e => (this.formData.password = e.target.value)}
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

export default SignInPage;
